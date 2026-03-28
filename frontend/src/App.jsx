// Componente principal de la aplicación
// Une todos los componentes y maneja el estado global
// Conecta con el backend para obtener el contenido y los favoritos

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GaleriaGrid from './components/GaleriaGrid';
import Modal from './components/Modal';
import Presentacion from './components/Presentacion';
import Login from './components/Login';
import {
  obtenerContenido,
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito
} from './services/api';

function App() {
  // Estados principales
  const [contenido, setContenido] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [modoPresent, setModoPresent] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  // Verifica si hay token guardado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUsuarioAutenticado(true);
  }, []);

  // Carga el contenido del backend al iniciar
  useEffect(() => {
    const cargarContenido = async () => {
      try {
        const respuesta = await obtenerContenido();
        setContenido(respuesta.data);
      } catch (error) {
        console.error('Error al cargar el contenido:', error);
      } finally {
        setCargando(false);
      }
    };
    cargarContenido();
  }, []);

  // Carga los favoritos si el usuario está autenticado
  useEffect(() => {
    if (!usuarioAutenticado) return;
    const cargarFavoritos = async () => {
      try {
        const respuesta = await obtenerFavoritos();
        setFavoritos(respuesta.data);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };
    cargarFavoritos();
  }, [usuarioAutenticado]);

  // Filtra el contenido por categoría
  const contenidoFiltrado = categoriaActiva === 'Todas'
  ? contenido
  : categoriaActiva === 'Favoritos'
    ? contenido.filter(item => favoritos.some(f => f.Contenido?.id === item.id || f.contenidoId === item.id))
    : contenido.filter(item => item.categoria === categoriaActiva);

  // Agrega o elimina un favorito
  const handleToggleFavorito = async (item) => {
    try {
      const favoritoExistente = favoritos.find(
        f => f.Contenido?.id === item.id || f.contenidoId === item.id
      );

      if (favoritoExistente) {
        await eliminarFavorito(favoritoExistente.id);
        setFavoritos(prev => prev.filter(f => f.id !== favoritoExistente.id));
      } else {
        const respuesta = await agregarFavorito(item.id);
        setFavoritos(prev => [...prev, respuesta.data.favorito]);
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  };

  // Maneja el login exitoso
  const handleLoginExitoso = (token) => {
    setUsuarioAutenticado(true);
  };

  // Maneja el logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuarioAutenticado(false);
    setFavoritos([]);
  };

  return (
    <div className="app">

      {/* Barra de navegación */}
      <Navbar
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
        onPresentacion={() => setModoPresent(true)}
        onLogin={() => setMostrarLogin(true)}
        usuarioAutenticado={usuarioAutenticado}
        onLogout={handleLogout}
      />

      {/* Grid de imágenes y videos */}
      <GaleriaGrid
        items={contenidoFiltrado}
        cargando={cargando}
        onClickItem={setItemSeleccionado}
        favoritos={favoritos}
        onToggleFavorito={handleToggleFavorito}
        usuarioAutenticado={usuarioAutenticado}
      />

      {/* Modal de vista detallada */}
      <Modal
        item={itemSeleccionado}
        onCerrar={() => setItemSeleccionado(null)}
      />

      {/* Modo presentación */}
      {modoPresent && (
        <Presentacion
          items={contenidoFiltrado}
          onSalir={() => setModoPresent(false)}
        />
      )}

      {/* Login */}
      {mostrarLogin && (
        <Login
          onCerrar={() => setMostrarLogin(false)}
          onLoginExitoso={handleLoginExitoso}
        />
      )}

    </div>
  );
}

export default App;