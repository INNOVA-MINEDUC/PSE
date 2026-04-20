# Portal de Salud Escolar (PSE) - Frontend

Este es el repositorio del frontend del Portal de Salud Escolar (PSE), construido con **Vue 3**, **Vite** y gestionado mediante contenedores **Docker**.

---

## Arquitectura de Configuración: Build-Time Variables

Para mantener la pureza de los contenedores estáticos y evitar problemas de caché, este proyecto utiliza **Inyección en Tiempo de Compilación (Build-Time Variables)** propias de Vite (`import.meta.env`).

### ¿Cómo funciona?

El código fuente invoca variables directamente usando el prefijo `VITE_`:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

Cuando se ejecuta el comando `npm run build` (usualmente mediante GitHub Actions), Vite lee el archivo `.env.production` (creado dinámicamente) y reescribe de forma permanente (`hardcode`) los valores en los archivos Javascript. Debido a esto, el contenedor Nginx que resulta es **100% estático, ultra ligero y optimizado**.

---

## Desarrollo Local

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura tus variables locales (opcional pero recomendado):
   Crea una copia del archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```
   Agrega tu IP o URL de desarrollo local en el `.env.local`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. Inicia el servidor local:
   ```bash
   npm run dev
   ```

---

## Despliegue con Docker (Producción)

### Pipeline de CI/CD (GitHub Actions)

El proyecto cuenta con un flujo CI/CD avanzado en GitHub Actions (`.github/workflows/frontend-docker.yml`) que se dispara en ramas `main` y `development`.

**Gestión Automática de Variables:**
La propia GitHub Action detecta en qué rama se encuentra y crea el archivo `.env.production` **al vuelo** usando *GitHub Secrets* antes de construir el contenedor. Las variables se controlan totalmente desde los Secrets del repositorio:
*   `VITE_API_URL_PROD` -> Inyectada en la rama `main`
*   `VITE_API_URL_DEV` -> Inyectada en la rama `development`

El Dockerfile es del tipo Multistage (Node JS -> `nginx-unprivileged`) y al final sirve un puerto `8080` seguro como usuario genérico `uid 101`.

### Docker Compose (En Producción)

Debido a que las variables estáticas ya están "horneadas" en la imagen, iniciar el contenedor en el servidor host es sumamente limpio y no requiere de un archivo local de variables (`env_file`) en el servidor:

```yaml
services:
  pse-frontend:
    image: ghcr.io/tu-repo/pse-frontend:production-latest
    container_name: pse-frontend
    restart: unless-stopped
    ports:
      - "8089:8080"
```

Simplemente ejecutas `docker compose pull` y `up -d` en el servidor y la imagen estática cobrará vida conectándose a la URL que GitHub configuró.

---

## ¿Cómo añadir una nueva variable de Frontend?

Las variables públicas del Frontend (Keys de Analytics, Maps, etc.) no deben ser configuradas en el servidor Linux de producción, sino seguir este flujo:

1. **Agrega el nombre** al archivo `.env.example` en tu proyecto para documentarlo (Ej: `VITE_ANALYTICS_KEY=`).
2. **Usa la variable** en tu código de Vue como: `import.meta.env.VITE_ANALYTICS_KEY`.
3. **Agrega el secreto** en los Secrets de tu repositorio en `GitHub.com -> Settings -> Secrets and variables -> Actions`. Crea `VITE_ANALYTICS_KEY_PROD` y `VITE_ANALYTICS_KEY_DEV` (si aplica).
4. **Modifica la Action** en `.github/workflows/frontend-docker.yml` para que lo inyecte junto a la API:
   ```bash
   echo "VITE_ANALYTICS_KEY=${{ secrets.VITE_ANALYTICS_KEY_PROD }}" >> ./frontend/.env.production
   ```
