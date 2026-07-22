import { useState, useEffect } from "react";
import MenuService from "../services/MenuService";

function AdministrarMenu() {

    const [platos, setPlatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [formulario, setFormulario] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        categoria: "",
        disponible: "Si"
    });
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        cargarPlatos();
    }, []);

    const cargarPlatos = async () => {
        try {
            const data = await MenuService.obtenerPlatos();
            setPlatos(data);
        } catch (error) {
            console.error("Error al cargar platos:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const plato = {
                ...formulario,
                precio: parseFloat(formulario.precio)
            };

            if (editando) {
                await MenuService.actualizarPlato(editando, plato);
                setEditando(null);
            } else {
                await MenuService.crearPlato(plato);
            }

            setFormulario({
                nombre: "",
                descripcion: "",
                precio: "",
                imagen: "",
                categoria: "",
                disponible: "Si"
            });

            cargarPlatos();
        } catch (error) {
            console.error("Error al guardar plato:", error);
            alert("Error al guardar el plato");
        }
    };

    const handleEditar = (plato) => {
        setFormulario({
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: plato.precio,
            imagen: plato.imagen || "",
            categoria: plato.categoria || "",
            disponible: plato.disponible || "Si"
        });
        setEditando(plato.idPlato);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este plato?")) return;
        try {
            await MenuService.eliminarPlato(id);
            cargarPlatos();
        } catch (error) {
            console.error("Error al eliminar plato:", error);
        }
    };

    const handleCancelar = () => {
        setEditando(null);
        setFormulario({
            nombre: "",
            descripcion: "",
            precio: "",
            imagen: "",
            categoria: "",
            disponible: "Si"
        });
    };

    if (cargando) {
        return <h2 style={{ color: "white", textAlign: "center" }}>Cargando platos...</h2>;
    }

    return (
        <div className="menu">
            <h2>🛠️ Administrar Menú</h2>

            <div className="clientes-grid" style={{ marginTop: "2rem" }}>

                <div className="clientes-form">
                    <h3>{editando ? "✏️ Editar Plato" : "➕ Agregar Plato"}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del plato"
                            value={formulario.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            value={formulario.descripcion}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            value={formulario.precio}
                            onChange={handleChange}
                            required
                            step="0.01"
                        />
                        <input
                            type="text"
                            name="imagen"
                            placeholder="URL de imagen o emoji"
                            value={formulario.imagen}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="categoria"
                            placeholder="Categoría (ej: Entradas, Fuertes, Postres)"
                            value={formulario.categoria}
                            onChange={handleChange}
                        />
                        <select
                            name="disponible"
                            value={formulario.disponible}
                            onChange={handleChange}
                        >
                            <option value="Si">Disponible</option>
                            <option value="No">No disponible</option>
                        </select>

                        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                            <button type="submit">
                                {editando ? "Actualizar" : "Agregar"}
                            </button>
                            {editando && (
                                <button
                                    type="button"
                                    onClick={handleCancelar}
                                    style={{ background: "#666" }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="clientes-lista">
                    <h3>Lista de Platos ({platos.length})</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoría</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {platos.map((plato) => (
                                <tr key={plato.idPlato}>
                                    <td>{plato.nombre}</td>
                                    <td>${plato.precio}</td>
                                    <td>{plato.categoria || "-"}</td>
                                    <td>{plato.disponible === "Si" ? "✅" : "❌"}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEditar(plato)}
                                            style={{
                                                background: "#f3b33d",
                                                color: "#1e1915",
                                                border: "none",
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                marginRight: "5px"
                                            }}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(plato.idPlato)}
                                            style={{
                                                background: "#e73c3c",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default AdministrarMenu;
