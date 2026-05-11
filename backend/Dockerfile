# 1. Etapa de Construcción (Builder)
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependencias del sistema necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

# Copiar archivos de manifiesto
COPY package.json package-lock.json ./

# Instalación determinista de todas las dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# 2. Etapa de Producción (Runner)
FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copiar archivos de manifiesto nuevamente
COPY package.json package-lock.json ./

# Instalar estrictamente las dependencias de producción
RUN npm ci --omit=dev --ignore-scripts

# Copiar el código de la aplicación y dependencias desde la etapa de construcción
COPY --from=builder /app/src ./src
COPY --from=builder /app/app.js ./app.js

# Asignar permisos al usuario node
RUN chown -R node:node /app

# Cambiar a usuario sin privilegios
USER node

EXPOSE 3000

CMD ["node", "app.js"]