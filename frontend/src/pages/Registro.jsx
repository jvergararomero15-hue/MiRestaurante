import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nombre: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🎉 Bienvenido ${user.nombre}. ¡Registro exitoso!`);
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={user.nombre}
            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
}

export default Registro;