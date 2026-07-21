class Mesa {

    constructor(id) {

        this.id = id;
        this.estado = "Libre";
        this.consumos = [];
        this.total = 0;
        this.cliente = "";
        this.reservada = false;

    }

}

export default Mesa;