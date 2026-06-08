import { useState } from 'react'
import ProyectoForm from '../componentes/ProyectoForm'
import '../styles/ProyectoForm.css'

function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  return (
    <div style={{ paddingTop: '1.5rem' }}>
      <h1 style={{ color: '#4d6657', marginBottom: '1.5rem' }}>Proyectos</h1>
      <ProyectoForm proyectos={proyectos} onGuardar={setProyectos} />
    </div>
  )
}

export default Proyectos