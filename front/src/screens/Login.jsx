import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate('/cliente');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginError('Credenciales incorrectas. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <img className="logo-login" src="../src/assets/logo.png" alt="TECSUP" />

      <form onSubmit={handleLogin} className="login-inputs">

      <p className="title-login">¡Bienvenido!</p>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="iniciar">Iniciar sesión</button>
        {loginError && <p className="error-message">{loginError}</p>}
      </form>
    </div>
  )
}
