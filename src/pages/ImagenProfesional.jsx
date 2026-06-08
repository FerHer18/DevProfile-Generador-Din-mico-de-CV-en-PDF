import ProfileImageForm from '../componentes/ProfileImageForm'
import '../styles/ImagenProfesional.css'

function ImagenProfesional() {
  return (
    <div className="imagen-profesional" style={{ paddingTop: '1.5rem' }}>
      <h1 style={{ color: '#4d6657', marginBottom: '1.5rem' }}>Foto de Perfil</h1>
      <ProfileImageForm />
    </div>
  )
}

export default ImagenProfesional