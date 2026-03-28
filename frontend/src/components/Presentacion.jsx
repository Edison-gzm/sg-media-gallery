 // Componente Presentacion
// Modo presentación automática que recorre el contenido secuencialmente
// Alterna entre imágenes y videos automáticamente
// Permite configurar la duración en segundos

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import '../styles/Presentacion.css';

function Presentacion({ items, onSalir }) {
  const [indice, setIndice] = useState(0);
  const [duracion, setDuracion] = useState(4);
  const [progreso, setProgreso] = useState(0);

  const itemActual = items[indice];

  // Avanza automáticamente al siguiente item
  useEffect(() => {
    if (!itemActual || itemActual.tipo === 'video') return;

    const intervalo = setInterval(() => {
      setIndice(prev => (prev + 1) % items.length);
      setProgreso(0);
    }, duracion * 1000);

    // Actualiza la barra de progreso cada 100ms
    const progresoIntervalo = setInterval(() => {
      setProgreso(prev => Math.min(prev + (100 / (duracion * 10)), 100));
    }, 100);

    return () => {
      clearInterval(intervalo);
      clearInterval(progresoIntervalo);
    };
  }, [indice, duracion, items, itemActual]);

  // Cierra con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onSalir();
      if (e.key === 'ArrowRight') setIndice(prev => (prev + 1) % items.length);
      if (e.key === 'ArrowLeft') setIndice(prev => (prev - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, onSalir]);

  if (!itemActual) return null;

  return (
    <div className="presentacion">

      {/* Barra superior */}
      <div className="presentacion__header">
        <span className="presentacion__contador">
          {indice + 1} / {items.length}
        </span>

        <div className="presentacion__acciones">
          {/* Control de duración */}
          <div className="presentacion__duracion">
            <span>Duración:</span>
            <input
              type="number"
              min="1"
              max="30"
              value={duracion}
              onChange={(e) => setDuracion(Number(e.target.value))}
            />
            <span>seg</span>
          </div>

          <button className="presentacion__btn-salir" onClick={onSalir}>
            ✕ Salir
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="presentacion__contenido">
        {itemActual.tipo === 'imagen' ? (
          <img
            key={itemActual.id}
            src={itemActual.url}
            alt={itemActual.titulo}
            className="presentacion__imagen"
          />
        ) : (
              <video
                key={itemActual.id}
                controls
                autoPlay
                style={{ width: '100%', maxHeight: '70vh' }}
                onEnded={() => setIndice(prev => (prev + 1) % items.length)}
              >
                <source src={itemActual.url} type="video/mp4" />
              </video>
        )}
      </div>

      {/* Título */}
      <p className="presentacion__titulo">{itemActual.titulo}</p>

      {/* Barra de progreso - solo para imágenes */}
      {itemActual.tipo === 'imagen' && (
        <div
          className="presentacion__progreso"
          style={{ width: `${progreso}%`, transition: `width ${duracion}s linear` }}
        />
      )}

    </div>
  );
}

export default Presentacion;
