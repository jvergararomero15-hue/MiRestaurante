const CLAVE = "MESAS_RESTAURANTE";

class MesaService {

    obtenerMesas() {

        let mesas = JSON.parse(localStorage.getItem(CLAVE));

        if (!mesas) {

            mesas = [];

            for (let i = 1; i <= 8; i++) {

                mesas.push({
                    id: i,
                    estado: "Libre",
                    reservada: false,
                    cliente: "",
                    consumos: [],
                    total: 0
                });

            }

            localStorage.setItem(CLAVE, JSON.stringify(mesas));

        }

        return mesas;

    }

    guardarMesas(mesas) {

        localStorage.setItem(CLAVE, JSON.stringify(mesas));

    }

    obtenerMesa(id) {

        return this.obtenerMesas().find(
            mesa => mesa.id === Number(id)
        );

    }

   agregarProducto(idMesa, producto) {

    const mesas = this.obtenerMesas();

    const nuevas = mesas.map(mesa => {

        if (mesa.id === Number(idMesa)) {

            mesa.estado = "Ocupada";

            const existente = mesa.consumos.find(
                p => p.nombre === producto.nombre
            );

            if (existente) {

                existente.cantidad++;

            } else {

                mesa.consumos.push({
                    ...producto,
                    cantidad: 1
                });

            }

            mesa.total = mesa.consumos.reduce(
                (total, p) => total + (p.precio * p.cantidad),
                0
            );

        }

        return mesa;

    });

    this.guardarMesas(nuevas);

}

   eliminarProducto(idMesa, indexProducto) {

    const mesas = this.obtenerMesas();

    const nuevas = mesas.map(mesa => {

        if (mesa.id === Number(idMesa)) {

            const producto = mesa.consumos[indexProducto];

            if (producto.cantidad > 1) {

                producto.cantidad--;

            } else {

                mesa.consumos.splice(indexProducto, 1);

            }

            mesa.total = mesa.consumos.reduce(
                (total, p) => total + (p.precio * p.cantidad),
                0
            );

            if (mesa.total === 0) {

                mesa.estado = "Libre";

            }

        }

        return mesa;

    });

    this.guardarMesas(nuevas);

}

    reservarMesa(idMesa,nombre){

        const mesas=this.obtenerMesas();

        const nuevas=mesas.map(mesa=>{

            if(mesa.id===Number(idMesa)){

                mesa.reservada=true;

                mesa.cliente=nombre;

            }

            return mesa;

        });

        this.guardarMesas(nuevas);

    }

    cobrarMesa(idMesa){

        const mesas=this.obtenerMesas();

        const nuevas=mesas.map(mesa=>{

            if(mesa.id===Number(idMesa)){

                mesa.estado="Libre";

                mesa.reservada=false;

                mesa.cliente="";

                mesa.consumos=[];

                mesa.total=0;

            }

            return mesa;

        });

        this.guardarMesas(nuevas);

    }

    iniciarServicio(idMesa){

    const mesas = this.obtenerMesas();

    const nuevas = mesas.map(mesa=>{

        if(mesa.id===Number(idMesa)){

            mesa.estado="Ocupada";

            mesa.reservada=false;

        }

        return mesa;

    });

    this.guardarMesas(nuevas);

}

agregarMesa(){

    const mesas = this.obtenerMesas();


    const nuevoNumero = mesas.length + 1;


    const nuevaMesa = {

        id: nuevoNumero,
        estado:"Libre",
        reservada:false,
        cliente:"",
        consumos:[],
        total:0

    };


    mesas.push(nuevaMesa);


    this.guardarMesas(mesas);


}
eliminarMesa(idMesa){


    const mesas = this.obtenerMesas();


    const nuevasMesas = mesas.filter(

        mesa => mesa.id !== Number(idMesa)

    );


    this.guardarMesas(nuevasMesas);


}

}

export default new MesaService();