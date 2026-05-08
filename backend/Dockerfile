# Etapa 1: Construcción e instalación de dependencias
FROM node:22-alpine AS deps

# Instalar dependencias necesarias para la compilación de herramientas en C++ como bcrypt
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

# Copiar solo los manifiestos para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias usando ci para asegurar versiones exactas
RUN npm ci --omit=dev

# Etapa 2: Entorno de producción (Imagen final)
FROM node:22-alpine AS runner

# Actualizar npm globalmente para parchar vulnerabilidades de la imagen base
RUN npm install -g npm@latest && npm cache clean --force

# Definir el entorno en producción
ENV NODE_ENV=production

WORKDIR /app

# Copiar las dependencias ya compiladas desde la Etapa 1
COPY --from=deps /app/node_modules ./node_modules

# Copiar el código de la aplicación
COPY . .

# Cambiar al usuario sin privilegios
USER node

# Exponer el puerto
EXPOSE 3000

# Ejecutar Node de manera explícita
CMD ["node", "app.js"]