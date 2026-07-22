import { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';

function AdminReservas() {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtroFecha, setFiltroFecha] = useState('');

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const data = await AdminService.listarReservas();
            setReservas(data);
        } catch (error) {
            console.error('Error al cargar reservas:', error);
        } finally {
            setCargando(false);
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar esta reserva?')) return;
        try {
            await AdminService.eliminarReserva(id);
            setReservas(reservas.filter(r => r.idReserva !== id));
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    const filtradas = filtroFecha
        ? reservas.filter(r => r.fecha === filtroFecha)
        : reservas;

    if (cargando) return <h2>Cargando reservas...</h2>;

    return (
        <div className="admin-page">
            <h1>Historial de Reservas</h1>

            <div className="admin-filtros">
                <label>Filtrar por fecha:</label>
                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                />
                {filtroFecha && (
                    <button className="btn-limpiar" onClick={() => setFiltroFecha('')}>
                        Limpiar filtro
                    </button>
                )}
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Personas</th>
                        <th>Estado</th>
                        <th>Cliente</th>
                        <th>Mesa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtradas.map((r) => (
                        <tr key={r.idReserva}>
                            <td>{r.idReserva}</td>
                            <td>{r.fecha}</td>
                            <td>{r.hora}</td>
                            <td>{r.cantidadPersonas}</td>
                            <td>
                                <span className={`badge badge-${r.estado?.toLowerCase()}`}>
                                    {r.estado}
                                </span>
                            </td>
                            <td>{r.cliente ? `${r.cliente.nombre} ${r.cliente.apellido}` : '-'}</td>
                            <td>{r.mesa ? `Mesa ${r.mesa.numero}` : '-'}</td>
                            <td>
                                <button
                                    className="btn-eliminar-sm"
                                    onClick={() => eliminar(r.idReserva)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filtradas.length === 0 && (
                <p className="sin-datos">No hay reservas para mostrar.</p>
            )}
        </div>
    );
}

export default AdminReservas;