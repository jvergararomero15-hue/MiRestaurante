import { useState } from "react";

function Reservas() {

  const [reserva, setReserva] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    personas: ""
  });

  const handleChange = (e) => {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value
    });
  };

  const reservarMesa = (e) => {
    e.preventDefault();

    alert(
      `✅ Reserva creada para ${reserva.nombre}`
    );

    console.log(reserva);
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>🍽️ Reservar Mesa</h2>

        <form onSubmit={reservarMesa}>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="fecha"
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="hora"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="personas"
            placeholder="Número de personas"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Reservar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Reservas;