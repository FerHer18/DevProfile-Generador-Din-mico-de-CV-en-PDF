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
import ThemeToggle from './componentes/ThemeToggle'
import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import './App.css';


function App() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Escucha cambios en la clase del body
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <CVProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modificar" element={<Modificar />} />
          <Route path="/preview/:id" element={<Preview />} />

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
      </BrowserRouter>
      <ThemeToggle />
      <Toaster theme={isDark ? "dark" : "light"} 
            position="top-right"
            richColors
            closeButton
            duration={3500}
      />
    </CVProvider>
    
  );
}

export default App;