// ─────────────────────────────────────────────
// PÁGINA DE TIENDA
// Ejemplo de estructura con una grilla de productos.
// Reemplaza el arreglo "productos" por datos reales
// (o por lo que traigas de tu base de datos/Supabase).
// ─────────────────────────────────────────────

const productos = [
  { id: 1, nombre: 'Labial Mate', precio: '$25.000' },
  { id: 2, nombre: 'Base Líquida', precio: '$45.000' },
  { id: 3, nombre: 'Paleta de Sombras', precio: '$60.000' }
]

function Tienda() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8e8f4',
        color: '#4a1740',
        padding: '80px 20px',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '45px' }}>
        🛍️ Tienda Sweet Makeup
      </h1>

      <p
        style={{
          fontSize: '20px',
          maxWidth: '600px',
          margin: '20px auto'
        }}
      >
        Aquí estarán nuestros productos de maquillaje.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '800px',
          margin: '40px auto'
        }}
      >
        {productos.map(producto => (
          <div
            key={producto.id}
            style={{
              padding: '25px',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{producto.nombre}</h3>
            <p style={{ color: '#d63384', fontWeight: 'bold' }}>
              {producto.precio}
            </p>

            <button
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '25px',
                backgroundColor: '#d63384',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={() => alert(`Agregaste "${producto.nombre}" al carrito`)}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tienda
