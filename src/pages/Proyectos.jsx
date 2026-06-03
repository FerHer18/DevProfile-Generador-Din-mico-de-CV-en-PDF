import ProyectForm from '../componentes/ProjectForm'
import { useState } from 'react'

function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  return (
    <>
      <h1>Proyectos</h1>
      <br />
      <ProyectForm 
        proyectos={proyectos}
        onGuardar={setProyectos}
      />
    </>
  )
}

export default Proyectos