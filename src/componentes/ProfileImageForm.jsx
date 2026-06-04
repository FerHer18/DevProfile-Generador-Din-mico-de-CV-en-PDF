import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSeccion } from '../services/cvService'
import { useCV } from '../context/CVContext'

function ProfileImageForm() {
  const { updateSection, confirmarGuardado } = useCV()
  const navigate = useNavigate()
  const [imagen, setImagen] = useState('')
  const [error, setError] = useState('')

  const handleArchivo = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    if (!archivo.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (jpg, png, etc.)')
      setImagen('')
      return
    }
    if (archivo.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar 5MB')
      setImagen('')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImagen(reader.result)
      setError('')
    }
    reader.readAsDataURL(archivo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!imagen) {
      setError('Debes seleccionar una imagen')
      return
    }
    confirmarGuardado(
      () => { updateSection('imagen', imagen); guardarSeccion('foto', imagen) },
      () => navigate('../habilidades')
    )
  }

  return (
    <form className="profile-image-form" onSubmit={handleSubmit}>
      <div className="card">
        <div>
          <label>Agrega una imagen</label>
          <input type="file" accept="image/*" onChange={handleArchivo} />
          {error && <span className="error">{error}</span>}
        </div>
        {imagen && (
          <div className="preview">
            <img
              src={imagen}
              alt="Vista previa"
              style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
        )}
      </div>
      <button type="submit" className="btn-principal">
        Guardar y continuar
      </button>
    </form>
  )
}

export default ProfileImageForm