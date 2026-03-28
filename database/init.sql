 
-- Base de datos inicial para la Galería Interactiva SG
-- Este archivo se ejecuta automáticamente cuando PostgreSQL arranca por primera vez
-- Crea las tablas y carga los datos iniciales

-- Crear tabla de contenido
CREATE TABLE IF NOT EXISTS contenido (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tipo VARCHAR(10) CHECK (tipo IN ('imagen', 'video')) NOT NULL,
  url VARCHAR(500) NOT NULL,
  categoria VARCHAR(50) CHECK (categoria IN ('Naturaleza', 'Tecnología', 'Arte')) NOT NULL
);

-- Crear tabla de favoritos
CREATE TABLE IF NOT EXISTS favoritos (
  id SERIAL PRIMARY KEY,
  "contenidoId" INTEGER NOT NULL REFERENCES contenido(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insertar datos iniciales de contenido
INSERT INTO contenido (titulo, tipo, url, categoria) VALUES
  ('Bosque Verde', 'imagen', 'https://picsum.photos/seed/naturaleza1/800/600', 'Naturaleza'),
  ('Montaña Nevada', 'imagen', 'https://picsum.photos/seed/naturaleza2/800/600', 'Naturaleza'),
  ('Naturaleza en Movimiento', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Naturaleza'),
  ('Inteligencia Artificial', 'imagen', 'https://picsum.photos/seed/tech1/800/600', 'Tecnología'),
  ('Circuitos del Futuro', 'imagen', 'https://picsum.photos/seed/tech2/800/600', 'Tecnología'),
  ('Código en Acción', 'video', 'https://www.w3schools.com/html/movie.mp4', 'Tecnología'),
  ('Pintura Abstracta', 'imagen', 'https://picsum.photos/seed/arte1/800/600', 'Arte'),
  ('Escultura Moderna', 'imagen', 'https://picsum.photos/seed/arte2/800/600', 'Arte'),
  ('Arte en Movimiento', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Arte');