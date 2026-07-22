import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MesaService from "../services/MesaService";
import MenuService from "../services/MenuService";

function Menu() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mesaId = searchParams.get("mesa");

  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarPlatos = async () => {
      try {
        const data = await MenuService.obtenerPlatos();
        setPlatos(data);
      } catch (error) {
        console.error("Error al cargar platos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarPlatos();
  }, []);

  const agregar = (plato) => {
    if (!mesaId) return;

    MesaService.agregarProducto(mesaId, {
      nombre: plato.nombre,
      precio: plato.precio,
    });

    setMensaje(`✅ ${plato.nombre} agregado con éxito a la Mesa ${mesaId}`);

    setTimeout(() => {
      setMensaje("");
    }, 2500);
  };

  if (cargando) {
    return (
      <h2 style={{ color: "white", textAlign: "center" }}>
        Cargando menú...
      </h2>
    );
  }

  return (
    <div className="menu">

      {mensaje && (
        <div className="toast-exito">
          <span className="toast-icon">✅</span>
          <span>{mensaje}</span>
        </div>
      )}

      {mesaId && (
        <button
          className="btn-volver"
          onClick={() => navigate(`/mesa/${mesaId}`)}
        >
          ⬅ Volver a Mesa {mesaId}
        </button>
      )}

      <h2>🍽 Menú del Restaurante</h2>

      {mesaId && (
        <h3 style={{ marginBottom: "25px" }}>
          Pedido para Mesa {mesaId}
        </h3>
      )}

      <div className="menu-grid">
        {platos.map((plato) => (
          <div className="menu-card" key={plato.idPlato}>
            <div className="menu-icon">
              {plato.imagen || "🍽️"}
            </div>

            <h3>{plato.nombre}</h3>

            <p>{plato.descripcion}</p>

            <span className="precio">
              ${plato.precio?.toLocaleString()}
            </span>

            {mesaId && (
              <button
                className="btn-order"
                onClick={() => agregar(plato)}
              >
                Agregar al pedido
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Menu;