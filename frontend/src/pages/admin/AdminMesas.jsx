import { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';

function AdminMesas() {
    const [mesas, setMesas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const data = await AdminService.listarMesas();
            setMesas(data);
        } catch (error) {
            console.error('Error al cargar mesas:', error);
        } finally {
            setCargando(false);
        }
    };

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            await AdminService.actualizarMesa(id, { idMesa: id, estado: nuevoEstado });
            cargar();
        } catch (error) {
            console.error('Error al cambiar estado:', error);
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar esta mesa?')) return;
        try {
            await AdminService.eliminarMesa(id);
            setMesas(mesas.filter(m => m.idMesa !== id));
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(error.response?.data?.error || 'No se pudo eliminar la mesa');
        }
    };

    if (cargando) return <h2>Cargando mesas...</h2>;

    return (
        <div className="admin-page">
            <h1>Gestión de Mesas</h1>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th>Reservado Por</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mesas.map((m) => (
                        <tr key={m.idMesa}>
                            <td>{m.idMesa}</td>
                            <td>Mesa {m.numero}</td>
                            <td>{m.capacidad} personas</td>
                            <td>
                                <span className={`badge badge-${m.estado?.toLowerCase()}`}>
                                    {m.estado}
                                </span>
                            </td>
                            <td>{m.reservadoPor || '-'}</td>
                            <td className="acciones-mesa">
                                {m.estado !== 'Libre' && (
                                    <button className="btn-editar-sm" onClick={() => cambiarEstado(m.idMesa, 'Libre')}>
                                        Liberar
                                    </button>
                                )}
                                <button className="btn-eliminar-sm" onClick={() => eliminar(m.idMesa)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminMesas;