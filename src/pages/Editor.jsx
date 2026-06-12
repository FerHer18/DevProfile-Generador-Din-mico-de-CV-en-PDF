import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import Editor from '../componentes/Editor'
import '../styles/Crear.css'

function PaginaEditar() {
  return (
    <>
      <div className="pagina-editor">
        <Navbar />
        <Editor />
        <Footer />
      </div>
    </>
  )
}

export default PaginaEditar