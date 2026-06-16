import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useCV } from '../context/CVContext'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import '../styles/Crear.css'
 
const SECCIONES = [
  { ruta: 'datos',       label: 'Datos Personales' },
  { ruta: 'imagen',      label: 'Imagen Profesional' },
  { ruta: 'habilidades', label: 'Habilidades' },
  { ruta: 'proyectos',   label: 'Proyectos' },
  { ruta: 'educacion',   label: 'Educación' },
  { ruta: 'idiomas',     label: 'Idiomas' },
]

function Crear() {
  const navigate = useNavigate()
  const location = useLocation()
  const { confirmarGuardado } = useCV()

  const seccionActualIndex = SECCIONES.findIndex(s =>
    location.pathname.endsWith(s.ruta)
  )

  const mostrarBienvenida = seccionActualIndex === -1

  const handleConfirmar = (guardarFn) => {
    const siguiente = SECCIONES[seccionActualIndex + 1]
    confirmarGuardado(guardarFn, () => {
      if (siguiente) navigate(siguiente.ruta)
      else navigate('/')
    })
  }

  return (
    <div className="crear-page">
      <Navbar />
      <section className="crear-layout">
        <aside className="sidebar">
          <h2>Crear CV</h2>
          {SECCIONES.map((seccion, i) => {
            const esActual = location.pathname.endsWith(seccion.ruta)
            const completada = seccionActualIndex > i
            return (
              <div
                key={seccion.ruta}
                className={`sidebar-item ${esActual ? 'activo' : ''} ${completada ? 'completada' : ''}`}
              >
                <span className="sidebar-numero">{i + 1}</span>
                {seccion.label}
              </div>
            )
          })}
        </aside>

        <main className="content">
            {mostrarBienvenida ? (
              <div className="bienvenida-cv">
                <h1>Bienvenido al Generador de Currículum Vitae</h1>
                <p>Completa cada sección para construir tu CV profesional.</p>
                <button
                  className="btn-principal"
                  onClick={() => navigate('datos')}
                >
                  Comenzar
                </button>
              </div>
            ) : (
              <Outlet context={{ handleConfirmar }} />
            )}
        </main>
      </section>
      <Footer />
    </div>
  )
}

export default Crear