import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MesaService from "../services/MesaService";


function MesaDetalle() {


  const { id } = useParams();
  const navigate = useNavigate();


  const [mesa, setMesa] = useState(
    () => MesaService.obtenerMesa(id)
  );



  if (!mesa) {

    return <h2>Cargando...</h2>;

  }



  const iniciarServicio = () => {

    MesaService.iniciarServicio(id);

    setMesa(
      MesaService.obtenerMesa(id)
    );

  };



  // ➕ AUMENTAR PRODUCTO
  const agregarConsumo = (producto) => {


    MesaService.agregarProducto(
      id,
      producto
    );


    setMesa(
      MesaService.obtenerMesa(id)
    );


  };





  // ➖ RESTAR PRODUCTO
  const eliminarProducto = (index) => {


    MesaService.eliminarProducto(
      id,
      index
    );


    setMesa(
      MesaService.obtenerMesa(id)
    );


  };





  const cobrar = () => {


    alert(
      `Mesa ${id} cobrada por $${(mesa.total || 0).toLocaleString()}`
    );


    MesaService.cobrarMesa(id);


    navigate("/mesas");


  };





  return (


    <div className="mesa-detalle">



      <button
        className="btn-volver"
        onClick={() => navigate("/mesas")}
      >

        ⬅ Volver a Mesas

      </button>





      <h1>
        🍽️ Mesa {id}
      </h1>






      {mesa.cliente && (


        <div className="cliente-info">


          <h3>
            👤 Cliente
          </h3>


          <p>
            {mesa.cliente}
          </p>


        </div>


      )}






      {mesa.reservada && (


        <button
          className="btn-iniciar"
          onClick={iniciarServicio}
        >

          🟢 Iniciar Servicio

        </button>


      )}







      <button

        className="btn-order"

        onClick={() => navigate(`/menu?mesa=${id}`)}

      >

        🍽️ Ver menú completo

      </button>









      <h2 style={{marginTop:"40px"}}>

        🧾 Consumo de la Mesa

      </h2>







      {!mesa.consumos || mesa.consumos.length === 0 ? (



        <p className="sin-consumos">

          No hay productos agregados.

        </p>



      ) : (




        <div className="lista-consumos">





          {mesa.consumos.map((item,index)=>(




            <div

              className="consumo-card"

              key={index}

            >





              <div className="consumo-info">





                <h3>

                  {item.nombre}

                </h3>






                <p>

                  Precio:

                  <strong>

                    {" "}
                    ${item.precio.toLocaleString()}

                  </strong>


                </p>







                <p>

                  Subtotal:

                  <strong>

                    {" "}
                    ${(item.precio * item.cantidad).toLocaleString()}

                  </strong>


                </p>





              </div>









              <div className="cantidad-box">





                <button

                  className="btn-cantidad"

                  onClick={() => eliminarProducto(index)}

                >

                  ➖

                </button>







                <span>

                  {item.cantidad}

                </span>








                <button

                  className="btn-cantidad"

                  onClick={() => agregarConsumo({

                    nombre:item.nombre,

                    precio:item.precio

                  })}

                >

                  ➕

                </button>






              </div>






            </div>





          ))}






        </div>




      )}







      <h2 className="total-mesa">


        Total: ${(mesa.total || 0).toLocaleString()}


      </h2>






      <button

        className="btn-cobrar"

        onClick={cobrar}

      >

        💰 Cobrar Mesa

      </button>







    </div>



  );

}


export default MesaDetalle;