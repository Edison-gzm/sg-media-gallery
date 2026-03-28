 
// Componente Navbar
// Muestra el logo, las categorías y los botones de presentación y login
// Recibe la categoría activa y las funciones para cambiarla

import '../styles/Navbar.css';

const CATEGORIAS = ['Todas', 'Naturaleza', 'Tecnología', 'Arte', 'Favoritos'];

function Navbar({ categoriaActiva, setCategoriaActiva, onPresentacion, onLogin, usuarioAutenticado, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar__contenedor">

        {/* Logo */}
        <div className="navbar__logo">
          SG<span>Gallery</span>
        </div>

        {/* Categorías */}
        <ul className="navbar__categorias">
          {CATEGORIAS.map(cat => {
            // Solo muestra Favoritos si está autenticado
            if (cat === 'Favoritos' && !usuarioAutenticado) return null;
            return (
              <li key={cat}>
                <button
                  className={`navbar__btn-categoria ${categoriaActiva === cat ? 'navbar__btn-categoria--activo' : ''}`}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat === 'Favoritos' ? '★ Favoritos' : cat}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Acciones */}
        <div className="navbar__acciones">
          <button className="navbar__btn-presentacion" onClick={onPresentacion}>
            ▶ Presentación
          </button>
          {usuarioAutenticado ? (
            <button className="navbar__btn-login" onClick={onLogout}>
              Cerrar sesión
            </button>
          ) : (
            <button className="navbar__btn-login" onClick={onLogin}>
              Iniciar sesión
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;