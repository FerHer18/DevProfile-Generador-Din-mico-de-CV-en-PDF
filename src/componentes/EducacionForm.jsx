import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSeccion } from '../services/cvService'
import { useCV } from '../context/CVContext'

const estadoInicial = {
  institucion: '',
  carrera: '',
  anioInicio: '',
  anioFin: ''
}

function EducacionForm() {
  const { confirmarGuardado } = useCV()
  const navigate = useNavigate()
  const [form, setForm] = useState(estadoInicial)
  const [educaciones, setEducaciones] = useState([])
  const [errores, setErrores] = useState({})

  const validar = () => {
    const e = {}
    if (!form.institucion.trim()) e.institucion = 'Campo obligatorio'
    else if (form.institucion.trim().length > 60) e.institucion = 'Máximo 60 caracteres'
    if (!form.carrera.trim()) e.carrera = 'Campo obligatorio'
    else if (form.carrera.trim().length > 60) e.carrera = 'Máximo 60 caracteres'
    const anioActual = new Date().getFullYear()
    if (!form.anioInicio) e.anioInicio = 'Campo obligatorio'
    else if (form.anioInicio < 1950 || form.anioInicio > anioActual) e.anioInicio = `Año entre 1950 y ${anioActual}`
    if (form.anioFin && form.anioFin < form.anioInicio) e.anioFin = 'No puede ser menor al año de inicio'
    if (form.anioFin && form.anioFin > anioActual + 6) e.anioFin = 'Año no válido'
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
    setEducaciones([...educaciones, form])
    setForm(estadoInicial)
  }

  const eliminar = (index) => {
    setEducaciones(educaciones.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (educaciones.length === 0) {
      setErrores({ institucion: 'Agrega al menos una educación' })
      return
    }
    confirmarGuardado(
      () => guardarSeccion('educacion', educaciones),
      () => navigate('../idiomas')
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Institución *</label>
        <input name="institucion" value={form.institucion} onChange={handleChange} placeholder="Ej: UNAM, IPN..." />
        {errores.institucion && <span className="error">{errores.institucion}</span>}
      </div>
      <div>
        <label>Carrera *</label>
        <input name="carrera" value={form.carrera} onChange={handleChange} placeholder="Ej: Ingeniería en Sistemas..." />
        {errores.carrera && <span className="error">{errores.carrera}</span>}
      </div>
      <div>
        <label>Año de inicio *</label>
        <input name="anioInicio" type="number" value={form.anioInicio} onChange={handleChange} />
        {errores.anioInicio && <span className="error">{errores.anioInicio}</span>}
      </div>
      <div>
        <label>Año de fin (opcional)</label>
        <input name="anioFin" type="number" value={form.anioFin} onChange={handleChange} placeholder="Dejar vacío si es actual" />
        {errores.anioFin && <span className="error">{errores.anioFin}</span>}
      </div>
      <button type="button" className="btn-agregar" onClick={agregar}>
        Agregar educación
      </button>
      <ul>
        {educaciones.map((ed, i) => (
          <li key={i}>
            {ed.carrera} — {ed.institucion} ({ed.anioInicio} - {ed.anioFin || 'Actual'})
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

export default EducacionForm