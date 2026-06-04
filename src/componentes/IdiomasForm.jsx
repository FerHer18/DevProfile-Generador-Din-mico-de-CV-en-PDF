import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSeccion } from '../services/cvService'
import { useCV } from '../context/CVContext'

const NIVELES = ['Básico', 'Intermedio', 'Avanzado', 'Nativo']

const estadoInicial = {
  idioma: '',
  nivel: 'Básico'
}

function IdiomasForm() {
  const { confirmarGuardado } = useCV()
  const navigate = useNavigate()
  const [form, setForm] = useState(estadoInicial)
  const [idiomas, setIdiomas] = useState([])
  const [errores, setErrores] = useState({})

  const validar = () => {
    const e = {}
    if (!form.idioma.trim()) e.idioma = 'Campo obligatorio'
    else if (form.idioma.trim().length > 30) e.idioma = 'Máximo 30 caracteres'
    if (idiomas.map(i => i.idioma.toLowerCase()).includes(form.idioma.trim().toLowerCase())) {
      e.idioma = 'Este idioma ya fue agregado'
    }
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const agregar = () => {
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) return
    setIdiomas([...idiomas, { idioma: form.idioma.trim(), nivel: form.nivel }])
    setForm(estadoInicial)
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
    confirmarGuardado(
      () => guardarSeccion('idiomas', idiomas),
      () => navigate('/')
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Idioma *</label>
        <input
          name="idioma"
          value={form.idioma}
          onChange={handleChange}
          placeholder="Ej: Inglés, Francés..."
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
      <button type="button" className="btn-agregar" onClick={agregar}>
        Agregar idioma
      </button>
      <ul>
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
        Guardar y continuar
      </button>
    </form>
  )
}

export default IdiomasForm