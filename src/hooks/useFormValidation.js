const validarURL = (url) => {
    if (!url || url.trim() === "") return true

    try {
        new URL(url)
        return true
    }catch{
        return false
    }
}

const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) //regex

// Validaciones para datos personales
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

// Validaciones para proyectos
export const validarProyecto = (form) => {
    const e = {}

    if (!form.nombre.trim())
        e.nombre = "El nombre es obligatorio"
    else if (form.nombre.trim().length > 30)
        e.nombre = "Máximo 30 caracteres"

    const cvs = JSON.parse(localStorage.getItem("cvs")) || []
    const ultimoCV = cvs[cvs.length - 1]
    const proyectos = ultimoCV?.proyectos || []
    const duplicado = proyectos.some(
        p => p.nombre.toLowerCase() === form.nombre.toLowerCase()
    )
    if (duplicado){
        e.nombre = "Ya existe un proyecto con ese nombre"
    }

    if (!form.descripcion.trim()) e.descripcion = "La descripción es obligatoria"
    else if (form.descripcion.trim().length < 10) e.descripcion = "Mínimo 10 caracteres"
    else if (form.descripcion.trim().length > 300) e.descripcion = "Máximo 300 caracteres"

    if (!form.tecnologias.trim()) e.tecnologias = "Indica al menos una tecnología"

    if (!validarURL(form.urlRepo)) e.urlRepo = "URL del repositorio no válida"
    if (!validarURL(form.urlDeploy)) e.urlDeploy = "URL del deploy no válida"
    if (!validarURL(form.imagen)) e.imagen = "URL de imagen no válida"

    return e
}

// Validaciones para educacion
export const validarEducacion = (form) => {
    const e = {}

    const añoActual = new Date().getFullYear()

    if (!form.institucion.trim()) e.institucion = "Campo obligatorio"

    if (!form.ingreso)e.ingreso = "Campo obligatorio"
    else if (Number(form.ingreso) > añoActual) e.ingreso = "No puede ser un año futuro"

    if (!form.egreso) e.egreso = "Campo obligatorio"
    else if (Number(form.egreso) > añoActual) e.egreso = "No puede ser un año futuro"

    if (
        form.ingreso &&
        form.egreso &&
        Number(form.ingreso) === Number(form.egreso)
    ) {
        e.egreso = "Ingreso y egreso no pueden ser el mismo año"
    }

    if (
        form.ingreso &&
        form.egreso &&
        Number(form.egreso) < Number(form.ingreso)
    ) {
        e.egreso = "El egreso no puede ser menor al ingreso"
    }

    return e
}

export {validarURL}