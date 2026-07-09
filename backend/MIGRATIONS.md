# Migraciones de base de datos

Este proyecto gestiona el esquema de la base de datos MySQL con **migraciones
versionadas** usando [Umzug](https://github.com/sequelize/umzug) sobre Sequelize.
Cada cambio de esquema (crear tabla, añadir columna, índice, etc.) es un archivo
de migración que se ejecuta **una sola vez** y queda registrado.

---

## 1. Conceptos

- **Migración**: archivo JS en `migrations/` con dos funciones, `up` (aplica el
  cambio) y `down` (lo revierte).
- **Tabla de control `SequelizeMeta`**: tabla creada automáticamente en la BD que
  guarda el nombre de cada migración ya aplicada. Es la fuente de verdad de "qué
  versión tiene esta base de datos".
- **Run-once**: una migración listada en `SequelizeMeta` no se vuelve a ejecutar.
- **Fail-fast**: si una migración lanza error, el proceso sale con código `1`. En
  el pipeline esto **aborta el deploy** (la app no se actualiza con un esquema roto).

No hay migración en el arranque de la app (`app.js` solo conecta y sirve). Las
migraciones son un paso **separado** del ciclo de vida, como manda la práctica DevOps.

---

## 2. Estructura

```
backend/
├── migrate.js                          # runner (config Umzug + CLI)
└── migrations/
    ├── _helpers.js                     # utilidades compartidas (NO es migración)
    ├── 0001-baseline-schema.js         # esquema completo inicial
    ├── 0002-incremental-columns.js     # columnas añadidas después
    └── 0003-reconcile-baseline.js      # reconcilia drift de prod con el baseline
```

- El **orden** lo define el prefijo numérico del nombre (`0001`, `0002`, ...).
  Umzug los ordena alfabéticamente.
- El runner solo toma como migración los archivos que **empiezan con dígito**
  (glob `migrations/[0-9]*.js`). Por eso `_helpers.js` (prefijo `_`) se ignora y
  sirve para código compartido entre migraciones.
- `migrate.js` conecta usando las variables de entorno `DB_HOST`, `DB_PORT`,
  `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

Anatomía de una migración:

```js
/** @param {{ context: import('sequelize').QueryInterface }} ctx */
export async function up({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  await sequelize.query(`CREATE TABLE ejemplo (...)`);
}

export async function down({ context: queryInterface }) {
  const { sequelize } = queryInterface;
  await sequelize.query(`DROP TABLE ejemplo`);
}
```

---

## 3. Comandos (local)

Requiere un `.env` con las credenciales `DB_*` apuntando a tu base de datos.

| Comando                       | Qué hace                                          |
|-------------------------------|---------------------------------------------------|
| `npm run migrate:status`      | Lista migraciones **pendientes**                  |
| `npm run migrate`             | Aplica todas las pendientes (`up`)                |
| `npm run migrate:down`        | Revierte **la última** migración aplicada (`down`)|
| `npm run migrate:create <n>`  | Genera un archivo nuevo de migración              |

Por debajo todos llaman a `node migrate.js <comando>`. La CLI completa de Umzug
acepta además `executed` (lista aplicadas), `up --to <name>`, `down --to 0`, etc.

Ejemplo de sesión:

```bash
npm run migrate:status     # ver qué falta
npm run migrate            # aplicar
```

---

## 4. Cómo correr en el pipeline (CI/CD)

Las migraciones corren en el servidor durante el deploy, **no** en el runner de
GitHub (la BD no es accesible desde fuera de la red del servidor).

En `.github/workflows/backend-docker.yml`, los jobs `deploy-dev` y `deploy-prod`
ejecutan vía SSH, **antes** de levantar la app:

```bash
set -e
cd /opt/public_html/PSE
docker login ghcr.io ...
docker compose pull
# one-off container con la imagen recién bajada
docker compose run --rm pse-backend node migrate.js up
docker compose up -d
```

- `docker compose run --rm pse-backend` arranca un contenedor temporal con la
  **misma imagen y `.env`** que la app, corre la migración y se elimina (`--rm`).
- `set -e` + el `exit 1` del runner garantizan **fail-fast**: si la migración
  falla, el script se detiene y `docker compose up -d` nunca corre. La app sigue
  con la versión anterior, sana.

Flujo completo del deploy:

```
push a development/main
   └─ build + scan + push imagen a GHCR
        └─ SSH al server
             ├─ docker compose pull          (baja imagen nueva)
             ├─ migrate.js up                 (migra; si falla → ABORTA)
             └─ docker compose up -d           (levanta app nueva)
```

---

## 5. Crear una nueva migración

1. Genera el archivo:

   ```bash
   npm run migrate:create add-tabla-reportes.js
   ```

   Crea `migrations/000N-add-tabla-reportes.js` con plantilla `up`/`down`.

2. Escribe el `up` (el cambio) y el `down` (cómo revertirlo). Usa
   `sequelize.query(...)` con SQL, o los métodos de `queryInterface`
   (`createTable`, `addColumn`, etc.).

3. Prueba en local contra tu BD:

   ```bash
   npm run migrate:status   # debe aparecer como pendiente
   npm run migrate          # aplícala
   npm run migrate:down     # opcional: verifica que el down funciona
   npm run migrate          # vuelve a aplicarla
   ```

4. Commit. Al hacer merge a `development`/`main`, el pipeline la aplica sola.

### Reglas

- **Nunca edites una migración ya aplicada** en cualquier entorno. Una migración
  es inmutable una vez mergeada: si cambias el SQL, las BD que ya la corrieron no
  lo vuelven a ejecutar y quedan inconsistentes. Para corregir → **nueva migración**.
- Mantén `up` y `down` simétricos: `down` debe deshacer exactamente lo que hizo `up`.
- Una migración = un cambio lógico. No mezcles cambios no relacionados.

---

## 6. Las dos migraciones actuales

### `0001-baseline-schema.js`
Esquema completo del proyecto (todas las tablas con todas sus columnas actuales).
Usa `CREATE TABLE IF NOT EXISTS`, así que es seguro en una BD nueva **o** en una
ya existente (no pisa tablas). No incluye `CREATE DATABASE` ni `USE`: corre contra
la BD indicada por `DB_NAME`.

### `0002-incremental-columns.js`
Añade columnas que se agregaron después del esquema original (en `noticias`,
`metricas_llamadas`, `metricas_funerario`). Antes de cada `ALTER` consulta
`information_schema` y solo añade la columna si falta — porque MySQL 8 **no**
soporta `ADD COLUMN IF NOT EXISTS`.

**En una BD nueva**: `0001` crea todo con las columnas ya incluidas, y `0002` no
hace nada (todas existen). **En una BD vieja** (creada antes de estos cambios):
`0001` no toca las tablas existentes y `0002` agrega las columnas faltantes.

### `0003-reconcile-baseline.js`
Migración de **reconciliación de drift**. Las BD de producción se crearon desde un
esquema viejo al que le faltaban columnas que `0002` no cubrió (ej.
`noticias.contenido`, que rompía `createNoticia` con
`Unknown column 'contenido'`). Recorre **todas** las columnas del baseline y añade
solo las que falten (`addColumnIfMissing`, verificando `information_schema`). Solo
columnas nullable o con `DEFAULT` (seguras en tablas con datos); no toca PK ni
columnas `NOT NULL` sin default. En una BD sana es un no-op.

Usa los helpers `addColumnIfMissing` / `dropColumnIfExists` de `_helpers.js`, los
mismos que usa `0002`.

> **Nota:** `0003.down()` es intencionalmente vacío. Es una reconciliación: las
> columnas pueden haber existido antes, así que revertir borrándolas sería
> incorrecto.

---

## 7. Resolución de problemas

| Síntoma                                   | Causa / solución                                                                 |
|-------------------------------------------|----------------------------------------------------------------------------------|
| `Access denied` / `ECONNREFUSED`          | Variables `DB_*` mal puestas o sin acceso de red a la BD.                         |
| El deploy se detiene en el paso de migrar | Una migración falló (fail-fast). Revisa el log SSH del workflow; corrige y re-deploya. |
| "service pse-backend not found"           | El nombre del servicio en el `docker-compose.yml` del server no es `pse-backend`. Ajusta el comando en el workflow. |
| Una migración no se aplica                | Ya figura en `SequelizeMeta`. Si necesitas re-correrla, es señal de que debes crear una migración nueva. |
| `Unknown column '...'` en runtime         | Drift: la BD no tiene una columna del esquema esperado. Crea una migración de reconciliación con `addColumnIfMissing` (ver `0003`). |
