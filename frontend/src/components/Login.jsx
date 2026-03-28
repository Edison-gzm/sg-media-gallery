 // Componente Login
// Formulario de autenticación básica
// Al hacer login exitoso guarda el token JWT en localStorage
// y notifica al componente padre que el usuario está autenticado

import { useState } from 'react';
import { login } from '../services/api';
import '../styles/Login.css';

function Login({ onCerrar, onLoginExitoso }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Llama al endpoint de login del backend
      const respuesta = await login(email, password);
      const { token } = respuesta.data;

      // Guarda el token en localStorage
      localStorage.setItem('token', token);

      // Notifica al padre que el login fue exitoso
      onLoginExitoso(token);
      onCerrar();

    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  // Cierra al hacer clic en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCerrar();
  };

  return (
    <div className="login__overlay" onClick={handleOverlayClick}>
      <div className="login__contenedor">

        {/* Botón cerrar */}
        <button className="login__btn-cerrar" onClick={onCerrar}>✕</button>

        {/* Título */}
        <h2 className="login__titulo">Iniciar sesión</h2>
        <p className="login__subtitulo">
          Inicia sesión para guardar tus favoritos
        </p>

        {/* Error */}
        {error && <div className="login__error">{error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="login__campo">
            <label className="login__label">Email</label>
            <input
              type="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@sg.com"
              required
            />
          </div>

          <div className="login__campo">
            <label className="login__label">Contraseña</label>
            <input
              type="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="login__btn-submit"
            disabled={cargando}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Credenciales de prueba */}
        <div className="login__credenciales">
          Credenciales de prueba:<br />
          <span>usuario@sg.com</span> / <span>1234</span>
        </div>

      </div>
    </div>
  );
}

export default Login;
