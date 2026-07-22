import { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';

function AdminVentas() {
    const [ventas, setVentas] = useState([]);
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargar();
    }, [fecha]);

    const cargar = async () => {
        setCargando(true);
        try {
            const data = await AdminService.ventas(fecha);
            setVentas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al cargar ventas:', error);
            setVentas([]);
        } finally {
            setCargando(false);
        }
    };

    const totalDia = ventas.reduce((sum, v) => sum + (v.total || 0), 0);

    return (
        <div className="admin-page">
            <h1>Historial de Ventas</h1>

            <div className="admin-filtros">
                <label>Fecha:</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </div>

            <div className="ventas-resumen">
                <h3>Total del día: <strong>${totalDia.toLocaleString()}</strong></h3>
                <p>{ventas.length} pedido(s) cobrado(s)</p>
            </div>

            {cargando ? (
                <h2>Cargando ventas...</h2>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Fecha</th>
                            <th>Mesa</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((v) => (
                            <tr key={v.idPedido}>
                                <td>{v.idPedido}</td>
                                <td>{v.fecha}</td>
                                <td>{v.mesa ? `Mesa ${v.mesa.numero}` : '-'}</td>
                                <td>{v.cliente ? `${v.cliente.nombre} ${v.cliente.apellido}` : '-'}</td>
                                <td><strong>${(v.total || 0).toLocaleString()}</strong></td>
                                <td>
                                    <span className={`badge badge-${v.estado?.toLowerCase()}`}>
                                        {v.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {ventas.length === 0 && !cargando && (
                <p className="sin-datos">No hay ventas para esta fecha.</p>
            )}
        </div>
    );
}

export default AdminVentas;