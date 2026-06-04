import ProyectForm from '../componentes/ProjectForm'
import { useState } from 'react'
import '../styles/ProjectForm.css'

function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  return (
    <>
      <h1 style={{color: '#4d6657'}}>Proyectos</h1>
      <br />
      <ProyectForm 
        proyectos={proyectos}
        onGuardar={setProyectos}
      />
    </>
  )
}

export default Proyectos