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
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import './App.css';
import './styles/dark-mode.css';

function App() {
  return (
    <CVProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modificar" element={<Modificar />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/Preview" element={<Preview />} />

          <Route path="/crear" element={<Crear />}>
            <Route path="imagen"      element={<ImagenProfesional />} />
            <Route path="datos"       element={<DatosPersonales />} />
            <Route path="habilidades" element={<Habilidades />} />
            <Route path="proyectos"   element={<Proyectos />} />
            <Route path="educacion"   element={<Educacion />} />
            <Route path="idiomas"     element={<Idiomas />} />
          </Route>

          <Route path="/editar/:id" element={<Crear />}>
            <Route path="imagen"      element={<ImagenProfesional />} />
            <Route path="datos"       element={<DatosPersonales />} />
            <Route path="habilidades" element={<Habilidades />} />
            <Route path="proyectos"   element={<Proyectos />} />
            <Route path="educacion"   element={<Educacion />} />
            <Route path="idiomas"     element={<Idiomas />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CVProvider>
  );
}

export default App;