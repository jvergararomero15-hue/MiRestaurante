import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MesaService from "../services/MesaService";
import ReservaService from "../services/ReservaService";

function Reservas() {

  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [reserva, setReserva] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    personas: "",
    mesa: ""
  });

  useEffect(() => {
    cargarMesasLibres();
  }, []);

  const cargarMesasLibres = async () => {
    try {
      const data = await MesaService.obtenerMesas();
      const libres = data.filter(m => m.estado === "Libre");
      setMesas(libres);
    } catch (error) {
      console.error("Error al cargar mesas:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const reservarMesa = async (e) => {
    e.preventDefault();

    try {
      await ReservaService.crear({
        fecha: reserva.fecha,
        hora: reserva.hora,
        personas: reserva.personas,
        mesaId: Number(reserva.mesa),
        clienteId: null
      });

      await MesaService.reservarMesa(reserva.mesa, reserva.nombre);

      alert(`Mesa ${reserva.mesa} reservada para ${reserva.nombre}`);
      navigate("/mesas");
    } catch (error) {
      console.error("Error al reservar:", error);
      alert("Error al crear la reserva");
    }
  };

  if (cargando) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Cargando mesas disponibles...</h2>;
  }

  return (
    <div className="auth-card reserva-card">
      <h2>Reservar Mesa</h2>
      <p className="reserva-texto">
        Complete la información para reservar una mesa.
      </p>

      <form onSubmit={reservarMesa}>
        <label>Nombre del Cliente</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Juan Perez"
          value={reserva.nombre}
          onChange={handleChange}
          required
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={reserva.fecha}
          onChange={handleChange}
          required
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          value={reserva.hora}
          onChange={handleChange}
          required
        />

        <label>Personas</label>
        <input
          type="number"
          name="personas"
          placeholder="Cantidad de personas"
          value={reserva.personas}
          onChange={handleChange}
          required
        />

        <label>Mesa</label>
        <select
          name="mesa"
          value={reserva.mesa}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              Mesa {mesa.numero || mesa.id} - Cap: {mesa.capacidad}
            </option>
          ))}
        </select>

        <button type="submit">Reservar Mesa</button>
      </form>
    </div>
  );
}

export default Reservas;
