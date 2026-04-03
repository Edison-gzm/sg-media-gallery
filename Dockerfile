 
# Este Dockerfile configura el entorno para correr la app en Docker.
# Usa Node 18 como base, establece /app como carpeta de trabajo,
# copia e instala las dependencias, luego copia todo el proyecto,
# expone el puerto 3000 y arranca la app con npm start.

FROM node:18-alpine

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
EXPOSE 3000

CMD ["npm", "start"]