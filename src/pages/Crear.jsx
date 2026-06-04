import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import '../styles/Crear.css';

function Crear() {

  const location = useLocation();

  const mostrarBienvenida =
    location.pathname === '/crear' ||
    /^\/editar\/\d+$/.test(location.pathname);

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

          {mostrarBienvenida ? (

            <div className="bienvenida-cv">

              <h1>
                Bienvenido al Generador de Currículum Vitae
              </h1>

              <p>
                Utiliza el menú lateral para completar cada una
                de las secciones de tu currículum.
              </p>

              <p>
                Agrega tus datos personales, fotografía,
                habilidades, proyectos, formación académica
                e idiomas para construir un CV profesional.
              </p>

            </div>

          ) : (

            <Outlet />

          )}

        </main>

      </section>

      <Footer />
    </>
  );
}

export default Crear;