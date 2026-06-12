# 1. Etapa de Construcción (Builder)
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY . .

# Limpiar el manifiesto para evitar falsos positivos en el escaneo
RUN npm pkg delete devDependencies && \
    rm package-lock.json

# 2. Etapa de Producción (Runner)
FROM node:22-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Parchear CVE-2026-45447: OpenSSL heap use-after-free en PKCS7_verify
RUN apk upgrade --no-cache libcrypto3 libssl3

# Remover npm de la imagen de producción por seguridad (trae vulnerabilidades como picomatch)
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY --from=builder /app ./

RUN chown -R node:node /app

USER node
EXPOSE 3000

CMD ["node", "app.js"]