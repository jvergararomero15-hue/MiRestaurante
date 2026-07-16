import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🔐 Inicio de sesión con: ${creds.email}`);
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
      </div>
    </div>
  );
}

export default Login;