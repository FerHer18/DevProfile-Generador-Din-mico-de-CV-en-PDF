import React, { useState } from 'react'

const validarURL = (url) => {
  try { new URL(url); return true; }
  catch { return false; }
}

const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) //regex

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

    const validaciones = () =>{
        const e = {}
        if (!datosPersonales.nombre.trim()) e.nombre = "Campo obligatorio"
        else if (datosPersonales.nombre.trim().length < 3) e.nombre = "Nombre debe de contener mínimo 3 carcateres"
        else if (datosPersonales.nombre.trim().length > 60) e.nombre = "Nombre máximo de 80 caracteres"

        if (!datosPersonales.profesion.trim()) e.profesion = "Campo obligatorio"

        if (!datosPersonales.ciudad.trim()) e.ciudad = "Campo obligatorio"

        if (!datosPersonales.correo.trim()) e.correo = "Campo obligatorio"
        else if (!validarCorreo(datosPersonales.correo)) e.correo = "Correo no válido"

        if (datosPersonales.telefono &&  !/^\d{10}$/.test(datosPersonales.telefono))
            e.telefono = "Teléfono no válido"

        if (!datosPersonales.descripcion.trim()) e.descripcion = "Campo obligatorio"
        else if (datosPersonales.descripcion.trim().length < 20) e.descripcion = "Descripción mínimo de 20 caracteres"
        else if (datosPersonales.descripcion.trim().length > 300) e.descripcion = "Descripción máximo de 300 caracteres"

        return e
    }

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

        const validarCampos = validaciones()

        if (errores.enlace) {
            validarCampos.enlace = errores.enlace
        }
        setErrores(validarCampos)

        if (Object.keys(validarCampos).length === 0) { //No hay errores
            console.log("Datos:", datosPersonales)

            localStorage.setItem(
                "datosPersonales",
                JSON.stringify(datosPersonales)
            )

            alert("Datos guardados correctamente")
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

      {/* Sección de enlaces */}
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