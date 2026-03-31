-- Initial database setup for SG Interactive Gallery
-- Creates tables and loads seed data

CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(10) CHECK (type IN ('image', 'video')) NOT NULL,
  url VARCHAR(500) NOT NULL,
  category VARCHAR(50) CHECK (category IN ('Nature', 'Technology', 'Art')) NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  "contentId" INTEGER NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

INSERT INTO content (title, type, url, category) VALUES
  ('Bosque Verde', 'image', 'https://picsum.photos/seed/naturaleza1/800/600', 'Nature'),
  ('Montaña Nevada', 'image', 'https://picsum.photos/seed/naturaleza2/800/600', 'Nature'),
  ('Naturaleza en Movimiento', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Nature'),
  ('Inteligencia Artificial', 'image', 'https://picsum.photos/seed/tech1/800/600', 'Technology'),
  ('Circuitos del Futuro', 'image', 'https://picsum.photos/seed/tech2/800/600', 'Technology'),
  ('Código en Acción', 'video', 'https://www.w3schools.com/html/movie.mp4', 'Technology'),
  ('Pintura Abstracta', 'image', 'https://picsum.photos/seed/arte1/800/600', 'Art'),
  ('Escultura Moderna', 'image', 'https://picsum.photos/seed/arte2/800/600', 'Art'),
  ('Arte en Movimiento', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Art');