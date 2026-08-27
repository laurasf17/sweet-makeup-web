// ─────────────────────────────────────────────
// PÁGINA DE TIENDA
// Por ahora usa datos de ejemplo (sin Supabase).
// Cuando se conecte la base de datos, el arreglo
// "productos" se reemplaza por una consulta a la
// tabla "productos" de Supabase.
// ─────────────────────────────────────────────

import { useMemo, useState } from 'react'
import { IconHeart, IconBag } from '../../components/icons'
import labialElfImg from '../../assets/productos/labial elf.jpg'
import hotchocolateImg from '../../assets/productos/hot chocolate.png'
import aguaMicelarImg from '../../assets/productos/agua micelar garnier.jpg'
import baseSphoraImg from '../../assets/productos/base sphora.jpg'
import contornoImg from '../../assets/productos/contorno sheglam.jpg'
import gelCejasImg from '../../assets/productos/gel de cejas melu.jpg'
import guashaImg from '../../assets/productos/guasha y rodillo para rostro.jpg'
import paletaSombrasImg from '../../assets/productos/paleta de sombras para cejas.jpg'
import kitMaquillajeImg from '../../assets/productos/kit de maquillaje.jpg'
import brochasImg from '../../assets/productos/brochas.jpg'
//productos imagenes,precios,categorias,marcas,emoji y si es nuevo o no
const productos = [
  { id: 1, nombre: 'Gloos elf', categoria: 'Labios', marca: 'elf', precio: 65000, nuevo: true, emoji: '💄', imagen: labialElfImg },
  { id: 2, nombre: ' Gloos Hotchocolate', categoria: 'Labios', marca: 'Glow Co', precio: 38000, nuevo: true, emoji: '🧴', imagen: hotchocolateImg },
  { id: 9,  nombre: 'Agua Micelar Garnier', categoria: 'Skincare', marca: 'Garnier', precio: 32000, nuevo: true, emoji: '💧', imagen: aguaMicelarImg },
{ id: 10, nombre: 'Base Sephora', categoria: 'Rostro', marca: 'Sephora', precio: 72000, nuevo: true, emoji: '🧴', imagen: baseSphoraImg },
{ id: 11, nombre: 'Contorno Sheglam', categoria: 'Rostro', marca: 'Sheglam', precio: 28000, nuevo: false, emoji: '🎨', imagen: contornoImg },
{ id: 12, nombre: 'Gel de Cejas Melu', categoria: 'Ojos', marca: 'Melu', precio: 22000, nuevo: false, emoji: '✏️', imagen: gelCejasImg },
{ id: 13, nombre: 'Guasha y Rodillo Facial', categoria: 'Skincare', marca: 'Sweet Makeup', precio: 45000, nuevo: false, emoji: '🌿', imagen: guashaImg },
{ id: 14, nombre: 'Paleta de Sombras', categoria: 'Ojos', marca: 'Sweet Makeup', precio: 48000, nuevo: false, emoji: '🎨', imagen: paletaSombrasImg },
{ id: 15, nombre: 'Kit de Maquillaje', categoria: 'Kits IA', marca: 'Sweet Makeup', precio: 120000, nuevo: true, emoji: '🎁', imagen: kitMaquillajeImg },
{ id: 16, nombre: 'Brochas', categoria: 'Brochas', marca: 'Sweet Makeup', precio: 15000, nuevo: true, emoji: '🖌️', imagen: brochasImg }
]
//categoriaas
const categorias = ['Todos', 'Labios', 'Rostro', 'Ojos', 'Brochas', 'Skincare', 'Kits IA', 'Ofertas']

const ordenes = [
  { valor: 'populares', label: 'Más populares' },
  { valor: 'precio-asc', label: 'Precio: menor a mayor' },
  { valor: 'precio-desc', label: 'Precio: mayor a menor' }
]

const formatCOP = n =>
  n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

