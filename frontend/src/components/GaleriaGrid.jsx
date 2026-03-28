 // Componente GaleriaGrid
// Muestra todas las imágenes y videos en un grid responsivo
// Permite hacer clic en cada item para verlo en detalle
// y marcar/desmarcar favoritos si el usuario está autenticado

import '../styles/GaleriaGrid.css';

function GaleriaGrid({ items, cargando, onClickItem, favoritos, onToggleFavorito, usuarioAutenticado }) {

  // Verifica si un item está en favoritos
  const esFavorito = (id) => favoritos.some(f => f.Contenido?.id === id || f.contenidoId === id);

  if (cargando) {
    return <div className="galeria__cargando">Cargando galería...</div>;
  }

  if (!items.length) {
    return <div className="galeria__vacio">No hay contenido en esta categoría</div>;
  }

  return (
    <section className="galeria">
      <div className="galeria__grid">
        {items.map(item => (
          <div
            key={item.id}
            className="galeria__card fade-in"
            onClick={() => onClickItem(item)}
          >
            {/* Imagen o thumbnail del video */}
            <div className="galeria__card-imagen">
              <img
                src={item.tipo === 'imagen'
                  ? item.url
                  : `https://img.youtube.com/vi/${item.url.split('v=')[1]}/hqdefault.jpg`
                }
                alt={item.titulo}
              />

              {/* Badge de tipo */}
              <span className={`galeria__badge ${item.tipo === 'video' ? 'galeria__badge--video' : ''}`}>
                {item.tipo === 'video' ? '▶ Video' : '🖼 Imagen'}
              </span>

              {/* Botón favorito - solo visible si está autenticado */}
              {usuarioAutenticado && (
                <button
                  className={`galeria__btn-favorito ${esFavorito(item.id) ? 'galeria__btn-favorito--activo' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita abrir el modal al hacer clic en favorito
                    onToggleFavorito(item);
                  }}
                >
                  {esFavorito(item.id) ? '★' : '☆'}
                </button>
              )}
            </div>

            {/* Info */}
            <div className="galeria__card-info">
              <p className="galeria__card-titulo">{item.titulo}</p>
              <p className="galeria__card-categoria">{item.categoria}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GaleriaGrid;
