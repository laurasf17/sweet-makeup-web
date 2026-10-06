import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './SobreNosotros.css'
import maquillaje01 from '../../assets/maquillaje01.jpeg'
import maquillaje02 from '../../assets/maquillaje02.jpeg'
import maquillaje03 from '../../assets/maquillaje03.jpeg'
import maquillaje04 from '../../assets/maquillaje04.jpeg'
import maquillaje05 from '../../assets/maquillaje05.jpeg'

const fotos = [maquillaje01, maquillaje02, maquillaje03, maquillaje04, maquillaje05]

const testimonios = [
  { texto: 'La asesoría entendió exactamente lo que quería expresar con mi look.', nombre: 'Valentina R.', detalle: 'Comunidad Sweet Makeup' },
  { texto: 'Encontré productos que sí se sienten hechos para mi piel y mi estilo.', nombre: 'Camila M.', detalle: 'Beauty lover' },
  { texto: 'La tecnología se siente cercana, intuitiva y muy inspiradora.', nombre: 'Sofía G.', detalle: 'Exploradora de looks' }
]

function Icon({ tipo }) {
  const paths = {
    personalizacion: <><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="7" /></>,
    tecnologia: <><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M19 9h3M2 15h3M19 15h3M9 12h6M12 9v6" /></>,
    autenticidad: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></>,
    innovacion: <><path d="M9 18h6M10 21h4M8 14.5a6 6 0 1 1 8 0c-.8.7-1 1.3-1 2.5H9c0-1.2-.2-1.8-1-2.5Z" /><path d="m12 2 1 2M4.5 5.5 6 7M19.5 5.5 18 7" /></>,
    cercania: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 9a2.5 2.5 0 0 1 0 5M17 15c2.3.3 4 2.2 4 5" /></>,
    confianza: <><path d="M12 2 20 5v6c0 5-3 8.5-8 11-5-2.5-8-6-8-11V5l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" /></>,
    calidad: <><path d="m12 2 2.5 5.5 6 .7-4.5 4 1.3 5.9-5.3-3.1-5.3 3.1 1.3-5.9-4.5-4 6-.7L12 2Z" /></>
  }

  return <svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[tipo]}</svg>
}

function Dots({ total, active }) {
  return <div className="sn-dots" aria-hidden="true">{Array.from({ length: total }, (_, index) => <span className={index === active ? 'sn-dot sn-dot-active' : 'sn-dot'} key={index} />)}</div>
}

