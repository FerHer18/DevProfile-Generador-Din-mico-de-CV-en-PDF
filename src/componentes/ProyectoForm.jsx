import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSeccion } from '../services/cvService'
import { validarProyecto } from '../hooks/useFormValidation'
import { useCV } from '../context/CVContext'

const estadoInicial = {
  nombre: '',
  descripcion: '',
  tecnologias: '',
  urlRepo: '',
  urlDeploy: '',
  imagen: ''
}

function ProyectoForm() {
  const { confirmarGuardado } = useCV()
  const navigate = useNavigate()
  const [form, setForm] = useState(estadoInicial)
  const [proyectos, setProyectos] = useState([])
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const agregar = () => {
    const e = validarProyecto(form)
    setErrores(e)
    if (Object.keys(e).length > 0) return
    setProyectos([...proyectos, form])
    setForm(estadoInicial)
  }

  const eliminar = (index) => {
    setProyectos(proyectos.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (proyectos.length === 0) {
      setErrores({ nombre: 'Agrega al menos un proyecto' })
      return
    }
    confirmarGuardado(
      () => guardarSeccion('proyectos', proyectos),
      () => navigate('../educacion')
    )
  }

  return (
    <form className="proyecto-form" onSubmit={handleSubmit}>
      <div className="campo">
        <label>Nombre del proyecto *</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Portfolio Web" />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>
      <div className="campo">
        <label>Descripción *</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe brevemente el proyecto..." />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}
      </div>
      <div className="campo">
        <label>Tecnologías *</label>
        <input name="tecnologias" value={form.tecnologias} onChange={handleChange} placeholder="Ej: React, Node.js, MongoDB" />
        {errores.tecnologias && <span className="error">{errores.tecnologias}</span>}
      </div>
      <div className="campo">
        <label>URL Repositorio (opcional)</label>
        <input name="urlRepo" value={form.urlRepo} onChange={handleChange} placeholder="https://github.com/..." />
        {errores.urlRepo && <span className="error">{errores.urlRepo}</span>}
      </div>
      <div className="campo">
        <label>URL Deploy (opcional)</label>
        <input name="urlDeploy" value={form.urlDeploy} onChange={handleChange} placeholder="https://..." />
        {errores.urlDeploy && <span className="error">{errores.urlDeploy}</span>}
      </div>
      <div className="campo">
        <label>URL Imagen (opcional)</label>
        <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
        {errores.imagen && <span className="error">{errores.imagen}</span>}
      </div>
      <button type="button" className="btn-agregar" onClick={agregar}>
        Agregar proyecto
      </button>
      <ul className="proyectos-lista">
        {proyectos.map((p, i) => (
          <li key={i}>
            {p.nombre}
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

export default ProyectoForm