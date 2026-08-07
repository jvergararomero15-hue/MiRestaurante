import api from './api';

const CLAVE_CONSUMOS = "MESAS_CONSUMOS";

const MesaService = {

    async obtenerMesas() {
        const response = await api.get('/mesas');
        const mesasDB = response.data;
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};

        return mesasDB.map(mesa => ({
            id: mesa.idMesa,
            numero: mesa.numero,
            capacidad: mesa.capacidad,
            estado: mesa.estado,
            reservadoPor: mesa.reservadoPor || null,
            consumos: consumos[mesa.idMesa] || [],
            total: (consumos[mesa.idMesa] || []).reduce(
                (t, p) => t + (p.precio * p.cantidad), 0
            )
        }));
    },

    async obtenerMesa(id) {
        const response = await api.get(`/mesas/${id}`);
        const mesa = response.data;
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};

        return {
            id: mesa.idMesa,
            numero: mesa.numero,
            capacidad: mesa.capacidad,
            estado: mesa.estado,
            reservadoPor: mesa.reservadoPor || null,
            consumos: consumos[mesa.idMesa] || [],
            total: (consumos[mesa.idMesa] || []).reduce(
                (t, p) => t + (p.precio * p.cantidad), 0
            )
        };
    },

    async crearMesa(numero, capacidad) {
        const response = await api.post('/mesas', {
            numero: numero,
            capacidad: capacidad || 4,
            estado: "Libre"
        });
        return response.data;
    },

    async actualizarEstado(id, estado) {
        const response = await api.put(`/mesas/${id}`, {
            idMesa: id,
            estado: estado
        });
        return response.data;
    },

    async eliminarMesa(id) {
        await api.delete(`/mesas/${id}`);
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};
        delete consumos[id];
        localStorage.setItem(CLAVE_CONSUMOS, JSON.stringify(consumos));
    },

    _guardarConsumos(mesaId, nuevosConsumos) {
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};
        consumos[mesaId] = nuevosConsumos;
        localStorage.setItem(CLAVE_CONSUMOS, JSON.stringify(consumos));
    },

    async agregarProducto(idMesa, producto) {
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};
        const lista = consumos[idMesa] || [];

        const existente = lista.find(p => p.nombre === producto.nombre);
        if (existente) {
            existente.cantidad++;
        } else {
            lista.push({ ...producto, cantidad: 1 });
        }

        this._guardarConsumos(idMesa, lista);

        const res = await api.get(`/mesas/${idMesa}`);
        if (res.data.estado === "Libre") {
            await api.put(`/mesas/${idMesa}`, {
                idMesa: Number(idMesa),
                estado: "Ocupada"
            });
        }
    },

    async eliminarProducto(idMesa, indexProducto) {
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};
        const lista = consumos[idMesa] || [];

        if (lista[indexProducto].cantidad > 1) {
            lista[indexProducto].cantidad--;
        } else {
            lista.splice(indexProducto, 1);
        }

        this._guardarConsumos(idMesa, lista);
    },

    async reservarMesa(idMesa, nombreCliente) {
        await api.put(`/mesas/${idMesa}`, {
            idMesa: Number(idMesa),
            estado: "Reservada",
            reservadoPor: nombreCliente || null
        });

        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};
        consumos[idMesa] = [];
        localStorage.setItem(CLAVE_CONSUMOS, JSON.stringify(consumos));
    },

    async cobrarMesa(idMesa) {
        const consumos = JSON.parse(localStorage.getItem(CLAVE_CONSUMOS)) || {};
        const lista = consumos[idMesa] || [];
        const total = lista.reduce((t, p) => t + (p.precio * p.cantidad), 0);

        if (total > 0) {
            const hoy = new Date().toISOString().split('T')[0];
            await api.post('/pedidos', {
                fecha: hoy,
                total: total,
                estado: "Cobrado",
                mesaId: Number(idMesa)
            });
        }

        await api.put(`/mesas/${idMesa}`, {
            idMesa: Number(idMesa),
            estado: "Libre",
            reservadoPor: null
        });

        consumos[idMesa] = [];
        localStorage.setItem(CLAVE_CONSUMOS, JSON.stringify(consumos));
    },

    async iniciarServicio(idMesa) {
        await api.put(`/mesas/${idMesa}`, {
            idMesa: Number(idMesa),
            estado: "Ocupada"
        });
    }
};

export default MesaService;
