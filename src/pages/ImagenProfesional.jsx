import ProfileImageForm from '../componentes/ProfileImageForm'
import '../styles/ImagenProfesional.css'

function ImagenProfesional() {
  return (
    <div className="imagen-profesional">
      <h1 style={{ color: '#4d6657' }}>Foto de Perfil</h1>
      <ProfileImageForm />
    </div>
  )
}

export default ImagenProfesional