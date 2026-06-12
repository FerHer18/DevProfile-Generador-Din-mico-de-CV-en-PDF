import { useState, useEffect } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { validaciones, validarURL } from '../hooks/useFormValidation'
import { guardarDatosPersonales } from '../hooks/useLocalStorage'
import { obtenerCVPorId, actualizarCV } from '../services/cvService'
import { useCV } from '../context/CVContext'

function PersonalForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { confirmarGuardado } = useCV()
  const { handleConfirmar } = useOutletContext() || {}

  const estadoInicial = {
    nombre: '',
    profesion: '',
    ciudad: '',
    correo: '',
    telefono: '',
    descripcion: '',
    enlaces: []
  }

  const [datosPersonales, setDatosPersonales] = useState(estadoInicial)
  const [nuevoEnlace, setNuevoEnlace] = useState('')
  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (id) {
      const cv = obtenerCVPorId(id)
      if (!cv) return
      setDatosPersonales({
        nombre:      cv.nombre      || '',
        profesion:   cv.profesion   || '',
        ciudad:      cv.ciudad      || '',
        correo:      cv.correo      || '',
        telefono:    cv.telefono    || '',
        descripcion: cv.descripcion || '',
        enlaces:     cv.enlaces     || []
      })
    }
  }, [id])

  const handleChange = (e) => {
    setDatosPersonales({ ...datosPersonales, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const agregarEnlace = () => {
    if (!nuevoEnlace.trim()) return
    if (!validarURL(nuevoEnlace)) {
      setErrores({ ...errores, enlace: 'URL no válida' })
      return
    }
    if (datosPersonales.enlaces.includes(nuevoEnlace)) {
      setErrores({ ...errores, enlace: 'Este enlace ya fue agregado' })
      return
    }
    setDatosPersonales({
      ...datosPersonales,
      enlaces: [...datosPersonales.enlaces, nuevoEnlace]
    })
    setNuevoEnlace('')
    const nuevosErrores = { ...errores }
    delete nuevosErrores.enlace
    setErrores(nuevosErrores)
  }

  const eliminarEnlace = (index) => {
    setDatosPersonales({
      ...datosPersonales,
      enlaces: datosPersonales.enlaces.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validarCampos = validaciones(datosPersonales)
    if (errores.enlace) validarCampos.enlace = errores.enlace
    setErrores(validarCampos)
    if (Object.keys(validarCampos).length > 0) return

    if (id) {
      handleConfirmar(() => actualizarCV(id, datosPersonales))
      return
    }

    confirmarGuardado(
      () => guardarDatosPersonales(datosPersonales),
      () => navigate('../imagen')
    )
  }

  return (
    <form className="personal-form" onSubmit={handleSubmit}>
      <div>
        <label>Nombre completo *</label>
        <input
          name="nombre"
          value={datosPersonales.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div>
        <label>Profesión / Carrera *</label>
        <input
          name="profesion"
          value={datosPersonales.profesion}
          onChange={handleChange}
        />
        {errores.profesion && <span className="error">{errores.profesion}</span>}
      </div>

      <div>
        <label>Ciudad *</label>
        <input
          name="ciudad"
          value={datosPersonales.ciudad}
          onChange={handleChange}
        />
        {errores.ciudad && <span className="error">{errores.ciudad}</span>}
      </div>

      <div>
        <label>Correo electrónico *</label>
        <input
          name="correo"
          type="email"
          value={datosPersonales.correo}
          onChange={handleChange}
        />
        {errores.correo && <span className="error">{errores.correo}</span>}
      </div>

      <div>
        <label>Teléfono (opcional)</label>
        <input
          name="telefono"
          value={datosPersonales.telefono}
          onChange={handleChange}
        />
        {errores.telefono && <span className="error">{errores.telefono}</span>}
      </div>

      <div className="full-width">
        <label>Descripción / Perfil profesional *</label>
        <textarea
          name="descripcion"
          value={datosPersonales.descripcion}
          onChange={handleChange}
        />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}
      </div>

      <div className="full-width">
        <label>Agregar enlace (GitHub, LinkedIn, etc.)</label>
        <input
          value={nuevoEnlace}
          onChange={(e) => setNuevoEnlace(e.target.value)}
          placeholder="https://..."
        />
        <button className="btn-agregar" type="button" onClick={agregarEnlace}>
          Agregar
        </button>
        {errores.enlace && <span className="error">{errores.enlace}</span>}
        <ul>
          {datosPersonales.enlaces.map((link, i) => (
            <li key={i}>
              {link}
              <button
                className="btn-eliminar"
                type="button"
                onClick={() => eliminarEnlace(i)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className="btn-principal">
        {id ? 'Actualizar datos' : 'Guardar y continuar'}
      </button>
    </form>
  )
}

export default PersonalForm