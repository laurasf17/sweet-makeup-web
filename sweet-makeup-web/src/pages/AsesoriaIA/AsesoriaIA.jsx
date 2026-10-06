import { useRef, useState } from 'react'
import './AsesoriaIA.css'
import { createBeautyAiSessionId, requestBeautyAi } from '../../components/ai/beautyAiClient'
import models1 from '../../assets/models1.jpeg'
import models2 from '../../assets/models2.jpeg'
import models3 from '../../assets/models3.jpeg'
import models4 from '../../assets/models4.jpeg'
import models5 from '../../assets/models5.jpeg'

const quickPrompts = [
  { icon: '✦', query: 'Quiero un look para una fiesta', text: <>Quiero un look<br />para una fiesta</> },
  { icon: '◌', query: '¿Qué tonos me favorecen?', text: <>¿Qué tonos<br />me favorecen?</> },
  { icon: '♡', query: 'Quiero un maquillaje natural', text: <>Quiero un maquillaje<br />natural</> },
  { icon: '⌁', query: 'Recomiéndame productos', text: <>Recomiéndame<br />productos</> }
]

const services = [
  { image: models2, number: '01', title: 'ANALIZAR TU ESTILO', text: 'Descubre qué tipo de maquillaje encaja contigo.' },
  { image: models3, number: '02', title: 'CREAR UN LOOK', text: 'Dime la ocasión y crea una propuesta.' },
  { image: models4, number: '03', title: 'RECOMENDAR PRODUCTOS', text: 'Encuentra productos según tu estilo.' },
  { image: models5, number: '04', title: 'RESOLVER TUS DUDAS', text: 'Pregúntame cualquier cosa sobre maquillaje.' }
]

