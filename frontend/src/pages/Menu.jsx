import { useNavigate } from 'react-router-dom';

const platos = [
  { id: 1, nombre: 'Paella Valenciana', precio: 18.90, descripcion: 'Arroz, mariscos y pollo', imagen: '🍛' },
  { id: 2, nombre: 'Entrecot a la parrilla', precio: 24.50, descripcion: 'Carne de res con guarnición', imagen: '🥩' },
  { id: 3, nombre: 'Salmón al horno', precio: 19.90, descripcion: 'Salmón con verduras asadas', imagen: '🐟' },
  { id: 4, nombre: 'Pasta Carbonara', precio: 14.90, descripcion: 'Crema de huevo, queso y panceta', imagen: '🍝' },
  { id: 5, nombre: 'Ensalada César', precio: 12.50, descripcion: 'Pechuga, parmesano y aderezo', imagen: '🥗' },
  { id: 6, nombre: 'Tarta de queso', precio: 6.90, descripcion: 'Postre casero', imagen: '🍰' }
];

function Menu() {
  const navigate = useNavigate();

  const ordenar = (plato) => {
    alert(`🍽️ Agregaste ${plato.nombre} al carrito. Total: $${plato.precio}`);
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div className="menu">
      <h2>Nuestro Menú</h2>
      <div className="menu-grid">
        {platos.map(plato => (
          <div className="menu-card" key={plato.id}>
            <div className="menu-icon">{plato.imagen}</div>
            <h3>{plato.nombre}</h3>
            <p>{plato.descripcion}</p>
            <span className="precio">${plato.precio}</span>
            <button className="btn-order" onClick={() => ordenar(plato)}>Ordenar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;