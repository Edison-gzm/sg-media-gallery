//It is the main view of the gallery, the grid where the user sees all the content and can interact with it.

import '../styles/GaleriaGrid.css';

function GalleryGrid({ items, loading, onItemClick, favorites, onToggleFavorite, isAuthenticated }) {

  const isFavorite = (id) => favorites.some(f => f.Content?.id === id || f.contentId === id);

  if (loading) {
    return <div className="gallery__loading">Cargando galería...</div>;
  }

  if (!items.length) {
    return <div className="gallery__empty">No hay contenido en esta categoría</div>;
  }

  return (
    <section className="gallery">
      <div className="gallery__grid">
        {items.map(item => (
          <div
            key={item.id}
            className="gallery__card fade-in"
            onClick={() => onItemClick(item)}
          >
            <div className="gallery__card-image">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.title} />
              ) : (
                <div className="gallery__video-thumbnail">
                  <span className="gallery__play-icon">▶</span>
                  <img
                    src={`https://picsum.photos/seed/${item.title}/800/600`}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${item.id}thumb/800/600`;
                    }}
                  />
                </div>
              )}

              <span className={`gallery__badge ${item.type === 'video' ? 'gallery__badge--video' : ''}`}>
                {item.type === 'video' ? '▶ Video' : '🖼 Imagen'}
              </span>

              {isAuthenticated && (
                <button
                  className={`gallery__favorite-btn ${isFavorite(item.id) ? 'gallery__favorite-btn--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item);
                  }}
                >
                  {isFavorite(item.id) ? '★' : '☆'}
                </button>
              )}
            </div>

            <div className="gallery__card-info">
              <p className="gallery__card-title">{item.title}</p>
              <p className="gallery__card-category">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GalleryGrid;