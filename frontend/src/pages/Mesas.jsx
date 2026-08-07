import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MesaService from "../services/MesaService";
import AuthService from "../services/AuthService";

function Mesas() {

  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const esAdmin = AuthService.obtenerUsuario()?.rol === "ADMIN";

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    try {
      const data = await MesaService.obtenerMesas();
      setMesas(data);
    } catch (error) {
      console.error("Error al cargar mesas:", error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerClase = (mesa) => {
    if (mesa.estado === "Reservada") return "mesa-pendiente";
    if (mesa.estado === "Ocupada") return "mesa-ocupada";
    return "mesa-libre";
  };

  const obtenerEstado = (mesa) => {
    if (mesa.estado === "Reservada") return "Reservada";
    if (mesa.estado === "Ocupada") return "Ocupada";
    return "Libre";
  };

  const agregarNuevaMesa = async () => {
    const numero = mesas.length + 1;
    try {
      await MesaService.crearMesa(numero, 4);
      cargarMesas();
    } catch (error) {
      console.error("Error al crear mesa:", error);
    }
  };

  const eliminarMesa = async (id) => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar la Mesa ${id}?`);
    if (confirmar) {
      try {
        await MesaService.eliminarMesa(id);
        cargarMesas();
      } catch (error) {
        console.error("Error al eliminar mesa:", error);
      }
    }
  };

  if (cargando) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Cargando mesas...</h2>;
  }

  return (
    <div className="mesas-container">
      <h2>Gestión de Mesas</h2>
      <p className="mesas-subtitulo">
        Administra el estado de cada mesa del restaurante.
      </p>

      {esAdmin && (
        <button className="btn-order" onClick={agregarNuevaMesa}>
          Agregar Mesa
        </button>
      )}

      <div className="mesas-grid">
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            className={`mesa-card ${obtenerClase(mesa)}`}
            onClick={() => navigate(`/mesa/${mesa.id}`)}
          >
            <div className="mesa-icon">🪑</div>
            <h3>Mesa {mesa.numero || mesa.id}</h3>
            <p>{obtenerEstado(mesa)}</p>
            {mesa.reservadoPor && (
              <p className="mesa-reservante">{mesa.reservadoPor}</p>
            )}
            <h4>${(mesa.total || 0).toLocaleString()}</h4>

            {esAdmin && (
              <button
                className="btn-eliminar"
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarMesa(mesa.id);
                }}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mesas;
