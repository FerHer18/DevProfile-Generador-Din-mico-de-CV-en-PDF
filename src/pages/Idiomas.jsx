import IdiomasForm from '../componentes/IdiomasForm'
import '../styles/Idiomas.css'

function Idiomas() {
  return (
    <div style={{ paddingTop: '1.5rem' }}>
      <h1 style={{ color: '#4d6657', marginBottom: '1.5rem' }}>Idiomas</h1>
      <IdiomasForm />
    </div>
  )
}

export default Idiomas