import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Crear from './pages/Crear';
import Modificar from './pages/Modificar';
import ProfileImageForm from './componentes/ProfileImageForm';
import DatosPersonales from './pages/DatosPersonales';
import Habilidades from './pages/Habilidades';
import Proyectos from './pages/Proyectos';
import Educacion from './pages/Educacion';
import Idiomas from './pages/Idiomas';

import './App.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/modificar"
          element={<Modificar />}
        />

        <Route
          path="/crear"
          element={<Crear />}
        >
          <Route
            path="imagen"
            element={<ProfileImageForm />}
          />

          <Route
            path="datos"
            element={<DatosPersonales />}
          />

          <Route
            path="habilidades"
            element={<Habilidades />}
          />

          <Route
            path="proyectos"
            element={<Proyectos />}
          />

          <Route
            path="educacion"
            element={<Educacion />}
          />

          <Route
            path="idiomas"
            element={<Idiomas />}
          />
        </Route>

        <Route
          path="/editar/:id"
          element={<Crear />}
        >
          <Route
            path="imagen"
            element={<ProfileImageForm />}
          />

          <Route
            path="datos"
            element={<DatosPersonales />}
          />

          <Route
            path="habilidades"
            element={<Habilidades />}
          />

          <Route
            path="proyectos"
            element={<Proyectos />}
          />

          <Route
            path="educacion"
            element={<Educacion />}
          />

          <Route
            path="idiomas"
            element={<Idiomas />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;