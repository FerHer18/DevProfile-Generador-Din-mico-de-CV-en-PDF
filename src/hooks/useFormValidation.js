const validarURL = (url) => {
  try { new URL(url); return true; }
  catch { return false; }
}

const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) //regex

export const validaciones = (datosPersonales) =>{
    const e = {}
    if (!datosPersonales.nombre.trim()) e.nombre = "Campo obligatorio"
    else if (datosPersonales.nombre.trim().length < 3) e.nombre = "Nombre debe de contener mínimo 3 carcateres"
    else if (datosPersonales.nombre.trim().length > 60) e.nombre = "Nombre máximo de 60 caracteres"

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

export {validarURL}