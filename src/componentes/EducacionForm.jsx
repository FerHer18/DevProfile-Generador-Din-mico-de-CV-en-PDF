import { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { validarEducacion } from '../hooks/useFormValidation'
import { guardarEducacion } from '../hooks/useLocalStorage'
import { actualizarCV, obtenerCVPorId } from '../services/cvService'

const registroVacio = {
  institucion: "",
  ingreso: "",
  egreso: "",
  enProceso: false
}

function EducacionForm() {
  const { handleConfirmar } = useOutletContext()
  const { id } = useParams()
  const [form, setForm] = useState(registroVacio)
  const [errores, setErrores] = useState({})
  const [educaciones, setEducaciones] = useState([])

  useEffect(() => {
    if (id) {
      const cv = obtenerCVPorId(id)
      if (cv?.educacion) setEducaciones(cv.educacion)
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const agregar = () => {
    const errores = validarEducacion(form)
    setErrores(errores)
    if (Object.keys(errores).length > 0) return

    const duplicado = educaciones.some(
      edu =>
        edu.institucion.toLowerCase() === form.institucion.toLowerCase() &&
        edu.ingreso === form.ingreso &&
        edu.egreso === form.egreso
    )

    if (duplicado) {
      setErrores({ institucion: "Esta educación ya fue agregada" })
      return
    }

    setEducaciones([...educaciones, form])
    setForm(registroVacio)
    setErrores({})
  }

  const eliminarEducacion = (index) => {
    setEducaciones(educaciones.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!id && educaciones.length === 0) {
      alert("Agrega al menos una educación")
      return
    }

    if (id) {
      handleConfirmar(() => actualizarCV(id, { educacion: educaciones }))
      return
    }

    handleConfirmar(() => guardarEducacion(educaciones))
  }

  return (
    <form className="educacion-form" onSubmit={handleSubmit}>
      <h3>Agregar educación</h3>

      <div>
        <label>Institución *</label>
        <input name="institucion" value={form.institucion} onChange={handleChange} />
        {errores.institucion && <span className="error">{errores.institucion}</span>}
      </div>

      <div>
        <label>Año de ingreso *</label>
        <input name="ingreso" type="text" maxLength={4} value={form.ingreso} onChange={handleChange} />
        {errores.ingreso && <span className="error">{errores.ingreso}</span>}
      </div>

      <div>
        <label>Año de egreso *</label>
        <input name="egreso" type="text" maxLength={4} value={form.egreso} onChange={handleChange} />
        {errores.egreso && <span className="error">{errores.egreso}</span>}
      </div>

      <button className="btn-agregar" type="button" onClick={agregar}>
        Agregar
      </button>

      <ul className="educacion-list">
        {educaciones.map((edu, index) => (
          <li key={index}>
            <div>
              <strong>{edu.institucion}</strong>
              <br />
              {edu.ingreso} - {edu.enProceso ? "En proceso" : edu.egreso}
            </div>
            <button type="button" className="btn-eliminar" onClick={() => eliminarEducacion(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button className="btn-principal" type="submit">
        {id ? 'Actualizar educación' : 'Guardar y continuar'}
      </button>
    </form>
  )
}

export default EducacionForm