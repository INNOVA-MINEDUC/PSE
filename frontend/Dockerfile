# Dockerfile for Vue.js (Vite) project
# Use official Node.js image as the base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
# Copy package files
COPY package*.json ./

# Install dependencies (include devDependencies so `vite` is available)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite uses (5173)
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
