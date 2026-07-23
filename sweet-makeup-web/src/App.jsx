import { useState } from 'react'
import './App.css'
import { supabase } from './supabase' 

// ── Iconos SVG ──────────────────────────────────────────
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
)

const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconEyeOpen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const IconEyeOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

// ── Componente principal ─────────────────────────────────────
function App() {
  const [activeNav, setActiveNav]     = useState('Inicio')
  const [modo, setModo]               = useState('registro') // 'registro' o 'login'
  const [nombre, setNombre]           = useState('')
  const [correo, setCorreo]           = useState('')
  const [password, setPassword]       = useState('')
  const [confirm, setConfirm]         = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors]           = useState({})

  const navLinks = ['Inicio', 'Tienda', 'Asesoría IA', 'Looks', 'Sobre nosotros']

  const validate = () => {
    const e = {}
    if (!nombre.trim())           e.nombre   = 'Ingresa tu nombre'
    if (!correo.includes('@'))    e.correo   = 'Correo inválido'
    if (password.length < 6)      e.password = 'Mínimo 6 caracteres'
    if (password !== confirm)     e.confirm  = 'Las contraseñas no coinciden'
    return e
  }

  const handleSubmit = async () => {
    if (modo === 'registro') {
      const e = validate()
      setErrors(e)
      if (Object.keys(e).length !== 0) return

      const { error } = await supabase.auth.signUp({
        email: correo,
        password: password,
        options: { data: { nombre: nombre, rol: 'cliente' } }
      })

      if (error) {
        alert('Error al crear la cuenta: ' + error.message)
        console.log(error)
        return
      }

      alert('¡Cuenta creada con éxito! Revisa tu correo para confirmar.')
      setNombre(''); setCorreo(''); setPassword(''); setConfirm('')

    } else {
      const e = {}
      if (!correo.includes('@'))  e.correo   = 'Correo inválido'
      if (password.length < 6)    e.password = 'Mínimo 6 caracteres'
      setErrors(e)
      if (Object.keys(e).length !== 0) return

      const { error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: password
      })

      if (error) {
        alert('Error al iniciar sesión: ' + error.message)
        console.log(error)
        return
      }

      alert('¡Bienvenido de nuevo!')
    }
  }

  const cambiarModo = () => {
    setModo(modo === 'registro' ? 'login' : 'registro')
    setErrors({})
  }

  return (
    <div className="app-root">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link} className={activeNav === link ? 'nav-active' : ''}>
              <a href="#" onClick={e => { e.preventDefault(); setActiveNav(link) }}>
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-search">
          <input type="text" placeholder="Buscar productos..." />
          <button className="search-icon-btn"><IconSearch /></button>
        </div>
      </nav>

      {/* ── HERO / PÁGINA ── */}
      <section className="hero">
        <div className="hero-bg" />

        <div className="register-box">

          <h1 className="register-title">
            {modo === 'registro' ? 'Crear cuenta' : 'Iniciar sesión'}
          </h1>

          <div className="title-accent">
            <span className="accent-line" />
            <span className="accent-star">✦</span>
            <span className="accent-line" />
          </div>

          <p className="register-subtitle">
            Asesoría personalizada, recomendaciones<br />
            inteligentes y productos{' '}
            <span className="pink-text">perfectos para ti</span>
          </p>

          {/* Nombre — solo en registro */}
          {modo === 'registro' && (
            <>
              <div className={`input-field ${errors.nombre ? 'input-error' : ''}`}>
                <span className="field-icon"><IconUser /></span>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              {errors.nombre && <span className="err-txt">{errors.nombre}</span>}
            </>
          )}

          {/* Correo — siempre visible */}
          <div className={`input-field ${errors.correo ? 'input-error' : ''}`}>
            <span className="field-icon"><IconMail /></span>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
          </div>
          {errors.correo && <span className="err-txt">{errors.correo}</span>}

          {/* Contraseña — siempre visible */}
          <div className={`input-field ${errors.password ? 'input-error' : ''}`}>
            <span className="field-icon"><IconLock /></span>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="eye-btn" onClick={() => setShowPass(!showPass)}>
              {showPass ? <IconEyeOff /> : <IconEyeOpen />}
            </button>
          </div>
          {errors.password && <span className="err-txt">{errors.password}</span>}

          {/* Confirmar contraseña — solo en registro */}
          {modo === 'registro' && (
            <>
              <div className={`input-field ${errors.confirm ? 'input-error' : ''}`}>
                <span className="field-icon"><IconLock /></span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                />
                <button className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <IconEyeOff /> : <IconEyeOpen />}
                </button>
              </div>
              {errors.confirm && <span className="err-txt">{errors.confirm}</span>}
            </>
          )}

          {/* Botón */}
          <button className="submit-btn" onClick={handleSubmit}>
            ✦ &nbsp;{modo === 'registro' ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>

          <p className="login-txt">
            {modo === 'registro' ? (
              <>¿Ya tienes cuenta?{' '}
                <a href="#" onClick={e => { e.preventDefault(); cambiarModo() }}>Inicia sesión</a>
              </>
            ) : (
              <>¿No tienes cuenta?{' '}
                <a href="#" onClick={e => { e.preventDefault(); cambiarModo() }}>Regístrate</a>
              </>
            )}
          </p>

        </div>
      </section>
    </div>
  )
}

export default App