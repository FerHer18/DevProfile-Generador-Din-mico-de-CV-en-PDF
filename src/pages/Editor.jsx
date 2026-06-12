import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import Editor from '../componentes/Editor'
import '../styles/Crear.css'

function PaginaEditar() {
  return (
    <>
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
      <Navbar />
      <Editor />
      <Footer />
    </>
  )
}

export default PaginaEditar