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

    alert("Datos guardados correctamente, tu ID es:")
}

export const obtenerDatosPersonales = () => {
    const datos = localStorage.getItem("datosPersonales")

    return datos ? JSON.parse(datos) : null
}