import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CVProvider } from './context/CVContext';
import Home from './pages/Home';
import Crear from './pages/Crear';
import Modificar from './pages/Modificar';
import ImagenProfesional from './pages/ImagenProfesional';
import DatosPersonales from './pages/DatosPersonales';
import Habilidades from './pages/Habilidades';
import Proyectos from './pages/Proyectos';
import Educacion from './pages/Educacion';
import Idiomas from './pages/Idiomas';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import './App.css';
import './styles/dark-mode.css';

function App() {
  return (
    <CVProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/modificar" element={<Modificar />} />
              <Route path="/preview/:id" element={<Preview />} />
              <Route path="/Preview" element={<Preview />} />

              <Route path="/crear" element={<Crear />}>
                <Route path="datos"       element={<DatosPersonales />} />
                <Route path="imagen"      element={<ImagenProfesional />} />
                <Route path="habilidades" element={<Habilidades />} />
                <Route path="proyectos"   element={<Proyectos />} />
                <Route path="educacion"   element={<Educacion />} />
                <Route path="idiomas"     element={<Idiomas />} />
              </Route>

              <Route path="/editar/:id" element={<Editor />}>
                <Route path="datos"       element={<DatosPersonales />} />
                <Route path="imagen"      element={<ImagenProfesional />} />
                <Route path="habilidades" element={<Habilidades />} />
                <Route path="proyectos"   element={<Proyectos />} />
                <Route path="educacion"   element={<Educacion />} />
                <Route path="idiomas"     element={<Idiomas />} />
              </Route>

            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CVProvider>
  );
}

export default App;