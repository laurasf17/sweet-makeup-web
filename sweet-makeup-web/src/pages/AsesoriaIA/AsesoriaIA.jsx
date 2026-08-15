import { useState } from 'react'

// ─────────────────────────────────────────────
// PÁGINA DE ASESORÍA IA
// Ejemplo de estructura: un botón que simula
// "analizar" una foto y muestra una recomendación.
// Cuando conectes la IA real, reemplaza la función
// analizar() por la llamada a tu API/modelo.
// ─────────────────────────────────────────────

function AsesoriaIA() {
  const [resultado, setResultado] = useState(null)

  const analizar = () => {
    setResultado(
      'Según tu tono de piel, te recomendamos tonos cálidos: durazno y coral.'
    )
  }

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
      <h1 style={{ fontSize: '45px' }}>
        🤖 Asesoría IA
      </h1>

      <p style={{ fontSize: '20px', maxWidth: '600px', margin: '20px auto' }}>
        Recibe recomendaciones de maquillaje personalizadas
        según tus características.
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
        <p>Sube o toma una foto para comenzar tu análisis.</p>

        <button
          style={{
            marginTop: '20px',
            padding: '12px 25px',
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#e83e9f',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={analizar}
        >
          ✨ Analizar
        </button>

        {resultado && (
          <p style={{ marginTop: '20px', color: '#f7b3d9' }}>
            {resultado}
          </p>
        )}
      </div>
    </div>
  )
}

export default AsesoriaIA
