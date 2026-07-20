import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MesaService from "../services/MesaService";

function Reservas() {

  const navigate = useNavigate();

  const mesas = MesaService.obtenerMesas().filter(
    mesa => mesa.estado === "Libre" && !mesa.reservada
  );

  const [reserva, setReserva] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    personas: "",
    mesa: ""
  });

  const handleChange = (e) => {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value
    });
  };

  const reservarMesa = (e) => {

    e.preventDefault();

    MesaService.reservarMesa(
      reserva.mesa,
      reserva.nombre
    );

    alert(
      `✅ Mesa ${reserva.mesa} reservada para ${reserva.nombre}`
    );

    navigate("/mesas");

  };

  return (

    <div className="auth-card reserva-card">

    <h2>🍽️ Reservar Mesa</h2>

    <p className="reserva-texto">
        Complete la información para reservar una mesa.
    </p>

    <form onSubmit={reservarMesa}>

        <label>👤 Nombre del Cliente</label>

        <input
            type="text"
            name="nombre"
            placeholder="Ej: Juan Pérez"
            value={reserva.nombre}
            onChange={handleChange}
            required
        />

        <label>📅 Fecha</label>

        <input
            type="date"
            name="fecha"
            value={reserva.fecha}
            onChange={handleChange}
            required
        />

        <label>🕒 Hora</label>

        <input
            type="time"
            name="hora"
            value={reserva.hora}
            onChange={handleChange}
            required
        />

        <label>👥 Personas</label>

        <input
            type="number"
            name="personas"
            placeholder="Cantidad de personas"
            value={reserva.personas}
            onChange={handleChange}
            required
        />

        <label>🪑 Mesa</label>

        <select
            name="mesa"
            value={reserva.mesa}
            onChange={handleChange}
            required
        >

            <option value="">Seleccione una mesa</option>

            {mesas.map((mesa) => (

                <option
                    key={mesa.id}
                    value={mesa.id}
                >
                    🍽 Mesa {mesa.id}
                </option>

            ))}

        </select>

        <button type="submit">

            📅 Reservar Mesa

        </button>

    </form>

</div>
  )
}

export default Reservas;