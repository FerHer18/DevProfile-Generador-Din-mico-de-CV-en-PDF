import '../styles/NavBar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      
      <Link to="/" className="logo">
        DevProfile
      </Link>

      <nav>
        <Link to="/">Inicio</Link>

        <Link to="/crear">
          Crear CV
        </Link>

        <Link to="/modificar">
          Modificar CV
        </Link>
      </nav>

    </header>
  )
}

export default Navbar