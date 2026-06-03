import React, { useState } from 'react'
import { validaciones, validarURL} from '../hooks/useFormValidation'
import { guardarDatosPersonales } from '../hooks/useLocalStorage'

function PersonalForm() {
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    profesion: "",
    ciudad: "",
    correo: "",
    telefono: "",
    descripcion: "",
    enlaces: [],
  })

  const [nuevoEnlace, setNuevoEnlace] = useState("")
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setDatosPersonales({
        ...datosPersonales,
        [e.target.name]: e.target.value
    })
  }

  const agregarEnlace = () =>{
    if (!nuevoEnlace.trim()) return
    if (!validarURL(nuevoEnlace)) {
        setErrores({ ...errores, enlace: "URL no válida" })
        return
    }
    if (datosPersonales.enlaces.includes(nuevoEnlace)) {
        setErrores({ ...errores, enlace: "Este enlace ya fue agregado" })
        return
    }

    setDatosPersonales({ ...datosPersonales, enlaces: [...datosPersonales.enlaces, nuevoEnlace] })
    setNuevoEnlace("")

    const nuevosErrores = {...errores}
    delete nuevosErrores.enlace
    setErrores(nuevosErrores)
  }

  const eliminarEnlace = (index) => {
    setDatosPersonales({...datosPersonales, enlaces: datosPersonales.enlaces.filter((_, i) => i !== index)}) //NO se usa elemento por eso _
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validarCampos = validaciones(datosPersonales)

    if (errores.enlace) {
        validarCampos.enlace = errores.enlace
    }
    setErrores(validarCampos)

    if (Object.keys(validarCampos).length === 0) { //No hay errores
        guardarDatosPersonales(datosPersonales)
    }   
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre completo *</label>
        <input name="nombre" value={datosPersonales.nombre} onChange={handleChange} />
        {errores.nombre ? <span>{errores.nombre}</span> : null} 
      </div>

      <div>
        <label>Profesión / Carrera *</label>
        <input name="profesion" value={datosPersonales.profesion} onChange={handleChange} />
        {errores.profesion ? <span>{errores.profesion}</span> : null} 
      </div> 

      <div>
        <label>Ciudad *</label>
        <input name="ciudad" value={datosPersonales.ciudad} onChange={handleChange} />
        {errores.ciudad ? <span>{errores.ciudad}</span> : null}
      </div>

      <div>
        <label>Correo electrónico *</label>
        <input name="correo" type="email" value={datosPersonales.correo} onChange={handleChange} />
        {errores.correo ? <span>{errores.correo}</span> : null}
      </div>

      <div>
        <label>Teléfono (opcional)</label>
        <input name="telefono" value={datosPersonales.telefono} onChange={handleChange} />
        {errores.telefono ? <span>{errores.telefono}</span> : null}
      </div>

      <div>
        <label>Descripción / Perfil profesional *</label>
        <textarea name="descripcion" value={datosPersonales.descripcion} onChange={handleChange} />
        {errores.descripcion ? <span>{errores.descripcion}</span> : null}
      </div>

      <div>
        <label>Agregar enlace (GitHub, LinkedIn, etc.)</label>
        <input value={nuevoEnlace} onChange={(e) => setNuevoEnlace(e.target.value)} placeholder="https://..." />
        <button type="button" onClick={agregarEnlace}>Agregar</button>
        {errores.enlace ? <span>{errores.enlace}</span> : null}

        <ul>
          {datosPersonales.enlaces.map((link, i) => (
            <li key={i}>
              {link}
              <button type="button" onClick={() => eliminarEnlace(i)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">Guardar datos</button>
                
    </form>
  )
}

export default PersonalForm