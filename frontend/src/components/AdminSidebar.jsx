import { NavLink, Link } from 'react-router-dom';

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h2>⚙ Panel Admin</h2>
            </div>
            <nav className="admin-sidebar-nav">
                <NavLink to="/admin" end className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                    📊 Dashboard
                </NavLink>
                <NavLink to="/admin/reservas" className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                    📅 Reservas
                </NavLink>
                <NavLink to="/admin/ventas" className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                    💰 Ventas
                </NavLink>
                <NavLink to="/admin/menu" className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                    🍽️ Menú
                </NavLink>
                <NavLink to="/admin/clientes" className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                    👥 Clientes
                </NavLink>
                <NavLink to="/admin/mesas" className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                    🪑 Mesas
                </NavLink>
            </nav>
            <div className="admin-sidebar-footer">
                <Link to="/" className="admin-nav-link btn-volver">
                    ← Volver al Sitio
                </Link>
            </div>
        </aside>
    );
}

export default AdminSidebar;