import {Link} from "react-router-dom";
import "./SobreNosotros.css";
import fotoModelos from '../../assets/sobre-nosotros.jpg'


function IconChip() {
  return (
    <svg viewBox="0 0 24 24" className="valor-icono">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity="0.4" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="valor-icono">
      <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 14c2.6 0.3 4.5 2.4 4.5 5"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="valor-icono">
      <path d="M12 2 L20 5 V11 C20 16 17 19.5 12 22 C7 19.5 4 16 4 11 V5 Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 12l2.4 2.4L15.5 9.5"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCrown() {
  return (
    <svg viewBox="0 0 24 24" className="valor-icono">
      <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function IconTruck() {
  return (
    <svg viewBox="0 0 24 24" className="beneficio-icono">
      <rect x="1" y="7" width="13" height="9" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 10h4l3 3v3h-7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IconBadgeCheck() {
  return (
    <svg viewBox="0 0 24 24" className="beneficio-icono">
      <path d="M12 2 L20 5 V11 C20 16 17 19.5 12 22 C7 19.5 4 16 4 11 V5 Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 12l2.4 2.4L15.5 9.5"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconUserCheck() {
  return (
    <svg viewBox="0 0 24 24" className="beneficio-icono">
      <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 12l2 2 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" className="beneficio-icono">
      <path d="M6 8h12l-1 12H7L6 8Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SobreNosotros() {
  return (
    <section className="sn-hero">

      {/* ── Encabezado + columnas ── */}
      <h1 className="sn-titulo">
  Sobre Nosotros <span className="sn-star">✦</span>
</h1>

<p className="sn-subtitulo">
  Belleza, tecnología e innovación para empoderar tu esencia natural.
</p>

<div className="sn-top">

  <div className="sn-texto">

    <h2 className="sn-seccion-titulo">Nuestra historia</h2>

    <p className="sn-parrafo">
      Sweet Makeup nació de la visión de combinar belleza y tecnología
      para crear experiencias personalizadas que realzan la
      autenticidad de cada persona.
    </p>

    <p className="sn-parrafo">
      Creemos que la inteligencia artificial puede potenciar tu
      belleza natural con recomendaciones precisas, productos
      premium y asesoría hecha especialmente para ti.
    </p>

    <p className="sn-parrafo">
      Hoy seguimos creciendo con un objetivo claro: que cada persona, sin importar 
      su experiencia con el maquillaje, encuentre en Sweet Makeup un espacio
      donde sentirse acompañada, entendida y segura de su propia belleza.
    </p>

  </div>

  <div className="sn-imagen-wrap">
    <img
      src={fotoModelos}
      alt="Modelos Sweet Makeup"
      className="sn-imagen"
    />
  </div>
  

</div>

  {/* ── Cómo funciona ── */}
      <div className="sn-como-funciona">

        <h2 className="sn-seccion-titulo sn-como-funciona-titulo">¿Cómo funciona?</h2>

        <div className="sn-pasos">

          <div className="paso-item">
            <span className="paso-numero">1</span>
            <h3>Sube tu foto</h3>
            <p>De forma segura y privada.</p>
          </div>

          <div className="paso-item">
            <span className="paso-numero">2</span>
            <h3>Nuestra IA la analiza</h3>
            <p>Identifica tono de piel, forma de rostro y rasgos clave.</p>
          </div>

          <div className="paso-item">
            <span className="paso-numero">3</span>
            <h3>Recibe tus recomendaciones</h3>
            <p>Looks y productos pensados para ti.</p>
          </div>

        </div>

      </div>

      {/* ── Nuestros valores ── */}
      <div className="sn-valores">

        <h2 className="sn-seccion-titulo sn-valores-titulo">Nuestros valores</h2>

        <div className="sn-valores-grid">

          <div className="valor-item">
            <IconChip />
            <span>Innovación</span>
          </div>

          <div className="valor-item">
            <IconUsers />
            <span>Cercanía</span>
          </div>

          <div className="valor-item">
            <IconShield />
            <span>Confianza</span>
          </div>

          <div className="valor-item">
            <IconCrown />
            <span>Calidad</span>
          </div>

        </div>

      </div>

      {/* ── Franja de beneficios ── */}
      <div className="sn-beneficios">

        <div className="beneficio-item">
          <IconTruck />
          <span>Envíos rápidos a toda Colombia</span>
        </div>

        <div className="beneficio-item">
          <IconBadgeCheck />
          <span>Productos originales 100% garantizados</span>
        </div>

        <div className="beneficio-item">
          <IconUserCheck />
          <span>Asesoría IA personalizada para ti y tu piel</span>
        </div>

        <div className="beneficio-item">
          <IconBag />
          <span>Pagos seguros, protegemos tu información</span>
        </div>

      </div>
 {/* ── CTA de cierre ── */}
      <div className="sn-cta">
        <p className="sn-cta-texto">¿Lista para descubrir tu look ideal?</p>
        <Link to="/asesoria-ia" className="sn-cta-boton">
          Prueba la asesoría IA ahora
        </Link>
      </div>


    </section>
  )
}

export default SobreNosotros