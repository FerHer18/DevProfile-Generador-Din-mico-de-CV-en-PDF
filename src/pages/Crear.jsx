import { Link, Outlet } from 'react-router-dom'

import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'

import '../styles/Crear.css'

function Crear() {
  return (
    <>
      <Navbar />

      <section className="crear-layout">

        <aside className="sidebar">

          <h2>Crear CV</h2>

          <Link to="datos">
            Datos Personales
          </Link>

          <Link to="imagen">
            Imagen Profesional
          </Link>

          <Link to="habilidades">
            Habilidades
          </Link>

          <Link to="proyectos">
            Proyectos
          </Link>

          <Link to="educacion">
            Educación
          </Link>

          <Link to="idiomas">
            Idiomas
          </Link>

        </aside>

        <main className="content">
          <Outlet />
        </main>

      </section>

      <Footer />
    </>
  )
}

export default Crear