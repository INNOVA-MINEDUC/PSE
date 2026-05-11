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

COPY --from=builder /app ./

RUN chown -R node:node /app

USER node
EXPOSE 3000

CMD ["node", "app.js"]