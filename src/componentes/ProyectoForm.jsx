import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSeccion } from '../services/cvService'
import { validarProyecto } from '../hooks/useFormValidation'
import { useCV } from '../context/CVContext'
import { guardarProyectos } from '../hooks/useLocalStorage'

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

  const [proyectos, setProyectos] = useState(() => {
    const cvs = JSON.parse(localStorage.getItem("cvs")) || []
    const ultimoCV = cvs[cvs.length - 1]
    return ultimoCV?.proyectos || []
  })

  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const agregar = () => {
    const e = validarProyecto(form)
    setErrores(e)
    if (Object.keys(e).length > 0) return

    const nuevos = [...proyectos, form]
    setProyectos(nuevos)
    guardarProyectos(form)

    setForm(estadoInicial)
  }

  const eliminar = (index) => {
    const nuevos = proyectos.filter((_, i) => i !== index)
    setProyectos(nuevos)
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
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Portfolio Web"
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label>Descripción *</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Ej: Aplicación web para mostrar mi portafolio personal con React"
        />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}
      </div>

      <div className="campo">
        <label>Tecnologías *</label>
        <input
          name="tecnologias"
          value={form.tecnologias}
          onChange={handleChange}
          placeholder="Ej: React, Node.js, MongoDB"
        />
        {errores.tecnologias && <span className="error">{errores.tecnologias}</span>}
      </div>

      <div className="campo">
        <label>URL Repositorio</label>
        <input
          name="urlRepo"
          value={form.urlRepo}
          onChange={handleChange}
          placeholder="Ej: https://github.com/usuario/proyecto"
        />
        {errores.urlRepo && <span className="error">{errores.urlRepo}</span>}
      </div>

      <div className="campo">
        <label>URL Deploy</label>
        <input
          name="urlDeploy"
          value={form.urlDeploy}
          onChange={handleChange}
          placeholder="Ej: https://mi-proyecto.netlify.app"
        />
        {errores.urlDeploy && <span className="error">{errores.urlDeploy}</span>}
      </div>

      <div className="campo">
        <label>URL Imagen</label>
        <input
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="Ej: https://imagen-del-proyecto.png"
        />
        {errores.imagen && <span className="error">{errores.imagen}</span>}
      </div>

      <button type="button" className="btn-agregar" onClick={agregar}>
        Agregar proyecto
      </button>

      <ul className="proyectos-lista">
        {proyectos.map((p, i) => (
          <li key={i}>
            {p.nombre}
            <button
              type="button"
              className="btn-eliminar"
              onClick={() => eliminar(i)}
            >
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