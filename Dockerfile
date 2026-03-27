 
# Usar imagen base de Node
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer el puerto
EXPOSE 3000

# Arrancar la app en modo desarrollo
CMD ["npm", "start"]