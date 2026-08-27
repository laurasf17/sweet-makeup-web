import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  
  IconUser,
  IconMail,
  IconLock,
  IconEyeOpen,
  IconEyeOff,
  IconGoogle,   // ícono nuevo de Google
  IconFacebook  // ícono nuevo de Facebook

} from '../../components/icons'

// ─────────────────────────────────────────────
// PÁGINA DE REGISTRO / LOGIN
// ─────────────────────────────────────────────

function Register() {

  const [modo, setModo] = useState('registro')

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [errors, setErrors] = useState({})

  const validate = () => {

    const e = {}

    if (modo === 'registro' && !nombre.trim()) {
      e.nombre = 'Ingresa tu nombre'
    }

    if (!correo.includes('@')) {
      e.correo = 'Correo inválido'
    }

    if (password.length < 6) {
      e.password = 'Mínimo 6 caracteres'
    }

    if (modo === 'registro' && password !== confirm) {
      e.confirm = 'Las contraseñas no coinciden'
    }

    return e
  }

  const handleSubmit = () => {

    const e = validate()

    setErrors(e)

    if (Object.keys(e).length !== 0) {
      return
    }

    if (modo === 'registro') {

      alert(
        '¡Formulario correcto! La conexión con la base de datos se agregará después.'
      )

    } else {

      alert(
        'Inicio de sesión listo. La conexión con la base de datos se agregará después.'
      )
    }
  }

  const cambiarModo = () => {

    setModo(
      modo === 'registro'
        ? 'login'
        : 'registro'
    )

    setErrors({})
  }

  return (

    <section className="hero">

      <div className="hero-bg" />

      <div className="register-box">

        <h1 className="register-title">
          {modo === 'registro'
            ? 'Crear cuenta'
            : 'Iniciar sesión'}
        </h1>

        <div className="title-accent">

          <span className="accent-line" />

          <span className="accent-star">
            ✦
          </span>

          <span className="accent-line" />

        </div>

        <p className="register-subtitle">

          Asesoría personalizada, recomendaciones
          <br />

          inteligentes y productos{' '}

          <span className="pink-text">
            perfectos para ti
          </span>

        </p>

        {/* NOMBRE */}

        {modo === 'registro' && (

          <>

            <div
              className={`input-field ${
                errors.nombre
                  ? 'input-error'
                  : ''
              }`}
            >

              <span className="field-icon">
                <IconUser />
              </span>

              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={e =>
                  setNombre(e.target.value)
                }
              />

            </div>

            {errors.nombre && (
              <span className="err-txt">
                {errors.nombre}
              </span>
            )}

          </>
        )}

        {/* CORREO */}

        <div
          className={`input-field ${
            errors.correo
              ? 'input-error'
              : ''
          }`}
        >

          <span className="field-icon">
            <IconMail />
          </span>

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e =>
              setCorreo(e.target.value)
            }
          />

        </div>

        {errors.correo && (
          <span className="err-txt">
            {errors.correo}
          </span>
        )}

        {/* CONTRASEÑA */}

        <div
          className={`input-field ${
            errors.password
              ? 'input-error'
              : ''
          }`}
        >

          <span className="field-icon">
            <IconLock />
          </span>

          <input
            type={
              showPass
                ? 'text'
                : 'password'
            }
            placeholder="Contraseña"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPass(!showPass)
            }
          >

            {showPass
              ? <IconEyeOff />
              : <IconEyeOpen />
            }

          </button>

        </div>

        {errors.password && (
          <span className="err-txt">
            {errors.password}
          </span>
        )}

        {/* CONFIRMAR CONTRASEÑA */}

        {modo === 'registro' && (

          <>

            <div
              className={`input-field ${
                errors.confirm
                  ? 'input-error'
                  : ''
              }`}
            >

              <span className="field-icon">
                <IconLock />
              </span>

              <input
                type={
                  showConfirm
                    ? 'text'
                    : 'password'
                }
                placeholder="Confirmar contraseña"
                value={confirm}
                onChange={e =>
                  setConfirm(e.target.value)
                }
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >

                {showConfirm
                  ? <IconEyeOff />
                  : <IconEyeOpen />
                }

              </button>

            </div>

            {errors.confirm && (
              <span className="err-txt">
                {errors.confirm}
              </span>
            )}

          </>
        )}
                {/* BOTONES DE GOOGLE Y FACEBOOK (solo visuales por ahora) */}

        <div className="social-divider">
          {/* línea izquierda */}
          <span className="social-line" />

          <span className="social-divider-text">
            o continúa con
          </span>

          {/* línea derecha */}
          <span className="social-line" />
        </div>

        <div className="social-buttons">

          {/* botón de Google, sin funcionalidad todavía */}
          <button type="button" className="social-btn">
            <IconGoogle />
            Google
          </button>

          {/* botón de Facebook, sin funcionalidad todavía */}
          <button type="button" className="social-btn">
            <IconFacebook />
            Facebook
          </button>

        </div>
        {/* BOTÓN */}

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >

          ✦ &nbsp;

          {modo === 'registro'
            ? 'Crear cuenta'
            : 'Iniciar sesión'}

        </button>

        {/* CAMBIAR REGISTRO / LOGIN */}

        <p className="login-txt">

          {modo === 'registro' ? (

            <>
              ¿Ya tienes cuenta?{' '}

              <a
                href="#"
                onClick={e => {
                  e.preventDefault()
                  cambiarModo()
                }}
              >
                Inicia sesión
              </a>
            </>

          ) : (

            <>
              ¿No tienes cuenta?{' '}

              <a
                href="#"
                onClick={e => {
                  e.preventDefault()
                  cambiarModo()
                }}
              >
                Regístrate
              </a>
            </>

          )}

        </p>


      </div>

    </section>
  )
}

export default Register
