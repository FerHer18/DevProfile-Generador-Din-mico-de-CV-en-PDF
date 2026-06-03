import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'

import Navbar from '../componentes/Navbar'

import '../styles/Home.css'

function Home() {
  return (
    <>
      <Navbar />

      <section id="inicio" className="hero">
        <div className="hero-text">
          <h1>Impulsa tu carrera profesional</h1>

          <p>
            Crea, personaliza y administra currículums
            profesionales de forma rápida, sencilla y moderna.
          </p>

          <div className="hero-buttons">
            <button>Crear CV</button>
            <button className="secondary">
              Modificar CV
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={img3} alt="Generador de CV" />
        </div>
      </section>

      <section id="crear" className="crear-cv">
        <div className="section-image">
          <img src={img1} alt="Crear CV" />
        </div>

        <div className="section-content">
          <h2>Crear un nuevo CV</h2>

          <p>
            Comienza desde cero y construye un currículum
            profesional utilizando una estructura organizada
            y fácil de completar.
          </p>

          <button>Crear CV</button>
        </div>
      </section>

      <section id="modificar" className="modificar-cv">
        <div className="section-content">
          <h2>Modificar un CV</h2>

          <p>
            Continúa editando un currículum existente y
            mantén actualizada toda tu información académica
            y profesional.
          </p>

          <button>Modificar CV</button>
        </div>

        <div className="section-image">
          <img src={img2} alt="Modificar CV" />
        </div>
      </section>

      <section id="informacion" className="informacion">
        <h2>¿Por qué utilizar DevProfile?</h2>

          <p className="info-text">
            Este proyecto corresponde al trabajo final de la materia de Tecnologías Web, 
            en el cual se aplican los conocimientos adquiridos sobre React.
            El objetivo principal es ofrecer una herramienta que permita crear y administrar currículums profesionales 
            de manera eficiente, integrando buenas prácticas de desarrollo web moderno.
        </p>

        <div className="cards">
          <article>
            <h3>Fácil de usar</h3>

            <p>
              Interfaz intuitiva diseñada para crear
              currículums de forma sencilla.
            </p>
          </article>

          <article>
            <h3>Diseño profesional</h3>

            <p>
              Estructura clara y organizada para presentar
              tu experiencia y habilidades.
            </p>
          </article>

          <article>
            <h3>Edición rápida</h3>

            <p>
              Actualiza tu información cuando sea necesario
              sin comenzar desde cero.
            </p>
          </article>
        </div>
      </section>

      <footer>
        <p>
          DevProfile: Generador Dinámico de CV en PDF. 2026 Todos los derechos reservados.
        </p>
      </footer>
    </>
  )
}

export default Home