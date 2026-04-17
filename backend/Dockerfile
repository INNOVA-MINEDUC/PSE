# Usar la imagen oficial de Node.js basada en Alpine para que sea ultra ligera.
FROM node:20-alpine

# Definir el entorno en producción desde el principio
ENV NODE_ENV=production

# Crear y asignar directorio de trabajo
WORKDIR /app

# Instalar dependencias necesarias para la compilación si hay herramientas en C++ como bcrypt
RUN apk add --no-cache python3 make g++ 

# Copiar solo el package.json (para aprovechar caché de Docker)
COPY package*.json ./

# Instalar con --omit=dev asegura que nodemon u otros devDependencies se ignoren
RUN npm install --omit=dev

# Copiar el código de la aplicación (obedeciendo el .dockerignore)
COPY . .

# Cambiar del usuario "root" a un usuario sin privilegios que Node.js ya incluye.
# Esto asegura que el proceso Express no corra como administrador en la máquina.
USER node

# Exponer el puerto según código
EXPOSE 3000

# Usar node de manera explícita (npm no maneja tan bien las señales de cierre de contenedores SIGTERM)
CMD ["node", "app.js"]
