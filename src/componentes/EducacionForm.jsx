import { useState } from 'react'
import { validarEducacion } from '../hooks/useFormValidation'
import { guardarEducacion } from '../hooks/useLocalStorage'

const registroVacio = {
  institucion: "",
  ingreso: "",
  egreso: ""
}

function EducacionForm() {

  const [form, setForm] = useState(registroVacio)
  const [errores, setErrores] = useState({})
  const [educaciones, setEducaciones] = useState([])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errores = validarEducacion(form)

    setErrores(errores)
    if (Object.keys(errores).length > 0) return

    guardarEducacion(form)
    setEducaciones([
      ...educaciones,
      form
    ])

    setForm(registroVacio)
    setErrores({})
  }

  const eliminarEducacion = (index) => {
    setEducaciones(
      educaciones.filter((_, i) => i !== index)
    )
  }

  return (
    <form className="educacion-form" onSubmit={handleSubmit}>

      <h3>Agregar educación</h3>

      <div>
        <label>Institución *</label>
        <input
          name="institucion"
          value={form.institucion}
          onChange={handleChange}
        />
        {errores.institucion && <span className="error">{errores.institucion}</span>}
      </div>

      <div>
        <label>Año de ingreso *</label>
        <input
          name="ingreso"
          type="number"
          value={form.ingreso}
          onChange={handleChange}
        />
        {errores.ingreso && <span className="error">{errores.ingreso}</span>}
      </div>

      <div>
        <label>Año de egreso *</label>
        <input
          name="egreso"
          type="number"
          value={form.egreso}
          onChange={handleChange}
        />
        {errores.egreso && <span className="error">{errores.egreso}</span>}
      </div>

      <button type="submit">
        Agregar
      </button>

      <ul className="educacion-list">
        {educaciones.map((edu, index) => (
          <li key={index}>
            <div>
              <strong>{edu.institucion}</strong>
              <br />
              {edu.ingreso} - {edu.egreso}
            </div>

            <button
              type="button"
              className="btn-eliminar"
              onClick={() => eliminarEducacion(index)}
            >Eliminar</button>
          </li>
        ))}
      </ul>
    </form>
  )
}

export default EducacionForm