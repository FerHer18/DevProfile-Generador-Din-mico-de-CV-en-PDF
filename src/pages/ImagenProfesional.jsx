import ProfileImageForm from "./componentes/ProfileImageForm"

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
    <div>

      <h1>Generador de CV</h1>
      <ProfileImageForm onGuardar={guardarImagen} />

    </div>
  )
}

export default ImagenProfesional