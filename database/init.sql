 
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
  ('Naturaleza en 4K', 'video', 'https://www.youtube.com/watch?v=BHACKCNDMW8', 'Naturaleza'),
  ('Inteligencia Artificial', 'imagen', 'https://picsum.photos/seed/tech1/800/600', 'Tecnología'),
  ('Circuitos del Futuro', 'imagen', 'https://picsum.photos/seed/tech2/800/600', 'Tecnología'),
  ('El Futuro de la IA', 'video', 'https://www.youtube.com/watch?v=kCc8FmEb1nY', 'Tecnología'),
  ('Pintura Abstracta', 'imagen', 'https://picsum.photos/seed/arte1/800/600', 'Arte'),
  ('Escultura Moderna', 'imagen', 'https://picsum.photos/seed/arte2/800/600', 'Arte'),
  ('Arte Digital en Movimiento', 'video', 'https://www.youtube.com/watch?v=TJ6DnRhj3kA', 'Arte');