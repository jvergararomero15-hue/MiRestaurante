import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Navbar() {

  const navigate = useNavigate();
  const usuario = AuthService.obtenerUsuario();
  const autenticado = AuthService.estaAutenticado();
  const esAdmin = usuario && usuario.rol === "ADMIN";

  const cerrarSesion = () => {
    AuthService.cerrarSesion();
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="nav-container">

        <Link to="/" className="logo">
          🍽️ Delicias
        </Link>

        <ul className="nav-links">
          <li><Link to="/">🏠 Inicio</Link></li>
          <li><Link to="/menu">🍔 Menú</Link></li>
          <li><Link to="/reservas">📅 Reservar</Link></li>
          <li><Link to="/mesas">🍽️ Mesas</Link></li>

          {esAdmin && (
            <li><Link to="/admin">⚙️ Panel Admin</Link></li>
          )}

          {autenticado ? (
            <>
              <li className="nav-usuario">
                <span>👤 {usuario.nombre}</span>
              </li>
              <li>
                <button className="btn-salir" onClick={cerrarSesion}>
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">🔐 Login</Link></li>
              <li><Link to="/registro">📝 Registro</Link></li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          <button
            className="btn-reserva"
            onClick={() => navigate("/reservas")}
          >
             🍽️ Reservar Mesa
          </button>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;
