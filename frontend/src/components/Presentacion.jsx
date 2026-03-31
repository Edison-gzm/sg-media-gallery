// Slideshow component - auto-advances through media items, supports keyboard navigation and configurable image duration

import { useState, useEffect } from 'react';
import '../styles/Presentacion.css';

function Slideshow({ items, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(4);
  const [progress, setProgress] = useState(0);

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!currentItem || currentItem.type === 'video') return;

    const slideInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
      setProgress(0);
    }, duration * 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (duration * 10)), 100));
    }, 100);

    return () => {
      clearInterval(slideInterval);
      clearInterval(progressInterval);
    };
  }, [currentIndex, duration, items, currentItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onExit();
      if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev + 1) % items.length);
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, onExit]);

  if (!currentItem) return null;

  return (
    <div className="slideshow">

      <div className="slideshow__header">
        <span className="slideshow__counter">
          {currentIndex + 1} / {items.length}
        </span>

        <div className="slideshow__actions">
          <div className="slideshow__duration">
            <span>Duración:</span>
            <input
              type="number"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
            <span>seg</span>
          </div>

          <button className="slideshow__exit-btn" onClick={onExit}>
            ✕ Salir
          </button>
        </div>
      </div>

      <div className="slideshow__content">
        {currentItem.type === 'image' ? (
          <img
            key={currentItem.id}
            src={currentItem.url}
            alt={currentItem.title}
            className="slideshow__image"
          />
        ) : (
          <video
            key={currentItem.id}
            controls
            autoPlay
            style={{ width: '100%', maxHeight: '70vh' }}
            onEnded={() => setCurrentIndex(prev => (prev + 1) % items.length)}
          >
            <source src={currentItem.url} type="video/mp4" />
          </video>
        )}
      </div>

      <p className="slideshow__title">{currentItem.title}</p>

      {currentItem.type === 'image' && (
        <div
          className="slideshow__progress"
          style={{ width: `${progress}%`, transition: `width ${duration}s linear` }}
        />
      )}

    </div>
  );
}

export default Slideshow;
