import { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';

function AdminDashboard() {
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const result = await AdminService.dashboard();
            setData(result);
        } catch (error) {
            console.error('Error al cargar dashboard:', error);
        } finally {
            setCargando(false);
        }
    };

    if (cargando) return <h2>Cargando dashboard...</h2>;
    if (!data) return <h2>Error al cargar datos</h2>;

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>

            <div className="dashboard-grid">
                <div className="dashboard-card card-libres">
                    <span className="dashboard-icon">🟢</span>
                    <h3>{data.mesasLibres}</h3>
                    <p>Mesas Libres</p>
                </div>

                <div className="dashboard-card card-ocupadas">
                    <span className="dashboard-icon">🔴</span>
                    <h3>{data.mesasOcupadas}</h3>
                    <p>Mesas Ocupadas</p>
                </div>

                <div className="dashboard-card card-reservadas">
                    <span className="dashboard-icon">🟡</span>
                    <h3>{data.mesasReservadas}</h3>
                    <p>Mesas Reservadas</p>
                </div>

                <div className="dashboard-card card-total">
                    <span className="dashboard-icon">🪑</span>
                    <h3>{data.totalMesas}</h3>
                    <p>Total Mesas</p>
                </div>

                <div className="dashboard-card card-reservas">
                    <span className="dashboard-icon">📅</span>
                    <h3>{data.reservasTotal}</h3>
                    <p>Reservas Totales</p>
                    <small>Hoy: {data.reservasHoy}</small>
                </div>

                <div className="dashboard-card card-pedidos">
                    <span className="dashboard-icon">📋</span>
                    <h3>{data.pedidosTotal}</h3>
                    <p>Pedidos Totales</p>
                    <small>Hoy: {data.pedidosHoy}</small>
                </div>

                <div className="dashboard-card card-ventas">
                    <span className="dashboard-icon">💰</span>
                    <h3>${(data.ventasTotal || 0).toLocaleString()}</h3>
                    <p>Ventas Totales</p>
                    <small>Hoy: ${(data.ventasHoy || 0).toLocaleString()}</small>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
