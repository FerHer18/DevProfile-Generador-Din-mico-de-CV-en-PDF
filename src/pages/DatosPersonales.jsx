import PersonalForm from '../componentes/PersonalForm'
import '../styles/PersonalForm.css'

function DatosPersonales() {
  return (
    <div> 
      <h1 style={{color: '#4d6657'}}>Generador de CV</h1><br />
      <PersonalForm />
    </div>
  )
}

export default DatosPersonales