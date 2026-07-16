function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <h1>🍽️ Restaurante Delicias</h1>
          <p>
            Experiencias gastronómicas inolvidables, preparadas por los mejores chefs.
          </p>

          <button className="btn-primary">
            Ver Menú
          </button>
        </div>
      </section>

      <section className="info-cards">
        <div className="card">
          <h3>🌟 Ingredientes Frescos</h3>
          <p>Productos seleccionados diariamente.</p>
        </div>

        <div className="card">
          <h3>👨‍🍳 Chef Experto</h3>
          <p>Más de 20 años creando experiencias culinarias.</p>
        </div>

        <div className="card">
          <h3>🏆 Premio 2024</h3>
          <p>Reconocidos como uno de los mejores restaurantes.</p>
        </div>
      </section>
      <section className="destacados">

  <h2>Nuestros Platos Destacados</h2>

  <div className="destacados-grid">

    <div className="destacado-card">
      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
        alt="Hamburguesa"
      />
      <h3>Hamburguesa Gourmet</h3>
      <p>Carne premium, queso cheddar y salsa especial.</p>
      <button>Ordenar Ahora</button>
    </div>

    <div className="destacado-card">
      <img
        src="https://images.unsplash.com/photo-1544025162-d76694265947"
        alt="Entrecot"
      />
      <h3>Entrecot Premium</h3>
      <p>Corte seleccionado acompañado de vegetales.</p>
      <button>Ordenar Ahora</button>
    </div>

    <div className="destacado-card">
      <img
        src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad"
        alt="Postre"
      />
      <h3>Cheesecake Especial</h3>
      <p>Preparado artesanalmente todos los días.</p>
      <button>Ordenar Ahora</button>
    </div>

  </div>

</section>
    </div>
  );
}

export default Home;