const IconSearch = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
)

function Navbar({ activeNav, setActiveNav }) {
  const navLinks = [
    'Inicio',
    'Tienda',
    'Asesoría IA',
    'Looks',
    'Sobre nosotros'
  ]

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navLinks.map(link => (
          <li
            key={link}
            className={activeNav === link ? 'nav-active' : ''}
          >
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setActiveNav(link)
              }}
            >
              {link}
            </a>
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