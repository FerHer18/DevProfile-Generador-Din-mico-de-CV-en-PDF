function IdiomasForm() {
  return (
    <div>
      <h2>Formulario de Idiomas</h2>

      <input
        type="text"
        placeholder="Idioma"
      />

      <select>
        <option>Básico</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>
    </div>
  )
}

export default IdiomasForm