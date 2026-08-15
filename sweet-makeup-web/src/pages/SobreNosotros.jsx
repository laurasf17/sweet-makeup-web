function SobreNosotros() {
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
        💕 Sobre Nosotros
      </h1>

      <p
        style={{
          fontSize: '20px',
          maxWidth: '600px',
          margin: '20px auto'
        }}
      >
        Bienvenidos a Sweet Makeup, un espacio creado
        para ayudarte a descubrir tu estilo y disfrutar
        del mundo del maquillaje.
      </p>

      <div
        style={{
          margin: '40px auto',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '20px',
          maxWidth: '500px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
        }}
      >
        <h2>✨ Sweet Makeup</h2>

        <p>
          Nuestra página ofrece productos, recomendaciones
          y diferentes looks para que encuentres el estilo
          que más te guste.
        </p>

        <button
          style={{
            padding: '12px 25px',
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#d63384',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() =>
            alert('¡La ruta Sobre Nosotros funciona correctamente!')
          }
        >
          Probar botón
        </button>
      </div>
    </div>
  )
}

export default SobreNosotros