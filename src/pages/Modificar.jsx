import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import '../styles/Modificar.css'

function Modificar() {
  return (
    <>
      <Navbar />

      <section className="modificar-page">
        <div className="modificar-container">
          <h1>Modificar CV</h1>

          <p>
            Continúa editando tu currículum y actualiza tu
            información profesional.
          </p>

          <button>Seleccionar CV</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Modificar