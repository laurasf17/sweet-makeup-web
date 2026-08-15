function Looks() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a0018',
        color: 'white',
        padding: '80px',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '50px' }}>
        ✨ Looks de Maquillaje ✨
      </h1>

      <p style={{ fontSize: '22px' }}>
        Esta página de Looks está funcionando correctamente.
      </p>

      <div
        style={{
          marginTop: '40px',
          padding: '30px',
          backgroundColor: '#3a1235',
          borderRadius: '20px',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <h2>💄 Look Glam</h2>

        <p>
          Un look elegante y perfecto para una ocasión especial.
        </p>

        <button
          style={{
            padding: '12px 25px',
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#e83e9f',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => alert('¡El botón de Looks funciona!')}
        >
          Ver Look
        </button>
      </div>
    </div>
  )
}

export default Looks