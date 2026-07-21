import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Clientes from './pages/Clientes';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Reservas from './pages/Reservas';
import Carrito from './pages/Carrito';
import Mesas from './pages/Mesas';
import MesaDetalle from './pages/MesaDetalle';
import AdministrarMenu from "./pages/AdministrarMenu";

function App() {
  return (
    <div className="app">

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
          <Route path="/administrar-menu" element={<AdministrarMenu />} />

          {/* Página individual de cada mesa */}
          <Route path="/mesa/:id" element={<MesaDetalle />} />
        </Routes>
      </main>

      <Footer />

      <a
        href="https://wa.me/573001234567?text=Hola%20quiero%20hacer%20una%20reserva"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬
      </a>

    </div>
  );
}

export default App;