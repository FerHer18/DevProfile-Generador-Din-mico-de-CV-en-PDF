import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useCV } from '../context/CVContext'

const SECCIONES = [
  { ruta: 'datos',       label: 'Datos Personales' },
  { ruta: 'imagen',      label: 'Imagen Profesional' },
  { ruta: 'habilidades', label: 'Habilidades' },
  { ruta: 'proyectos',   label: 'Proyectos' },
  { ruta: 'educacion',   label: 'Educación' },
  { ruta: 'idiomas',     label: 'Idiomas' },
]

function Editor() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { confirmarGuardado } = useCV()

  const seccionActualIndex = SECCIONES.findIndex(s =>
    location.pathname.endsWith(s.ruta)
  )

  const handleConfirmar = (guardarFn) => {
    const siguiente = SECCIONES[seccionActualIndex + 1]
    confirmarGuardado(guardarFn, () => {
      if (siguiente) navigate(`/editar/${id}/${siguiente.ruta}`)
      else navigate(`/preview/${id}`)
    })
  }

  return (
    <section className="crear-layout">
      <aside className="sidebar">
        <h2>Editar CV</h2>
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
        <Outlet context={{ handleConfirmar, id }} />
      </main>
    </section>
  )
}

export default Editor