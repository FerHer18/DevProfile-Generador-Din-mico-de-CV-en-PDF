function SkillCard({ habilidad, onEliminar }) {
  return (
    <div className="skill-card">
      <span>{habilidad.nombre}</span>
      <span className="skill-nivel">{habilidad.nivel}</span>
      {onEliminar && (
        <button type="button" className="btn-eliminar" onClick={onEliminar}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SkillCard