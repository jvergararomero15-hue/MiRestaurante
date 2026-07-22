import { useState, useEffect } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const agregarCliente = async (e) => {
    e.preventDefault();

    if (!nuevoCliente.nombre || !nuevoCliente.correo) {
      alert('Nombre y correo son obligatorios');
      return;
    }

    try {
      await api.post('/clientes', nuevoCliente);
      setNuevoCliente({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: ''
      });
      cargarClientes();
      alert('Cliente registrado exitosamente');
    } catch (error) {
      console.error('Error al agregar cliente:', error);
      alert('Error al registrar cliente');
    }
  };

  return (
    <div className="clientes">
      <h2>Gestión de Clientes</h2>

      {cargando ? (
        <p style={{ color: '#ccc', textAlign: 'center' }}>Cargando clientes...</p>
      ) : (
        <div className="clientes-grid">
          <div className="clientes-lista">
            <h3>Lista de Clientes ({clientes.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cédula</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cli) => (
                  <tr key={cli.idCliente}>
                    <td>{cli.nombre}</td>
                    <td>{cli.apellido || '-'}</td>
                    <td>{cli.cedula || '-'}</td>
                    <td>{cli.correo}</td>
                    <td>{cli.telefono || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="clientes-form">
            <h3>Agregar Cliente</h3>
            <form onSubmit={agregarCliente}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={nuevoCliente.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={nuevoCliente.apellido}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cedula"
                placeholder="Cédula"
                value={nuevoCliente.cedula}
                onChange={handleChange}
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={nuevoCliente.correo}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={nuevoCliente.telefono}
                onChange={handleChange}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={nuevoCliente.direccion}
                onChange={handleChange}
              />
              <button type="submit">Registrar Cliente</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;
