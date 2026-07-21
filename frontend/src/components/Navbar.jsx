import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div className="nav-container">

        <Link to="/" className="logo">
          🍽️ Delicias
        </Link>

        <ul className="nav-links">
          <li><Link to="/">🏠 Inicio</Link></li>
          <li><Link to="/menu">🍔 Menú</Link></li>
          <li><Link to="/clientes">👥 Clientes</Link></li>
          <li><Link to="/login">🔐 Login</Link></li>
          <li><Link to="/registro">📝 Registro</Link></li>
          <li><Link to="/carrito">🛒 Carrito</Link></li>
          <li><Link to="/mesas">🍽️ Mesas</Link></li>
          <li><Link to="/administrar-menu">🛠️ Administrar Menú</Link></li>
          
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