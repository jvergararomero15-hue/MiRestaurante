import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function RutaAdmin({ children }) {
    const usuario = AuthService.obtenerUsuario();

    if (!usuario || usuario.rol !== 'ADMIN') {
        return <Navigate to="/login" />;
    }

    return children;
}

export default RutaAdmin;