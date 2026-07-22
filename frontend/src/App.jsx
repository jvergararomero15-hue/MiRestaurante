import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RutaAdmin from './components/RutaAdmin';
import AdminLayout from './components/AdminLayout';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Clientes from './pages/Clientes';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Reservas from './pages/Reservas';
import Carrito from './pages/Carrito';
import Mesas from './pages/Mesas';
import MesaDetalle from './pages/MesaDetalle';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReservas from './pages/admin/AdminReservas';
import AdminVentas from './pages/admin/AdminVentas';
import AdminMenu from './pages/admin/AdminMenu';
import AdminClientes from './pages/admin/AdminClientes';
import AdminMesas from './pages/admin/AdminMesas';

function App() {
  return (
    <div className="app">

      <Routes>
        {/* Rutas admin - sin Navbar/Footer del cliente */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <AdminLayout />
            </RutaAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="reservas" element={<AdminReservas />} />
          <Route path="ventas" element={<AdminVentas />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="clientes" element={<AdminClientes />} />
          <Route path="mesas" element={<AdminMesas />} />
        </Route>

        {/* Rutas del cliente */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route path="/reservas" element={<Reservas />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/mesas" element={<Mesas />} />
                  <Route path="/mesa/:id" element={<MesaDetalle />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
