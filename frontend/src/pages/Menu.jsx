import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MesaService from "../services/MesaService";


const platos = [

  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    precio: 25000,
    descripcion: "Pan artesanal, carne, queso y verduras",
    imagen: "🍔"
  },

  {
    id: 2,
    nombre: "Pizza Especial",
    precio: 35000,
    descripcion: "Queso, carnes y vegetales frescos",
    imagen: "🍕"
  },

  {
    id: 3,
    nombre: "Pasta Carbonara",
    precio: 18000,
    descripcion: "Pasta cremosa con queso y panceta",
    imagen: "🍝"
  },

  {
    id: 4,
    nombre: "Pollo a la Parrilla",
    precio: 28000,
    descripcion: "Pollo acompañado con papas y ensalada",
    imagen: "🍗"
  },

  {
    id: 5,
    nombre: "Salmón al Horno",
    precio: 32000,
    descripcion: "Salmón acompañado con verduras",
    imagen: "🐟"
  },

  {
    id: 6,
    nombre: "Ensalada César",
    precio: 15000,
    descripcion: "Lechuga, pollo, queso y aderezo",
    imagen: "🥗"
  },

  {
    id: 7,
    nombre: "Papas con Queso",
    precio: 9000,
    descripcion: "Papas crocantes con queso",
    imagen: "🍟"
  },

  {
    id: 8,
    nombre: "Gaseosa",
    precio: 5000,
    descripcion: "Bebida fría",
    imagen: "🥤"
  },

  {
    id: 9,
    nombre: "Postre de Chocolate",
    precio: 8000,
    descripcion: "Postre casero",
    imagen: "🍰"
  },

  {
    id: 10,
    nombre: "Café Colombiano",
    precio: 7000,
    descripcion: "Café tradicional colombiano",
    imagen: "☕"
  }

];



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