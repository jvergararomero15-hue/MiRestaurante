import { useState, useEffect } from 'react';
import MenuService from '../../services/MenuService';

function AdminMenu() {
    const [platos, setPlatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', imagen: '', categoria: '', modelo3d: '' });
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const data = await MenuService.obtenerPlatos();
            setPlatos(data);
        } catch (error) {
            console.error('Error al cargar platos:', error);
        } finally {
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const precioNumerico = (texto) => {
        if (!texto) return 0;
        const limpio = String(texto).replace(/\./g, '').replace(/,/g, '');
        return Number(limpio);
    };

    const guardar = async (e) => {
        e.preventDefault();
        try {
            const plato = {
                ...form,
                precio: precioNumerico(form.precio)
            };

            if (editando) {
                await MenuService.actualizarPlato(editando, plato);
                setEditando(null);
            } else {
                await MenuService.crearPlato(plato);
            }

            setForm({ nombre: '', descripcion: '', precio: '', imagen: '', categoria: '', modelo3d: '' });
            cargar();
        } catch (error) {
            console.error('Error al guardar plato:', error);
        }
    };

    const editar = (plato) => {
        setForm({
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: plato.precio,
            imagen: plato.imagen || '',
            categoria: plato.categoria || '',
            modelo3d: plato.modelo3d || ''
        });
        setEditando(plato.idPlato);
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar este plato?')) return;
        try {
            await MenuService.eliminarPlato(id);
            cargar();
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    if (cargando) return <h2>Cargando menú...</h2>;

    return (
        <div className="admin-page">
            <h1>Gestión de Menú</h1>

            <form className="admin-form" onSubmit={guardar}>
                <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
                <input name="precio" type="text" placeholder="Precio (ej: 50000)" value={form.precio} onChange={handleChange} required />
                <input name="imagen" placeholder="Emoji/Icono" value={form.imagen} onChange={handleChange} />
                <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
                <input name="modelo3d" placeholder="Modelo 3D (.glb ej: /models/pollo.glb)" value={form.modelo3d} onChange={handleChange} />
                <button type="submit" className="btn-order">
                    {editando ? 'Actualizar' : 'Agregar'}
                </button>
                {editando && (
                    <button type="button" className="btn-limpiar" onClick={() => { setEditando(null); setForm({ nombre: '', descripcion: '', precio: '', imagen: '', categoria: '' }); }}>
                        Cancelar
                    </button>
                )}
            </form>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {platos.map((p) => (
                        <tr key={p.idPlato}>
                            <td>{p.idPlato}</td>
                            <td>{p.imagen} {p.nombre}</td>
                            <td>{p.descripcion}</td>
                            <td>${(p.precio || 0).toLocaleString()}</td>
                            <td>{p.categoria || '-'}</td>
                            <td>
                                <button className="btn-editar-sm" onClick={() => editar(p)}>Editar</button>
                                <button className="btn-eliminar-sm" onClick={() => eliminar(p.idPlato)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminMenu;