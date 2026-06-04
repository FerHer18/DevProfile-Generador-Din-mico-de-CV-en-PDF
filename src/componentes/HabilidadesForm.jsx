import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSeccion } from '../services/cvService'
import { useCV } from '../context/CVContext'

function HabilidadesForm() {
  const { confirmarGuardado } = useCV()
  const navigate = useNavigate()
  const [habilidad, setHabilidad] = useState('')
  const [habilidades, setHabilidades] = useState([])
  const [errores, setErrores] = useState({})

  const agregar = () => {
    if (!habilidad.trim()) {
      setErrores({ habilidad: 'Campo obligatorio' })
      return
    }
    if (habilidad.trim().length > 40) {
      setErrores({ habilidad: 'Máximo 40 caracteres' })
      return
    }
    if (habilidades.map(h => h.toLowerCase()).includes(habilidad.trim().toLowerCase())) {
      setErrores({ habilidad: 'Esta habilidad ya fue agregada' })
      return
    }
    setHabilidades([...habilidades, habilidad.trim()])
    setHabilidad('')
    setErrores({})
  }

  const eliminar = (index) => {
    setHabilidades(habilidades.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (habilidades.length === 0) {
      setErrores({ habilidad: 'Agrega al menos una habilidad' })
      return
    }
    confirmarGuardado(
      () => guardarSeccion('habilidades', habilidades),
      () => navigate('../proyectos')
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Agregar habilidad *</label>
        <input
          type="text"
          value={habilidad}
          onChange={(e) => { setHabilidad(e.target.value); setErrores({}) }}
          placeholder="Ej: React, Photoshop..."
        />
        <button type="button" className="btn-agregar" onClick={agregar}>
          Agregar
        </button>
        {errores.habilidad && <span className="error">{errores.habilidad}</span>}
      </div>
      <ul>
        {habilidades.map((h, i) => (
          <li key={i}>
            {h}
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

export default HabilidadesForm