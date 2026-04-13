# ETAPA 1: Build
FROM node:20-alpine AS build-stage

# Usar modo producción para npm
ENV NODE_ENV=production

WORKDIR /app

# Copiar solo package.json para aprovechar el caché de Docker
COPY package*.json ./
RUN npm install --include=dev

# Copiar el resto del código (excluyendo lo definido en .dockerignore)
COPY . .

# Compilar para producción
RUN npm run build

# ETAPA 2: Producción (Security-Hardened Nginx)
# Usamos la versión "unprivileged" que corre como el usuario 'nginx' por defecto (sin ser root)
FROM nginxinc/nginx-unprivileged:stable-alpine

# Instalamos envsubst (incluido en el paquete gettext)
USER root
RUN apk add --no-cache gettext

# Copiamos la configuración de Nginx optimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiamos el entrypoint y ajustamos permisos para que el usuario 'nginx' pueda escribir config.js
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh && \
    chown -R nginx:nginx /usr/share/nginx/html

# Volvemos al usuario sin privilegios
USER nginx

# El puerto estándar de nginxinc/nginx-unprivileged es 8080
EXPOSE 8080

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
