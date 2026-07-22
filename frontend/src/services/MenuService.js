import api from './api';

const MenuService = {

    async obtenerPlatos() {
        const response = await api.get('/platos');
        return response.data;
    },

    async obtenerPlato(id) {
        const response = await api.get(`/platos/${id}`);
        return response.data;
    },

    async crearPlato(plato) {
        const response = await api.post('/platos', plato);
        return response.data;
    },

    async actualizarPlato(id, plato) {
        const response = await api.put(`/platos/${id}`, plato);
        return response.data;
    },

    async eliminarPlato(id) {
        await api.delete(`/platos/${id}`);
    }
};

export default MenuService;
