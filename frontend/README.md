# Portal de Salud Escolar (PSE) - Frontend

Este es el repositorio del frontend del Portal de Salud Escolar (PSE), construido con **Vue 3**, **Vite**, **Vuetify** y gestionado mediante contenedores **Docker**.

---

## Arquitectura de Configuración en Tiempo de Ejecución (Runtime Config)

Para seguir las mejores prácticas de DevOps ("Build Once, Run Anywhere"), este proyecto utiliza **Runtime Configuration**. A diferencia del enfoque estándar de Vite, esto permite que la misma imagen de Docker se ejecute en cualquier entorno (Staging, Pre-prod, Producción) sin necesidad de reconstruirla.

### ¿Cómo funciona?

1.  **`public/config.template.js`**: Define las variables que necesitamos inyectar en el navegador.
2.  **`docker-entrypoint.sh`**: Al arrancar el contenedor, este script usa `envsubst` para reemplazar los placeholders (por ejemplo, `${VITE_API_URL}`) con los valores reales de las variables de entorno del sistema.
3.  **`src/env.js`**: Proporciona una interfaz unificada para acceder a estas variables, manejando automáticamente el fallback para desarrollo local.

---

## Configuración Local (Desarrollo)

1.  Instala las dependencias:
    ```bash
    npm install
    ```
2.  Levanta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
3.  (Opcional) Crea un archivo `.env` en la raíz para sobreescribir variables localmente:
    ```env
    VITE_API_URL=http://localhost:3000
    ```

---

## Despliegue con Docker (Producción)

### 1. Construir la imagen
La imagen se construye una sola vez:
```bash
docker build -t pse-frontend .
```

### 2. Ejecutar el contenedor
Puedes inyectar las variables necesarias al momento de iniciar el contenedor:

**Ejemplo para Desarrollo/Staging:**
```bash
docker run -d \
  --name pse-frontend \
  -e VITE_API_URL=https://api-staging.ejemplo.gt \
  -p 8080:8080 \
  pse-frontend
```

**Ejemplo para Producción:**
```bash
docker run -d \
  --name pse-frontend \
  -e VITE_API_URL=https://api.ejemplo.gt \
  -p 80:8080 \
  pse-frontend
```

---

## CI/CD y Automatización (GitHub Actions)

El proyecto cuenta con un flujo automatizado para la construcción de imágenes en cada `push` a las ramas `main` y `development`.

### Registro de Imágenes (GHCR)
Las imágenes se publican automáticamente en **GitHub Container Registry**:
`ghcr.io/${{ github.repository }}-frontend`

### Estrategia de Versionado (Tags)
Para un control total, cada imagen generada por el CI tiene tres tipos de etiquetas:

1.  **Rama (Latest):** `main-latest` o `development-latest`. Ideal para pull automático en servidores.
2.  **Control Detallado:** `<rama>-<fecha>-<sha_corto>`. 
    *   *Ejemplo:* `development-20240413_1445-a1b2c3d`
    *   Esto permite identificar **cuándo** se construyó y **qué código exacto** contiene.
3.  **Hash de Git:** Tag basado únicamente en el Short SHA del commit.

### Configuración Necesaria en GitHub
Para que el CI pueda publicar las imágenes, asegúrate de que el repositorio tenga permisos de escritura:
`Settings > Actions > General > Workflow permissions > "Read and write permissions"`.

---

## Guía para Desarrolladores

### ¿Cómo añadir una nueva variable de entorno?

Si necesitas una nueva variable (ej: `VITE_ANALYTICS_KEY`):

1.  **`public/config.template.js`**: Añade la variable al objeto:
    ```javascript
    window.APP_CONFIG = {
      VITE_API_URL: "${VITE_API_URL}",
      VITE_ANALYTICS_KEY: "${VITE_ANALYTICS_KEY}"
    };
    ```
2.  **`src/env.js`**: Declara la exportación:
    ```javascript
    export const ANALYTICS_KEY = getEnv("VITE_ANALYTICS_KEY");
    ```
3.  **Uso en el código**:
    ```javascript
    import { ANALYTICS_KEY } from "@/env";
    ```

---

## Beneficios de usar esta Arquitectura

*   **Inmutabilidad**: La imagen que pruebas en Staging es **exactamente** la misma que se despliega en Producción.
*   **Velocidad**: No más esperas de 10 minutos para reconstruir el frontend solo por un cambio de URL de API.
*   **Seguridad**: Las variables se gestionan a nivel de infraestructura, sin estar "hardcoded" en los archivos estáticos generados en el build.
