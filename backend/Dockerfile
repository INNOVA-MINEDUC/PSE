# 1. Etapa de Construcción (Builder)
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependencias del sistema necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

# Copiar archivos de manifiesto
COPY package.json package-lock.json ./

# Instalar estrictamente las dependencias de producción
RUN npm ci --omit=dev --ignore-scripts

# Copiar todo el código de la aplicación
COPY . .

# 2. Etapa de Producción (Runner)
FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copiar el código fuente y los node_modules ya compilados desde el builder
COPY --from=builder /app ./

# Eliminar el archivo de bloqueo para prevenir falsos positivos en Trivy
RUN rm package-lock.json

# Asignar permisos al usuario node
RUN chown -R node:node /app

# Cambiar a usuario sin privilegios
USER node

EXPOSE 3000

CMD ["node", "app.js"]