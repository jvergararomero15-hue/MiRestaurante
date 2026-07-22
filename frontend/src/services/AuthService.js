import api from './api';

const AuthService = {

    async login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    async registro(datos) {
        const response = await api.post('/auth/registro', datos);
        return response.data;
    },

    guardarSesion(token, usuario) {
        localStorage.setItem('TOKEN', token);
        localStorage.setItem('USUARIO', JSON.stringify(usuario));
    },

    obtenerToken() {
        return localStorage.getItem('TOKEN');
    },

    obtenerUsuario() {
        const usuario = localStorage.getItem('USUARIO');
        return usuario ? JSON.parse(usuario) : null;
    },

    cerrarSesion() {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USUARIO');
    },

    estaAutenticado() {
        return !!localStorage.getItem('TOKEN');
    }
};

export default AuthService;
