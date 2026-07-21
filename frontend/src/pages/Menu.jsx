import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MesaService from "../services/MesaService";

import MenuService from "../services/MenuService";
const platos = MenuService.obtenerPlatos();




function Menu() {


  const navigate = useNavigate();


  const [searchParams] = useSearchParams();


  // Si existe mesaId significa que viene desde una mesa
  const mesaId = searchParams.get("mesa");



  const [mensaje, setMensaje] = useState("");





  const agregar = (plato) => {


    if(!mesaId) return;



    MesaService.agregarProducto(

      mesaId,

      {
        nombre: plato.nombre,
        precio: plato.precio
      }

    );



    setMensaje(
      `✅ ${plato.nombre} agregado a Mesa ${mesaId}`
    );



    setTimeout(() => {

      setMensaje("");

    },2000);


  };







  return (


    <div className="menu">





      {mesaId && (

        <button

          className="btn-volver"

          onClick={() => navigate(`/mesa/${mesaId}`)}

        >

          ⬅ Volver a Mesa {mesaId}

        </button>


      )}







      {mesaId && mensaje !== "" && (


        <div

          style={{

            position:"fixed",

            top:"20px",

            right:"20px",

            background:"#2ecc71",

            color:"white",

            padding:"15px 25px",

            borderRadius:"12px",

            fontWeight:"bold",

            zIndex:9999,

            boxShadow:"0 5px 15px rgba(0,0,0,0.3)"

          }}

        >

          {mensaje}

        </div>


      )}








      <h2>

        🍽️ Menú del Restaurante

      </h2>







      {mesaId && (

        <h3>

          🪑 Pedido para Mesa {mesaId}

        </h3>

      )}







      <div className="menu-grid">






        {platos.map((plato)=>(





          <div

            className="menu-card"

            key={plato.id}

          >





            <div className="menu-icon">

              {plato.imagen}

            </div>






            <h3>

              {plato.nombre}

            </h3>






            <p>

              {plato.descripcion}

            </p>






            <span className="precio">

              ${plato.precio.toLocaleString()}

            </span>








            {mesaId && (

              <button

                className="btn-order"

                onClick={() => agregar(plato)}

              >

                ➕ Agregar

              </button>


            )}






          </div>






        ))}





      </div>






    </div>


  );


}


export default Menu;