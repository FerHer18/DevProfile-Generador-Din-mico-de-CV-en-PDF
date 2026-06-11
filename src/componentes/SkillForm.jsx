import { useState } from 'react'
import SkillCard from './SkillCard'

const NIVELES = ['Básico', 'Intermedio', 'Avanzado', 'Experto']

function SkillForm({ habilidades, onAgregar, onEliminar }) {
  const [nombre, setNombre] = useState('')
  const [nivel, setNivel] = useState('Básico')
  const [error, setError] = useState('')

  const handleAgregar = () => {
    if (!nombre.trim()) {
      setError('Campo obligatorio')
      return
    }
    if (nombre.trim().length > 40) {
      setError('Máximo 40 caracteres')
      return
    }
    if (habilidades.map(h => h.nombre.toLowerCase()).includes(nombre.trim().toLowerCase())) {
      setError('Esta habilidad ya fue agregada')
      return
    }
    onAgregar({ nombre: nombre.trim(), nivel })
    setNombre('')
    setNivel('Básico')
    setError('')
  }

  return (
    <div className="skill-form">
      <div>
        <label>Habilidad *</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => { setNombre(e.target.value); setError('') }}
          placeholder="Ej: React, Photoshop..."
        />
      </div>
      <div>
        <label>Nivel *</label>
        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
          {NIVELES.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <button type="button" className="btn-agregar" onClick={handleAgregar}>
        Agregar
      </button>
      {error && <span className="error">{error}</span>}
      <div className="skills-grid">
        {habilidades.map((h, i) => (
          <SkillCard key={i} habilidad={h} onEliminar={() => onEliminar(i)} />
        ))}
      </div>
    </div>
  )
}

export default SkillForm