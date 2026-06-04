import ProyectoForm from '../componentes/ProyectoForm'
import { useState } from 'react'
import '../styles/ProyectoForm.css'

function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  return (
    <>
      <h1 style={{color: '#4d6657'}}>Proyectos</h1>
      <br />
      <ProyectoForm 
        proyectos={proyectos}
        onGuardar={setProyectos}
      />
    </>
  )
}

export default Proyectos