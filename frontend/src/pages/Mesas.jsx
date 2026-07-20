import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MesaService from "../services/MesaService";


function Mesas() {


  const navigate = useNavigate();


  const [mesas, setMesas] = useState(
    MesaService.obtenerMesas()
  );





  const obtenerClase = (mesa) => {


    if (mesa.reservada)

      return "mesa-pendiente";



    if (mesa.estado === "Ocupada")

      return "mesa-ocupada";



    return "mesa-libre";


  };






  const agregarNuevaMesa = () => {


    MesaService.agregarMesa();


    setMesas(
      MesaService.obtenerMesas()
    );


  };







  const eliminarMesa = (id) => {


    const confirmar = window.confirm(

      `¿Seguro que quieres eliminar la Mesa ${id}?`

    );



    if(confirmar){


      MesaService.eliminarMesa(id);



      setMesas(

        MesaService.obtenerMesas()

      );


    }


  };







  return (


    <div className="mesas-container">





      <h2>
        🍽️ Gestión de Mesas
      </h2>





      <p className="mesas-subtitulo">

        Administra el estado de cada mesa del restaurante.

      </p>






      <button

        className="btn-order"

        onClick={agregarNuevaMesa}

      >

        ➕ Agregar Mesa

      </button>








      <div className="mesas-grid">





        {mesas.map((mesa)=>(






          <div


            key={mesa.id}


            className={`mesa-card ${obtenerClase(mesa)}`}



            onClick={() => navigate(`/mesa/${mesa.id}`)}


          >





            <div className="mesa-icon">

              🪑

            </div>







            <h3>

              Mesa {mesa.id}

            </h3>







            <p>


              {mesa.reservada

                ? "🟡 Reservada"

                : mesa.estado === "Ocupada"

                ? "🔴 Ocupada"

                : "🟢 Libre"

              }


            </p>







            <h4>

              💰 ${(mesa.total || 0).toLocaleString()}

            </h4>







            {mesa.cliente && (


              <small>

                👤 {mesa.cliente}

              </small>


            )}








            <button


              className="btn-eliminar"



              onClick={(e)=>{


                e.stopPropagation();


                eliminarMesa(mesa.id);


              }}


            >

              🗑️ Eliminar

            </button>







          </div>





        ))}






      </div>






    </div>


  );


}



export default Mesas;