import PersonalForm from '../componentes/PersonalForm'
import '../styles/PersonalForm.css'

function DatosPersonales() {
  return (
    <div style={{ paddingTop: '1.5rem' }}>
      <h1 style={{ color: '#4d6657', marginBottom: '1.5rem' }}>Datos Personales</h1>
      <PersonalForm />
    </div>
  )
}

export default DatosPersonales