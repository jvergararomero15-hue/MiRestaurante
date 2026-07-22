import api from './api';

const ReservaService = {

    async listar() {
        const response = await api.get('/reservas');
        return response.data;
    },

    async crear(reserva) {
        const response = await api.post('/reservas', {
            fecha: reserva.fecha,
            hora: reserva.hora,
            cantidadPersonas: Number(reserva.personas),
            estado: "Activa",
            mesaId: reserva.mesaId || null,
            clienteId: reserva.clienteId || null
        });
        return response.data;
    },

    async eliminar(id) {
        await api.delete(`/reservas/${id}`);
    }
};

export default ReservaService;
