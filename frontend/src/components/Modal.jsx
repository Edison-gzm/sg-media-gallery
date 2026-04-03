// Modal that displays selected media in detail - images support interactive zoom, videos autoplay

import { useState, useRef, useEffect } from 'react';
import '../styles/Modal.css';

function Modal({ item, onClose }) {
  const [zoom, setZoom] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (item?.type === 'video' && videoRef.current) {
      videoRef.current.load();
    }
  }, [item]);

  if (!item) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className="modal__container">

        <button className="modal__close-btn" onClick={onClose}>✕</button>

        {item.type === 'image' ? (
          <>
            <div
              className="modal__image-container"
              onClick={() => setZoom(!zoom)}
            >
              <img
                src={item.url}
                alt={item.title}
                className={`modal__image ${zoom ? 'modal__image--zoom' : ''}`}
              />
            </div>
            <span className="modal__zoom-hint">
              {zoom ? 'Clic para alejar' : 'Clic para zoom'}
            </span>
          </>
        ) : (
          <div className="modal__video-container">
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

        <div className="modal__info">
          <p className="modal__title">{item.title}</p>
          <p className="modal__category">{item.category}</p>
        </div>

      </div>
    </div>
  );
}

export default Modal;