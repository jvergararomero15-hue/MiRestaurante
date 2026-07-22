import api from './api';

const AdminService = {
    async dashboard() {
        return (await api.get('/admin/dashboard')).data;
    },
    async ventas(fecha) {
        const params = fecha ? `?fecha=${fecha}` : '';
        return (await api.get(`/admin/ventas${params}`)).data;
    },
    async listarReservas() {
        return (await api.get('/reservas')).data;
    },
    async listarClientes() {
        return (await api.get('/clientes')).data;
    },
    async listarMesas() {
        return (await api.get('/mesas')).data;
    },
    async listarPlatos() {
        return (await api.get('/platos')).data;
    },
    async eliminarReserva(id) {
        await api.delete(`/reservas/${id}`);
    },
    async eliminarCliente(id) {
        await api.delete(`/clientes/${id}`);
    },
    async eliminarMesa(id) {
        await api.delete(`/mesas/${id}`);
    },
    async actualizarMesa(id, data) {
        return (await api.put(`/mesas/${id}`, data)).data;
    }
};

export default AdminService;