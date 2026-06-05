import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarIdiomas } from '../hooks/useLocalStorage'
import { validarIdioma } from '../hooks/useFormValidation'

const NIVELES = ['Básico', 'Intermedio', 'Avanzado', 'Nativo']

const estadoInicial = {
  idioma: '',
  nivel: 'Básico',
  descripcion: ''
}

function IdiomasForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState(estadoInicial)
  const [idiomas, setIdiomas] = useState([])
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const agregar = () => {
    const e = validarIdioma(form, idiomas)
    setErrores(e)

    if (Object.keys(e).length > 0) return

    setIdiomas([
      ...idiomas,
      {
        idioma: form.idioma.trim(),
        nivel: form.nivel,
        descripcion: form.descripcion.trim()
      }
    ])

    setForm(estadoInicial)
    setErrores({})
  }

  const eliminar = (index) => {
    setIdiomas(idiomas.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (idiomas.length === 0) {
      setErrores({ idioma: 'Agrega al menos un idioma' })
      return
    }

    guardarIdiomas(idiomas)

    const cvs = JSON.parse(localStorage.getItem('cvs')) || []
    const idCV = cvs[cvs.length - 1]?.id

    alert(`CV generado exitosamente.\nID de tu CV: ${idCV}`)

    navigate('/Preview')
  }

  return (
    <form className="idiomas-form" onSubmit={handleSubmit}>
      <div>
        <label>Idioma *</label>
        <input
          name="idioma"
          value={form.idioma}
          onChange={handleChange}
        />
        {errores.idioma && <span className="error">{errores.idioma}</span>}
      </div>

      <div>
        <label>Nivel *</label>
        <select name="nivel" value={form.nivel} onChange={handleChange}>
          {NIVELES.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Descripción o certificación (opcional)</label>
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Ej: TOEFL B2, Cambridge C1..."
        />
        {errores.descripcion && (
          <span className="error">{errores.descripcion}</span>
        )}
      </div>

      <button type="button" className="btn-agregar" onClick={agregar}>
        Agregar idioma
      </button>

      <ul className="idiomas-lista">
        {idiomas.map((item, i) => (
          <li key={i}>
            {item.idioma} — {item.nivel}
            <button type="button" className="btn-eliminar" onClick={() => eliminar(i)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button type="submit" className="btn-principal">
        Finalizar
      </button>
    </form>
  )
}

export default IdiomasForm