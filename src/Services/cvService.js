const obtenerCVs = () => {
    return JSON.parse(localStorage.getItem("cvs")) || []
}

const guardarCVs = (cvs) => {
    localStorage.setItem("cvs", JSON.stringify(cvs))
}

export const obtenerCVPorId = (id) => {
    const cvs = obtenerCVs()
    return cvs.find(cv => Number(cv.id) === Number(id))
}

export const actualizarCV = (id, datos) => {
    const cvs = obtenerCVs()
    const cvsActualizados = cvs.map(cv =>
        Number(cv.id) === Number(id)
            ? { ...cv, ...datos }
            : cv
    )
    guardarCVs(cvsActualizados)
}

export const guardarSeccion = (keySeccion, datos) => {
    const cvs = obtenerCVs()
    if (cvs.length === 0) return
    const ultimoCV = cvs[cvs.length - 1]
    cvs[cvs.length - 1] = { ...ultimoCV, [keySeccion]: datos }
    guardarCVs(cvs)
}

export const obtenerUltimoCV = () => {
    const cvs = obtenerCVs()
    return cvs[cvs.length - 1] || null
}