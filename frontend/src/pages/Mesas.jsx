import { useNavigate } from "react-router-dom";

function Mesas() {

  const navigate = useNavigate();

  const mesas = [
    { id: 1, estado: "Libre" },
    { id: 2, estado: "Libre" },
    { id: 3, estado: "Ocupada" },
    { id: 4, estado: "Libre" },
    { id: 5, estado: "Pendiente" },
    { id: 6, estado: "Libre" },
    { id: 7, estado: "Ocupada" },
    { id: 8, estado: "Libre" }
  ];

  const obtenerClase = (estado) => {
    if (estado === "Libre") return "mesa-libre";
    if (estado === "Ocupada") return "mesa-ocupada";
    return "mesa-pendiente";
  };

  return (
    <div className="mesas-container">

      <h2>🍽️ Gestión de Mesas</h2>

      <p className="mesas-subtitulo">
        Selecciona una mesa para ver su cuenta y pedidos.
      </p>

      <div className="mesas-grid">

       {mesas.map((mesa) => (
  <div
    key={mesa.id}
    className={`mesa-card ${obtenerClase(mesa.estado)}`}
    onClick={() => navigate(`/mesa/${mesa.id}`)}
  >
    <div className="mesa-icon">🪑</div>

    <h3>Mesa {mesa.id}</h3>

    <p>{mesa.estado}</p>
  </div>
))}

      </div>

    </div>
  );
}

export default Mesas;