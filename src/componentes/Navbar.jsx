import '../styles/NavBar.css'

function NavBar() {
  return (
    <header className="navbar">
      <div className="logo">
        ImpulsaCV
      </div>

      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#crear">Crear CV</a>
        <a href="#modificar">Modificar CV</a>
        <a href="#informacion">Información</a>
      </nav>
    </header>
  )
}

export default NavBar