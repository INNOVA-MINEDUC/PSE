# Portal de Salud Escolar (PSE) - Backend

Este es el repositorio del backend del Portal de Salud Escolar (PSE), construido con **Node.js**, **Express**, y gestionado mediante contenedores **Docker**. Se comunica con una base de datos MySQL y el sistema externo ASISTO.

---

## Arquitectura y Seguridad en Docker

El proyecto sigue estándares de la industria para despliegues profesionales de Node.js en contenedores:

1.  **Ultraligero**: Utiliza la imagen base `node:20-alpine` para minimizar la superficie de ataque y el peso final.
2.  **Usuario sin privilegios**: El servicio no corre como `root`. Se ejecuta bajo el usuario nativo `node`, previniendo escalada de privilegios en caso de inyección de código.
3.  **Dependencias de Producción**: La configuración instruye a Docker ignorar `node_modules` locales (mediante `.dockerignore`) y descargar rigurosamente solo las dependencias de producción al empaquetar (`npm install --omit=dev`).
4.  **Cierre Grácil**: El comando de inicio atiende directamente a `node app.js`, permitiendo a Node capturar correctamente las señales `SIGTERM` enviadas por Kubernetes o Docker.

---

## Variables de Entorno

A diferencia del entorno Frontend (clientes estáticos SPA), el Backend corre de manera activa utilizando el motor V8 de Node. Esto significa que lee las variables nativamente durante el tiempo de ejecución a través de `process.env`. **No se utilizan plantillas ni envsubst**.

Debes asegurarte de definir en tu entorno de producción o en tu archivo `.env` local las siguientes variables clave (revisar configuración en el código para rutas exactas):
*   Credenciales de Base de Datos (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
*   Configuraciones externas como la API GraphQL (`API`).
*   El puerto para Express (`PORT` - por defecto 3000).

---

## Configuración Local (Desarrollo)

1.  Instala las dependencias:
    ```bash
    npm install
    ```
2.  Crea un archivo `.env` en directorio raíz del backend y añade tus credenciales.
3.  Levanta el servidor con recarga en caliente:
    ```bash
    npm run dev
    ```

---

## Despliegue con Docker (Producción)

### 1. Construir la imagen localmente
Si deseas compilar la imagen de forma manual en lugar de usar GitHub Actions:
```bash
docker build -t pse-backend .
```

### 2. Ejecutar el contenedor
Puesto que el backend asimila nativamente las variables de entorno, puedes pasarlas directamente desde consola o inyectar un archivo completo con el parámetro `--env-file`:

**Arrancar usando un archivo completo:**
```bash
docker run -d \
  --name pse-backend \
  --env-file ./.env.produccion \
  -p 3000:3000 \
  pse-backend
```

**Arrancar y declarar variables individualmente:**
```bash
docker run -d \
  --name pse-backend \
  -e PORT=3000 \
  -e DB_HOST=db.empresa.gt \
  -e DB_USER=root \
  -e DB_PASSWORD=seguro \
  -e DB_NAME=pse_db \
  -p 3000:3000 \
  pse-backend
```

---

## CI/CD y Automatización (GitHub Actions)

El proyecto cuenta con un flujo automatizado en `.github/workflows/backend-docker.yml` para la construcción y promoción de imágenes Docker en cada `push` exclusivo de código en las ramas de la API (`main` y `development`).

### Registro de Imágenes (GHCR)
Las imágenes creadas por el pipeline son hospedadas de manera automática en el **GitHub Container Registry**: `ghcr.io/${{ github.repository }}-backend`

### Estrategia de Identificación y Trazabilidad (Tags)
Con la finalidad de permitir pruebas escalonadas y revertir a versiones precisas ante cualquier fallo en producción, cada compilación integra de manera paralela tres etiquetas vitales:

1.  **Tag Funcional (Latest):** `main-latest` o `development-latest`. Utilizado para que CD tools extraigan la actualización final de la rama por defecto.
2.  **Tag Cronológico:** Combina la rama, la fecha de compilación exacta y el hash corto (`development-20240413_2045-84c4d87`). Facilita la auditoría.
3.  **Hash de Git:** Estructura pura de commit originario para sincronización rápida.
