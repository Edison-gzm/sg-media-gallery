 
# Este Dockerfile configura el entorno para correr el backend Node/Express en Docker.
# Usa Node 18 como base, establece /app como carpeta de trabajo,
# copia e instala las dependencias, luego copia todo el proyecto,
# expone el puerto 4000 y arranca el servidor con node server.js.

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]