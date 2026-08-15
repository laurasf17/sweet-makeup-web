import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Tienda from './pages/Tienda/Tienda'
import AsesoriaIA from './pages/AsesoriaIA/AsesoriaIA'
import Looks from './pages/Looks/Looks'
import SobreNosotros from './pages/SobreNosotros/SobreNosotros'

// ─────────────────────────────────────────────
// APP PRINCIPAL
// ─────────────────────────────────────────────

function App() {

  return (

    <BrowserRouter>

      <div className="app-root">

        <Navbar />

        <Routes>

          {/* INICIO / REGISTRO */}

          <Route
            path="/"
            element={<Register />}
          />

          {/* HOME */}

          <Route
            path="/home"
            element={<Home />}
          />

          {/* LOOKS */}

          <Route
            path="/looks"
            element={<Looks />}
          />

          {/* TIENDA */}

          <Route
            path="/tienda"
            element={<Tienda />}
          />

          {/* ASESORÍA IA */}

          <Route
            path="/asesoria-ia"
            element={<AsesoriaIA />}
          />

          {/* SOBRE NOSOTROS */}

          <Route
            path="/sobre-nosotros"
            element={<SobreNosotros />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App
