const validarURL = (url) => {
    if (!url || url.trim() === "") return true
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

export const validaciones = (datosPersonales) => {
    const e = {}

    if (!datosPersonales.nombre.trim()) e.nombre = "Campo obligatorio"
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/.test(datosPersonales.nombre.trim())) 
        e.nombre = "Debe ingresar al menos nombre y apellido"
    else if (datosPersonales.nombre.trim().length < 3) e.nombre = "Nombre debe de contener mínimo 3 caracteres"
    else if (datosPersonales.nombre.trim().length > 60) e.nombre = "Nombre máximo de 60 caracteres"

    if (!datosPersonales.profesion.trim()) e.profesion = "Campo obligatorio"

    if (!datosPersonales.ciudad.trim()) e.ciudad = "Campo obligatorio"

    if (!datosPersonales.correo.trim()) e.correo = "Campo obligatorio"
    else if (!validarCorreo(datosPersonales.correo)) e.correo = "Correo no válido"

    if (datosPersonales.telefono && !/^\d{10}$/.test(datosPersonales.telefono))
        e.telefono = "Teléfono no válido"

    if (!datosPersonales.descripcion.trim()) e.descripcion = "Campo obligatorio"
    else if (datosPersonales.descripcion.trim().length < 20) e.descripcion = "Descripción mínimo de 20 caracteres"
    else if (datosPersonales.descripcion.trim().length > 300) e.descripcion = "Descripción máximo de 300 caracteres"

    return e
}

export const validarProyecto = (form, proyectosActuales = []) => {
  const e = {}

  if (!form.nombre.trim()) {
    e.nombre = 'El nombre es obligatorio'
  } else if (form.nombre.trim().length > 30) {
    e.nombre = 'Máximo 30 caracteres'
  } else {
    const duplicado = proyectosActuales.some(
      p => p.nombre.toLowerCase() === form.nombre.trim().toLowerCase()
    )
    if (duplicado) e.nombre = 'Ya existe un proyecto con ese nombre'
  }

  if (!form.rol.trim()) e.rol = 'El rol es obligatorio'
  else if (form.rol.trim().length > 50) e.rol = 'Máximo 50 caracteres'

  if (!form.descripcion.trim()) e.descripcion = 'La descripción es obligatoria'
  else if (form.descripcion.trim().length < 20) e.descripcion = 'Mínimo 20 caracteres'
  else if (form.descripcion.trim().length > 300) e.descripcion = 'Máximo 300 caracteres'

  if (form.resultado.trim().length > 150) e.resultado = 'Máximo 150 caracteres'

  if (form.herramientas.trim().length > 100) e.herramientas = 'Máximo 100 caracteres'

  if (!validarURL(form.url)) e.url = 'URL no válida'

  return e
}

export const validarEducacion = (form) => {
    const e = {}

    const añoActual = new Date().getFullYear()

    if (!form.institucion.trim()) e.institucion = "Campo obligatorio"

    if (!form.ingreso) e.ingreso = "Campo obligatorio"
    else if (!/^\d{4}$/.test(form.ingreso)) e.ingreso = "El año debe tener exactamente 4 dígitos"
    else if (Number(form.ingreso) > añoActual) e.ingreso = "No puede ser un año futuro"

    if (!form.enProceso) {
        if (!form.egreso) e.egreso = "Campo obligatorio"
        else if (!/^\d{4}$/.test(form.egreso)) e.egreso = "El año debe tener exactamente 4 dígitos"
        else if (Number(form.egreso) > añoActual) e.egreso = "No puede ser un año futuro"

        if (form.ingreso && form.egreso && Number(form.ingreso) === Number(form.egreso)) 
            e.egreso = "Ingreso y egreso no pueden ser el mismo año"
        if (form.ingreso && form.egreso && Number(form.egreso) < Number(form.ingreso)) 
            e.egreso = "El egreso no puede ser menor al ingreso"
    }
    return e
}

export const validarIdioma = (form, idiomas) => {
    const e = {}

    if (!form.idioma.trim()) e.idioma = "Campo obligatorio"
    else if (form.idioma.trim().length < 4) e.idioma = "Mínimo 4 caracteres"
    else if (form.idioma.trim().length > 20) e.idioma = "Máximo 20 caracteres"

    if (form.descripcion && form.descripcion.trim().length > 50) e.descripcion = "Máximo 50 caracteres"

    const duplicado = idiomas.some(i => i.idioma.toLowerCase() === form.idioma.trim().toLowerCase())
    if (duplicado)e.idioma = "Este idioma ya fue agregado"

    return e
}

export {validarURL}

