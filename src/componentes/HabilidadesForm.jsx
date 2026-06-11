import { useState, useEffect } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { guardarSeccion, actualizarCV, obtenerCVPorId } from '../services/cvService'
import { useCV } from '../context/CVContext'
import SkillForm from '../componentes/SkillForm'
import '../styles/Habilidades.css'

function HabilidadesForm() {
  const { confirmarGuardado } = useCV()
  const navigate = useNavigate()
  const { id } = useParams()
  const { handleConfirmar } = useOutletContext() || {}
  const [habilidades, setHabilidades] = useState([])

  useEffect(() => {
    if (id) {
      const cv = obtenerCVPorId(id)
      if (cv?.habilidades) setHabilidades(cv.habilidades)
    }
  }, [id])

  const agregar = (h) => setHabilidades([...habilidades, h])
  const eliminar = (i) => setHabilidades(habilidades.filter((_, idx) => idx !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!id && habilidades.length === 0) return

    if (id) {
      handleConfirmar(() => actualizarCV(id, { habilidades }))
      return
    }

    confirmarGuardado(
      () => guardarSeccion('habilidades', habilidades),
      () => navigate('../proyectos')
    )
  }

  return (
    <form className="habilidades-form" onSubmit={handleSubmit}>
      <SkillForm habilidades={habilidades} onAgregar={agregar} onEliminar={eliminar} />
      <button type="submit" className="btn-principal">
        {id ? 'Actualizar habilidades' : 'Guardar y continuar'}
      </button>
    </form>
  )
}

export default HabilidadesForm