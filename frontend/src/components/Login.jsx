// Login form that authenticates the user and stores the JWT token in localStorage

import { useState } from 'react';
import { login } from '../services/api';
import '../styles/Login.css';

function Login({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess(token);
      onClose();
    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="login__overlay" onClick={handleOverlayClick}>
      <div className="login__container">

        <button className="login__close-btn" onClick={onClose}>✕</button>

        <h2 className="login__title">Iniciar sesión</h2>
        <p className="login__subtitle">Inicia sesión para guardar tus favoritos</p>

        {error && <div className="login__error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login__field">
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

          <div className="login__field">
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
            className="login__submit-btn"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="login__test-credentials">
          Credenciales de prueba:<br />
          <span>usuario@sg.com</span> / <span>1234</span>
        </div>

      </div>
    </div>
  );
}

export default Login;