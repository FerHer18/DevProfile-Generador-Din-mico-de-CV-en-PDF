import ProfileImageForm from "../componentes/ProfileImageForm";
import "../styles/ImagenProfesional.css"

function ImagenProfesional() {

  const guardarImagen = (img) => {

    const cvs = JSON.parse(localStorage.getItem("cvs")) || []

    if (cvs.length === 0) {
      alert("Primero debes crear un CV")
      return
    }

    cvs[cvs.length - 1].foto = img

    localStorage.setItem(
      "cvs",
      JSON.stringify(cvs)
    )

    alert("Imagen guardada correctamente")
  }

  return (
    <div className="imagen-profesional">

      <h1 style={{color: '#4d6657'}}>Foto de Perfil</h1>
      <ProfileImageForm onGuardar={guardarImagen} />

    </div>
  )
}

export default ImagenProfesional