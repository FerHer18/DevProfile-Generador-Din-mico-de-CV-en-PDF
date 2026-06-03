<<<<<<< HEAD
import Home from './pages/Home'
//import { useState } from 'react'
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Crear from './pages/Crear'
import Modificar from './pages/Modificar'

import ImagenProfesional from './pages/ImagenProfesional'
import DatosPersonales from './pages/DatosPersonales'
import Habilidades from './pages/Habilidades'
import Proyectos from './pages/Proyectos'
import Educacion from './pages/Educacion'
import Cursos from './pages/Cursos'
import Idiomas from './pages/Idiomas'
>>>>>>> b4e215febc5921fd81f2cc1e25d3a63c8cd0f8ad

import './App.css'

function App() {

  return (
<<<<<<< HEAD
    <Home />
=======
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
            element={<ImagenProfesional />}
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
            path="cursos"
            element={<Cursos />}
          />

          <Route
            path="idiomas"
            element={<Idiomas />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
>>>>>>> b4e215febc5921fd81f2cc1e25d3a63c8cd0f8ad
  )
}

export default App