import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────
// PÁGINA DE INICIO
// Esta es la página principal del sitio (ruta "/"
// y "/home"). El contenido de abajo es un ejemplo
// de estructura — reemplázalo por el diseño real
// cuando lo tengas.
// ─────────────────────────────────────────────

function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a0018',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '50px' }}>
        💄 Sweet Makeup
      </h1>

      <p style={{ fontSize: '22px', maxWidth: '500px', margin: '20px auto' }}>
        Tu belleza, tu estilo, tu esencia.
      </p>

      <div
        style={{
          marginTop: '40px',
          padding: '30px',
          backgroundColor: '#3a1235',
          borderRadius: '20px',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <h2>✨ Descubre tu estilo</h2>

        <p>
          Explora looks, recibe asesoría con IA y encuentra
          los productos perfectos para ti.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/looks"
            style={{
              padding: '12px 25px',
              borderRadius: '25px',
              backgroundColor: '#e83e9f',
              color: 'white',
              fontSize: '16px',
              textDecoration: 'none'
            }}
          >
            Ver Looks
          </Link>

          <Link
            to="/"
            style={{
              padding: '12px 25px',
              borderRadius: '25px',
              border: '1px solid #e83e9f',
              color: 'white',
              fontSize: '16px',
              textDecoration: 'none'
            }}
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
