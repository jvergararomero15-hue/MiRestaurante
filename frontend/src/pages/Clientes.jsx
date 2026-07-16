import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clientesIniciales = [
  { id: 1, nombre: 'Ana García', email: 'ana@example.com', telefono: '555-1234' },
  { id: 2, nombre: 'Luis Pérez', email: 'luis@example.com', telefono: '555-5678' },
];

function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState(clientesIniciales);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', email: '', telefono: '' });

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const agregarCliente = (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre || !nuevoCliente.email) {
      alert('Nombre y email son obligatorios');
      return;
    }
    const nuevo = { id: Date.now(), ...nuevoCliente };
    setClientes([...clientes, nuevo]);
    setNuevoCliente({ nombre: '', email: '', telefono: '' });
    alert('✅ Cliente registrado exitosamente');
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="clientes">
      <h2>Gestión de Clientes</h2>
      <div className="clientes-grid">
        <div className="clientes-lista">
          <h3>Lista de Clientes</h3>
          <table>
            <thead>
              <tr><th>Nombre</th><th>Email</th><th>Teléfono</th></tr>
            </thead>
            <tbody>
              {clientes.map(cli => (
                <tr key={cli.id}>
                  <td>{cli.nombre}</td>
                  <td>{cli.email}</td>
                  <td>{cli.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="clientes-form">
          <h3>Agregar Cliente</h3>
          <form onSubmit={agregarCliente}>
            <input type="text" name="nombre" placeholder="Nombre" value={nuevoCliente.nombre} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={nuevoCliente.email} onChange={handleChange} required />
            <input type="tel" name="telefono" placeholder="Teléfono" value={nuevoCliente.telefono} onChange={handleChange} />
            <button type="submit">Registrar Cliente</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Clientes;