function Tienda() {

  const [categoria, setCategoria] = useState('Todos')
  const [orden, setOrden] = useState('populares')
  const [busqueda, setBusqueda] = useState('')
  const [cart, setCart] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [showCart, setShowCart] = useState(false)

  const filtrados = useMemo(() => {
    let lista = productos.filter(p => {
      const matchCat = categoria === 'Todos' || p.categoria === categoria
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      return matchCat && matchBusqueda
    })
    if (orden === 'precio-asc') lista = [...lista].sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') lista = [...lista].sort((a, b) => b.precio - a.precio)
    return lista
  }, [categoria, busqueda, orden])

  const addToCart = (id) => {
    setCart(prev => {
      const existe = prev.find(i => i.id === id)
      if (existe) {
        return prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i)
      }
      return [...prev, { id, cantidad: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const cartItems = cart.map(i => ({ ...i, producto: productos.find(p => p.id === i.id) }))
  const total = cartItems.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0)
  const totalItems = cart.reduce((sum, i) => sum + i.cantidad, 0)

  return (
    <section className="page-store">

      {/* ── ENCABEZADO ── */}
      <div className="store-hero">
        <span className="store-eyebrow">✨ BELLEZA INTELIGENTE</span>
        <h1 className="store-title">Tienda</h1>
        <p className="store-subtitle">
          Descubre productos de belleza seleccionados para ti con el poder de la IA.
          Nuestra tecnología analiza tu estilo y tono para ofrecerte una experiencia
          de lujo personalizada.
        </p>
      </div>

      {/* ── BUSCADOR PROPIO DE LA TIENDA ── */}
      <div className="store-search">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* ── CATEGORÍAS ── */}
      <div className="store-categories">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`cat-chip ${categoria === cat ? 'cat-chip-active' : ''}`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── SECCIÓN PRODUCTOS ── */}
      <div className="store-section-head">
        <h2 className="section-title">Productos destacados ✨</h2>

        <select
          className="sort-select"
          value={orden}
          onChange={e => setOrden(e.target.value)}
        >
          {ordenes.map(o => (
            <option key={o.valor} value={o.valor}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">

        {filtrados.map(p => (
          <div className="product-card" key={p.id}>

            {p.nuevo && <span className="product-badge">NUEVO</span>}

            <button
              className={`wish-btn ${favoritos.includes(p.id) ? 'wish-active' : ''}`}
              onClick={() => toggleFavorito(p.id)}
              aria-label="Agregar a favoritos"
            >
              <IconHeart filled={favoritos.includes(p.id)} />
            </button>

          <div className="product-thumb" aria-hidden="true">
  {p.imagen
    ? <img src={p.imagen} alt={p.nombre} className="product-photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    : <span>{p.emoji}</span>
  }
</div>

            <h3 className="product-name">{p.nombre}</h3>
            <span className="product-price">{formatCOP(p.precio)}</span>

            <div className="product-footer">
              <button className="add-btn" onClick={() => addToCart(p.id)}>
                Agregar al carrito
              </button>

              <button
                className="bag-btn"
                onClick={() => addToCart(p.id)}
                aria-label="Agregar rápido"
              >
                <IconBag />
              </button>
            </div>

          </div>
        ))}

        {filtrados.length === 0 && (
          <p className="store-empty">No encontramos productos con ese filtro.</p>
        )}

        {/* ── TARJETA DE RECOMENDACIÓN IA ── */}
        <div className="ai-card">
          <h3 className="ai-card-title">Recomendado <br />para ti ✨</h3>
          <p className="ai-card-text">
            Basado en tu estilo, tono de piel y preferencias analizadas por nuestra IA.
          </p>
          <div className="ai-card-thumb"><span>💄🪞</span></div>
          <p className="ai-card-kit">Kit base, corrector, polvo</p>
          <p className="ai-card-price">{formatCOP(80000)}</p>
          <button className="ai-card-btn" onClick={() => setCategoria('Kits IA')}>
  VER PRODUCTOS
</button>
        </div>

      </div>

      {/* ── BOTÓN FLOTANTE DEL CARRITO ── */}
      <button className="fab-cart" onClick={() => setShowCart(s => !s)} aria-label="Ver carrito">
        <IconBag />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {/* ── CARRITO (panel lateral) ── */}
      {showCart && (
        <div className="cart-drawer">

          <div className="cart-drawer-head">
            <h2>Tu carrito</h2>
            <button className="cart-close" onClick={() => setShowCart(false)}>✕</button>
          </div>

          {cartItems.length === 0 && (
            <p className="store-empty">Tu carrito está vacío.</p>
          )}

          {cartItems.map(i => (
            <div className="cart-item" key={i.id}>
              <div>
                <p className="cart-item-name">{i.producto.nombre}</p>
                <p className="cart-item-meta">x{i.cantidad} · {formatCOP(i.producto.precio)}</p>
              </div>
              <button className="cart-remove" onClick={() => removeFromCart(i.id)}>
                Quitar
              </button>
            </div>
          ))}

          {cartItems.length > 0 && (
            <div className="cart-total">
              <span>Total</span>
              <span>{formatCOP(total)}</span>
            </div>
          )}

          <button className="submit-btn cart-checkout" disabled={cartItems.length === 0}>
            ✦ &nbsp;Ir a pagar
          </button>

        </div>
      )}

    </section>
  )
}

export default Tienda