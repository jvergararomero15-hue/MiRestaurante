import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MesaService from "../services/MesaService";
import AuthService from "../services/AuthService";

function MesaDetalle() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [mesa, setMesa] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarMesa();
  }, [id]);

  const cargarMesa = async () => {
    try {
      const data = await MesaService.obtenerMesa(id);
      setMesa(data);
    } catch (error) {
      console.error("Error al cargar mesa:", error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <h2 style={{ color: "white" }}>Cargando...</h2>;
  if (!mesa) return <h2 style={{ color: "white" }}>Mesa no encontrada</h2>;

  const iniciarServicio = async () => {
    await MesaService.iniciarServicio(id);
    cargarMesa();
  };

  const agregarConsumo = async (producto) => {
    await MesaService.agregarProducto(id, producto);
    cargarMesa();
  };

  const eliminarProducto = async (index) => {
    await MesaService.eliminarProducto(id, index);
    cargarMesa();
  };

  const cobrar = async () => {
    alert(`Mesa ${id} cobrada por $${(mesa.total || 0).toLocaleString()}`);
    await MesaService.cobrarMesa(id);
    navigate("/mesas");
  };

  const esAdmin = AuthService.obtenerUsuario()?.rol === "ADMIN";

  return (
    <div className="mesa-detalle">
      <button className="btn-volver" onClick={() => navigate("/mesas")}>
        Volver a Mesas
      </button>

      <h1>Mesa {mesa.numero || id}</h1>

      <h3 style={{ color: "#ccc", textAlign: "center" }}>
        Estado: {mesa.estado}
      </h3>

      {mesa.reservadoPor && (
        <h3 style={{ color: "#f0c040", textAlign: "center" }}>
          Reservado por: {mesa.reservadoPor}
        </h3>
      )}

      {mesa.estado === "Reservada" && (
        <button className="btn-iniciar" onClick={iniciarServicio}>
          Iniciar Servicio
        </button>
      )}

      <button
        className="btn-order"
        onClick={() => navigate(`/menu?mesa=${id}`)}
      >
        Ver menú completo
      </button>

      <h2 style={{ marginTop: "40px" }}>Consumo de la Mesa</h2>

      {!mesa.consumos || mesa.consumos.length === 0 ? (
        <p className="sin-consumos">No hay productos agregados.</p>
      ) : (
        <div className="lista-consumos">
          {mesa.consumos.map((item, index) => (
            <div className="consumo-card" key={index}>
              <div className="consumo-info">
                <h3>{item.nombre}</h3>
                <p>Precio: <strong>${item.precio.toLocaleString()}</strong></p>
                <p>Subtotal: <strong>${(item.precio * item.cantidad).toLocaleString()}</strong></p>
              </div>
              <div className="cantidad-box">
                <button className="btn-cantidad" onClick={() => eliminarProducto(index)}>
                  -
                </button>
                <span>{item.cantidad}</span>
                <button
                  className="btn-cantidad"
                  onClick={() => agregarConsumo({ nombre: item.nombre, precio: item.precio })}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="total-mesa">
        Total: ${(mesa.total || 0).toLocaleString()}
      </h2>

      {esAdmin ? (
        <button className="btn-cobrar" onClick={cobrar}>
          Cobrar Mesa
        </button>
      ) : (
        <p style={{ color: "#999", textAlign: "center", marginTop: "10px" }}>
          Solo un administrador puede cobrar esta mesa.
        </p>
      )}
    </div>
  );
}

export default MesaDetalle;
