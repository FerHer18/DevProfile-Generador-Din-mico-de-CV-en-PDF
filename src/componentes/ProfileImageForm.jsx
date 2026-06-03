import { useState } from 'react'

function ProfileImageForm({ onGuardar }) {
  const [imagen, setImagen] = useState("")
  const [error, setError] = useState("")

  const handleArchivo = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return

    if (!archivo.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (jpg, png, etc.)")
      setImagen("")
      return
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setError("La imagen no debe superar 5MB")
      setImagen("")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImagen(reader.result) 
      setError("")
    }
    reader.readAsDataURL(archivo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!imagen) {
      setError("Debes seleccionar una imagen")
      return
    }
    onGuardar(imagen)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Foto de perfil *</label>
        <input type="file" accept="image/*" onChange={handleArchivo} />
        {error && <span>{error}</span>}
      </div>

      {imagen && (
        <img
          src={imagen}
          alt="Vista previa"
          style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
        />
      )}

      <button type="submit">Guardar imagen</button>
    </form>
  )
}

export default ProfileImageForm