function SobreNosotros() {
  const [fotoActiva, setFotoActiva] = useState(0)
  const [testimonioActivo, setTestimonioActivo] = useState(0)

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setFotoActiva((actual) => (actual + 1) % fotos.length)
    }, 4500)
    return () => window.clearInterval(intervalo)
  }, [])

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setTestimonioActivo((actual) => (actual + 1) % testimonios.length)
    }, 5500)
    return () => window.clearInterval(intervalo)
  }, [])

  return (
    <main className="sn-page">
      <div className="sn-decor sn-decor-one" aria-hidden="true">✦</div>
      <div className="sn-decor sn-decor-two" aria-hidden="true">✦</div>
      <div className="sn-curve sn-curve-one" aria-hidden="true" />
      <div className="sn-curve sn-curve-two" aria-hidden="true" />

      <section className="sn-section sn-hero-section">
        <div className="sn-hero-copy sn-reveal">
          <span className="sn-label">IA <b>✦</b> BELLEZA <b>✦</b> PERSONALIZACIÓN</span>
          <h1>Sobre<br /><em>Nosotros</em></h1>
          <p className="sn-hero-lead">La tecnología entiende tu belleza. Tú decides cómo expresarla.</p>
          <span className="sn-hero-rule" />
        </div>
        <div className="sn-hero-photo sn-photo-frame sn-reveal-delay">
          <img src={maquillaje01} alt="Belleza editorial Sweet Makeup" />
          <span className="sn-photo-glow" aria-hidden="true" />
          <span className="sn-photo-caption">SWEET MAKEUP / BEAUTY LAB</span>
        </div>
      </section>

      <section className="sn-section sn-history-section">
        <div className="sn-history-photo sn-photo-frame">
          <img src={maquillaje02} alt="Inspiración de maquillaje Sweet Makeup" />
          <span className="sn-photo-index">02 <i>/ 05</i></span>
        </div>
        <div className="sn-history-copy">
          <span className="sn-label">01 / El comienzo</span>
          <h2>Nuestra<br /><em>historia</em></h2>
          <p>Sweet Makeup nació de la visión de combinar belleza y tecnología para crear experiencias personalizadas que realzan la autenticidad de cada persona.</p>
          <p>Creemos que la inteligencia artificial puede potenciar tu belleza natural con recomendaciones precisas, productos premium y asesoría hecha especialmente para ti.</p>
          <div className="sn-timeline">
            <div><strong>2024</strong><span>Nace Sweet Makeup</span></div>
            <div><strong>2025</strong><span>Incorporamos asesoría con IA</span></div>
            <div><strong>2026</strong><span>Personalización de looks y productos</span></div>
          </div>
        </div>
      </section>

      <section className="sn-section sn-essence-section">
        <div className="sn-centered-heading"><span className="sn-label">02 / La intención</span><h2>Nuestra <em>esencia</em></h2><p>No queremos cambiar tu belleza. Queremos ayudarte a descubrirla.</p></div>
        <div className="sn-card-grid sn-essence-grid">
          <article className="sn-feature-card"><Icon tipo="personalizacion" /><span>01</span><h3>Personalización</h3><p>Recomendaciones que reconocen lo que te hace única.</p></article>
          <article className="sn-feature-card sn-card-highlight"><Icon tipo="tecnologia" /><span>02</span><h3>Tecnología</h3><p>IA que convierte tus preferencias en posibilidades.</p></article>
          <article className="sn-feature-card"><Icon tipo="autenticidad" /><span>03</span><h3>Autenticidad</h3><p>Tu estilo, tus reglas, tu manera de brillar.</p></article>
        </div>
      </section>

      <section className="sn-section sn-movement-section">
        <div className="sn-section-heading-row"><div><span className="sn-label">03 / La inspiración</span><h2>Belleza en <em>movimiento</em></h2></div><span className="sn-heading-note">Una mirada distinta<br />a cada versión de ti.</span></div>
        <div className="sn-gallery-frame">
          <img key={fotos[fotoActiva]} src={fotos[fotoActiva]} alt={`Look editorial Sweet Makeup ${fotoActiva + 1}`} className="sn-gallery-image" />
          <div className="sn-gallery-overlay" aria-hidden="true" />
          <span className="sn-gallery-counter">0{fotoActiva + 1} <i>/ 05</i></span>
          <Dots total={fotos.length} active={fotoActiva} />
        </div>
      </section>

      <section className="sn-section sn-process-section">
        <div className="sn-centered-heading"><span className="sn-label">04 / El proceso</span><h2>¿Cómo <em>funciona?</em></h2><p>Tu belleza, acompañada por una tecnología que sí te escucha.</p></div>
        <div className="sn-process-grid">
          <article><span>01</span><div className="sn-process-icon">◌</div><h3>Sube tu foto</h3><p>Comparte tu inspiración de forma segura y privada.</p></article>
          <article><span>02</span><div className="sn-process-icon">✦</div><h3>La IA descubre tu estilo</h3><p>Analizamos tus rasgos, tonos y preferencias.</p></article>
          <article><span>03</span><div className="sn-process-icon">♡</div><h3>Tu belleza, personalizada</h3><p>Recibe looks y productos pensados para ti.</p></article>
        </div>
      </section>

      <section className="sn-section sn-values-section">
        <div className="sn-centered-heading"><span className="sn-label">05 / Lo que nos mueve</span><h2>Nuestros <em>valores</em></h2></div>
        <div className="sn-card-grid sn-values-grid">
          <article className="sn-value-card"><Icon tipo="innovacion" /><h3>Innovación</h3><p>Curiosidad para crear nuevas formas de explorar tu belleza.</p></article>
          <article className="sn-value-card"><Icon tipo="cercania" /><h3>Cercanía</h3><p>Una experiencia que se siente humana en cada paso.</p></article>
          <article className="sn-value-card"><Icon tipo="confianza" /><h3>Confianza</h3><p>Tu información y tus decisiones siempre están primero.</p></article>
          <article className="sn-value-card"><Icon tipo="calidad" /><h3>Calidad</h3><p>Selección cuidadosa para resultados que sí disfrutas.</p></article>
        </div>
      </section>

      <section className="sn-section sn-impact-section">
        <div className="sn-impact-copy"><span className="sn-label">06 / Más que belleza</span><h2>Nuestro<br /><em>impacto</em></h2><p>Una comunidad que crece cuando cada persona se siente libre de expresarse.</p></div>
        <div className="sn-stats-grid"><div><strong>+1.000</strong><span>personas inspiradas</span></div><div><strong>+500</strong><span>looks descubiertos</span></div><div><strong>24/7</strong><span>acompañamiento</span></div><div><strong>IA</strong><span>hecha para ti</span></div></div>
      </section>

      <section className="sn-section sn-testimonials-section">
        <div className="sn-centered-heading"><span className="sn-label">07 / Ellas lo cuentan</span><h2>Voces de nuestra <em>comunidad</em></h2></div>
        <div className="sn-testimonial-card"><span className="sn-quote-mark">“</span><p>{testimonios[testimonioActivo].texto}</p><strong>{testimonios[testimonioActivo].nombre}</strong><span>{testimonios[testimonioActivo].detalle}</span><Dots total={testimonios.length} active={testimonioActivo} /></div>
      </section>

      <section className="sn-section sn-cta-section">
        <div className="sn-cta-photo sn-photo-frame"><img src={maquillaje05} alt="Belleza personalizada Sweet Makeup" /></div>
        <div className="sn-cta-copy"><span className="sn-label">08 / Tu siguiente look</span><h2>Tu belleza ya existe.<br /><em>Nosotros te ayudamos a descubrirla.</em></h2><Link to="/asesoria-ia" className="sn-cta-button">Descubre tu estilo <span>✦</span></Link></div>
      </section>
    </main>
  )
}

export default SobreNosotros
