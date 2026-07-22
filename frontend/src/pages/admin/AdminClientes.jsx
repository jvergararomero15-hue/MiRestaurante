import { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';

function AdminClientes() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const data = await AdminService.listarClientes();
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        } finally {
            setCargando(false);
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar este cliente?')) return;
        try {
            await AdminService.eliminarCliente(id);
            setClientes(clientes.filter(c => c.idCliente !== id));
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    if (cargando) return <h2>Cargando clientes...</h2>;

    return (
        <div className="admin-page">
            <h1>Gestión de Clientes</h1>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((c) => (
                        <tr key={c.idCliente}>
                            <td>{c.idCliente}</td>
                            <td>{c.nombre}</td>
                            <td>{c.apellido}</td>
                            <td>{c.cedula || '-'}</td>
                            <td>{c.telefono || '-'}</td>
                            <td>{c.correo || '-'}</td>
                            <td>
                                <span className={`badge badge-${c.estado?.toLowerCase()}`}>
                                    {c.estado || 'Activo'}
                                </span>
                            </td>
                            <td>
                                <button className="btn-eliminar-sm" onClick={() => eliminar(c.idCliente)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {clientes.length === 0 && (
                <p className="sin-datos">No hay clientes registrados.</p>
            )}
        </div>
    );
}

export default AdminClientes;