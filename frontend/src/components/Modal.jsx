// Componente Modal
// Muestra el contenido seleccionado en detalle
// Las imágenes tienen zoom interactivo al hacer clic
// Los videos se reproducen con reproductor nativo HTML5

import { useState, useRef, useEffect } from 'react';
import '../styles/Modal.css';

function Modal({ item, onCerrar }) {
  const [zoom, setZoom] = useState(false);
  const videoRef = useRef(null);

  // Reproduce el video cuando el modal abre
  useEffect(() => {
    if (item?.tipo === 'video' && videoRef.current) {
      videoRef.current.load();
    }
  }, [item]);

  if (!item) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCerrar();
  };

  return (
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className="modal__contenedor">

        {/* Botón cerrar */}
        <button className="modal__btn-cerrar" onClick={onCerrar}>✕</button>

        {/* Imagen con zoom interactivo */}
        {item.tipo === 'imagen' ? (
          <>
            <div
              className="modal__imagen-contenedor"
              onClick={() => setZoom(!zoom)}
            >
              <img
                src={item.url}
                alt={item.titulo}
                className={`modal__imagen ${zoom ? 'modal__imagen--zoom' : ''}`}
              />
            </div>
            <span className="modal__zoom-hint">
              {zoom ? 'Clic para alejar' : 'Clic para zoom'}
            </span>
          </>
        ) : (
          /* Reproductor nativo HTML5 */
          <div className="modal__video-contenedor">
            <video
              ref={videoRef}
              controls
              autoPlay
              style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
            >
              <source src={item.url} type="video/mp4" />
              Tu navegador no soporta el reproductor de video.
            </video>
          </div>
        )}

        {/* Info del item */}
        <div className="modal__info">
          <div>
            <p className="modal__titulo">{item.titulo}</p>
            <p className="modal__categoria">{item.categoria}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Modal;