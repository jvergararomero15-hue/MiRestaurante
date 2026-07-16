import { useParams } from "react-router-dom";
import { useState } from "react";

function MesaDetalle() {

  const { id } = useParams();

  const productos = [
    { nombre: "Hamburguesa", precio: 25000 },
    { nombre: "Pizza", precio: 35000 },
    { nombre: "Gaseosa", precio: 5000 },
    { nombre: "Papas", precio: 8000 }
  ];

  const [consumos, setConsumos] = useState([]);

  const agregarConsumo = (producto) => {
    setConsumos([...consumos, producto]);
  };

  const total = consumos.reduce(
    (acum, item) => acum + item.precio,
    0
  );

  return (
    <div className="mesa-detalle">

      <h1>🍽️ Mesa {id}</h1>

      <h2>Menú Disponible</h2>

      <div className="menu-grid">

        {productos.map((producto, index) => (
          <div
            className="menu-card"
            key={index}
          >

            <h3>{producto.nombre}</h3>

            <p>
              ${producto.precio.toLocaleString()}
            </p>

            <button
              className="btn-order"
              onClick={() => agregarConsumo(producto)}
            >
              ➕ Agregar
            </button>

          </div>
        ))}

      </div>

      <h2 style={{ marginTop: "40px" }}>
        🧾 Consumo de la Mesa
      </h2>

      {consumos.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        <ul className="lista-consumos">

          {consumos.map((item, index) => (
            <li key={index}>
              {item.nombre} - $
              {item.precio.toLocaleString()}
            </li>
          ))}

        </ul>
      )}

      <h2 className="total-mesa">
        Total: ${total.toLocaleString()}
      </h2>

      <button
        className="btn-cobrar"
        onClick={() =>
          alert(
            `Mesa ${id} cobrada por $${total.toLocaleString()}`
          )
        }
      >
        💰 Cobrar Mesa
      </button>

    </div>
  );
}

export default MesaDetalle;