function AsesoriaIA() {
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'assistant', text: 'Hola, soy tu asesora de belleza. Cuéntame qué look quieres crear o qué producto estás buscando.' }])
  const [input, setInput] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const sessionId = useRef(createBeautyAiSessionId())
  const fileInputRef = useRef(null)
  const messageInputRef = useRef(null)

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Selecciona un archivo de imagen válido.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen debe pesar menos de 5 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setSelectedImage({ name: file.name, type: file.type, data: reader.result, file })
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => setSelectedImage(null)

  const sendMessage = async (event) => {
    event.preventDefault()
    const message = input.trim()
    if ((!message && !selectedImage) || isLoading) return
    setMessages((currentMessages) => [...currentMessages, { id: `${Date.now()}-user`, role: 'user', text: message || 'Quiero analizar esta imagen.', image: selectedImage?.data }])
    setInput('')
    const imageToSend = selectedImage
    setSelectedImage(null)
    setError('')
    setIsLoading(true)
    try {
      const responseText = await requestBeautyAi({ sessionId: sessionId.current, message, image: imageToSend })
      setMessages((currentMessages) => [...currentMessages, { id: `${Date.now()}-assistant`, role: 'assistant', text: responseText }])
    } catch {
      setError('No pudimos conectar con la asesora. Revisa tu conexión e inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const choosePrompt = (prompt) => {
    setInput(prompt)
    window.requestAnimationFrame(() => messageInputRef.current?.focus())
  }

  return (
    <main className="ai-page">
      <div className="ai-decor ai-spark-one" aria-hidden="true">✦</div>
      <div className="ai-decor ai-spark-two" aria-hidden="true">✦</div>
      <div className="ai-curve ai-curve-one" aria-hidden="true" />
      <div className="ai-curve ai-curve-two" aria-hidden="true" />

      <section className="ai-hero">
        <div className="ai-hero-copy">
          <p className="ai-kicker">SWEET MAKEUP / BEAUTY LAB</p>
          <h1>Tu asesora de<br /><em>belleza personal</em></h1>
          <p className="ai-hero-lead">Descubre qué tonos, looks y productos pueden ayudarte a expresar tu estilo.</p>
          <div className="ai-triad"><span>✦ IA</span><span>✦ BELLEZA</span><span>✦ PERSONALIZACIÓN</span></div>
          <div className="ai-editorial-collage" aria-hidden="true"><img className="ai-collage-main" src={models1} alt="" /><img className="ai-collage-small" src={models2} alt="" /><span>✦</span></div>
        </div>

        <section className="ai-chat-shell" aria-labelledby="ai-title">
          <header className="ai-chat-header">
            <div className="ai-avatar" aria-hidden="true">✦</div>
            <div><p className="ai-kicker">SWEET MAKEUP / BEAUTY LAB</p><h2 id="ai-title">Tu asesora de belleza</h2><p className="ai-status"><span /> En línea para ayudarte</p></div>
            <span className="ai-header-mark" aria-hidden="true">AI</span>
          </header>
          <div className="ai-chat-messages" aria-live="polite">
            {messages.map((message) => <div className={`ai-message-row ${message.role}`} key={message.id}><div className="ai-message">{message.image && <img className="ai-message-image" src={message.image} alt="Imagen adjunta para analizar" />}{message.text}</div></div>)}
            {isLoading && <div className="ai-message-row assistant"><div className="ai-message ai-typing" aria-label="La asesora está escribiendo"><span /><span /><span /></div></div>}
          </div>
          {selectedImage && <div className="ai-image-preview"><img src={selectedImage.data} alt={`Vista previa de ${selectedImage.name}`} /><span>{selectedImage.name}</span><button type="button" onClick={removeImage} aria-label="Quitar imagen adjunta" title="Quitar imagen">×</button></div>}
          <form className="ai-composer" onSubmit={sendMessage}>
            <input ref={fileInputRef} className="sr-only" type="file" accept="image/*" onChange={handleImageChange} disabled={isLoading} />
            <button className="ai-attach-button" type="button" onClick={() => fileInputRef.current?.click()} disabled={isLoading} aria-label="Adjuntar imagen" title="Adjuntar imagen"><span aria-hidden="true">📎</span></button>
            <label className="sr-only" htmlFor="ai-message-input">Escribe tu consulta</label>
            <input ref={messageInputRef} id="ai-message-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe tu consulta..." disabled={isLoading} autoComplete="off" />
            <button type="submit" disabled={(!input.trim() && !selectedImage) || isLoading} aria-label="Enviar mensaje"><span aria-hidden="true">↑</span></button>
          </form>
          <p className="ai-helper">Tu asesora puede orientarte sobre tonos, rutinas y productos.</p>
          {error && <p className="ai-error" role="alert">{error}</p>}
        </section>
      </section>

      <section className="ai-section ai-prompts-section">
        <div className="ai-section-heading"><p className="ai-kicker">EMPIEZA LA CONVERSACIÓN</p><h2>¿Qué te gustaría hacer <em>hoy?</em></h2></div>
        <div className="ai-prompt-grid">{quickPrompts.map(({ icon, query, text }) => <button type="button" className="ai-prompt-card" onClick={() => choosePrompt(query)} key={query}><span>{icon}</span><strong>{text}</strong><i>↗</i></button>)}</div>
      </section>

      <section className="ai-section ai-services-section">
        <div className="ai-section-heading"><p className="ai-kicker">UNA EXPERIENCIA HECHA PARA TI</p><h2>¿Qué puedo hacer <em>por ti?</em></h2></div>
        <div className="ai-service-grid">{services.map((service) => <article className="ai-service-card" key={service.number}><img src={service.image} alt="" /><div className="ai-service-overlay" /><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div></article>)}</div>
      </section>

      <section className="ai-section ai-inspiration-section">
        <div className="ai-scanner-heading"><p className="ai-kicker">UN MUNDO DE POSIBILIDADES</p><h2>Tu belleza, <em>descifrada por la IA</em></h2></div>
        <div className="ai-scanner-layout">
          <div className="ai-scanner-visual">
            <div className="ai-scanner-orbit ai-scanner-orbit-one" aria-hidden="true" />
            <div className="ai-scanner-orbit ai-scanner-orbit-two" aria-hidden="true" />
            <div className="ai-scanner-ring" aria-hidden="true"><span /><span /><span /><span /></div>
            <div className="ai-scanner-face"><img src={models1} alt="Modelo analizada por la asesora de belleza" /><div className="ai-scan-line" aria-hidden="true" /></div>
            <span className="ai-scan-tag ai-scan-tag-tone">TONO</span>
            <span className="ai-scan-tag ai-scan-tag-style">ESTILO</span>
            <span className="ai-scan-tag ai-scan-tag-color">COLOR</span>
            <span className="ai-scan-tag ai-scan-tag-look">LOOK</span>
            <span className="ai-scan-status">AI <b>✦</b></span>
            <span className="ai-scan-dot ai-scan-dot-one" aria-hidden="true" />
            <span className="ai-scan-dot ai-scan-dot-two" aria-hidden="true" />
          </div>
          <div className="ai-scanner-copy"><p className="ai-kicker">ANÁLISIS PERSONALIZADO / 01</p><h3>¿Lista para descubrir tu estilo?</h3><p>La IA no decide cómo debes verte. Te ayuda a descubrir posibilidades que quizá aún no habías imaginado.</p><button type="button" className="ai-scanner-button" onClick={() => choosePrompt('Quiero analizar mi estilo')}><span>✦</span> ANALIZAR MI ESTILO <b>→</b></button></div>
        </div>
        <div className="ai-final-manifesto"><p>No sigas tendencias.<br /><em>Crea la tuya.</em></p><span>SWEET MAKEUP / BEAUTY AI</span></div>
      </section>
    </main>
  )
}

export default AsesoriaIA
