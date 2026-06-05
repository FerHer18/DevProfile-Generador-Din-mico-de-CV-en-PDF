export const guardarDatosPersonales = (datos) => {

    const cvs = JSON.parse(localStorage.getItem("cvs")) || []

    const ultimoId =
        cvs.length > 0
            ? cvs[cvs.length - 1].id
            : 0

    const nuevoCV = {
        id: ultimoId + 1,
        ...datos
    }

    cvs.push(nuevoCV)

    localStorage.setItem(
        "cvs",
        JSON.stringify(cvs)
    )

    alert("Datos guardados correctamente")
}

export const obtenerDatosPersonales = () => {
    return JSON.parse(
        localStorage.getItem("cvs")
    ) || []
}

export const guardarProyectos = (proyectoNuevo) => {
    const cvs = JSON.parse(localStorage.getItem("cvs")) || []

    if (cvs.length === 0) return

    const ultimoCV = cvs[cvs.length - 1]

    if (!ultimoCV.proyectos) {
        ultimoCV.proyectos = []
    }

    ultimoCV.proyectos.push(proyectoNuevo)

    localStorage.setItem(
        "cvs",
        JSON.stringify(cvs)
    )
    alert("Proyecto guardado correctamente")
}

export const guardarEducacion = (educaciones) => {

    const cvs = JSON.parse(localStorage.getItem("cvs")) || []

    if (cvs.length === 0) {
        alert("No existe ningún CV guardado")
        return
    }

    const ultimoCV = cvs[cvs.length - 1]
    ultimoCV.educacion = educaciones

    localStorage.setItem(
        "cvs",
        JSON.stringify(cvs)
    )
}

export const guardarIdiomas = (idiomas) => {

    const cvs = JSON.parse(
        localStorage.getItem("cvs")
    ) || []

    if (cvs.length === 0) {
        alert("No existe ningún CV guardado")
        return
    }

    const ultimoCV = cvs[cvs.length - 1]
    ultimoCV.idiomas = idiomas

    localStorage.setItem(
        "cvs",
        JSON.stringify(cvs)
    )

    alert("Idiomas guardados correctamente")
}