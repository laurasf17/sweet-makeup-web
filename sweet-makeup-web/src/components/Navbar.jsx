import { Link, useLocation } from 'react-router-dom'
import { IconSearch } from './icons'

// Cada link de navegación apunta a su ruta real.
// "Inicio" lleva a "/", que es la página de
// registro/login.
const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Tienda', path: '/tienda' },
  { label: 'Asesoría IA', path: '/asesoria-ia' },
  { label: 'Looks', path: '/looks' },
  { label: 'Sobre nosotros', path: '/sobre-nosotros' }
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navLinks.map(({ label, path }) => (
          <li
            key={path}
            className={pathname === path ? 'nav-active' : ''}
          >
            <Link to={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Buscar productos..."
        />

        <button className="search-icon-btn">
          <IconSearch />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
