import { useState, useEffect } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { guardarSeccion, actualizarCV, obtenerCVPorId } from '../services/cvService'
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
  const { id } = useParams()
  const { handleConfirmar } = useOutletContext() || {}
  const [form, setForm] = useState(estadoInicial)
  const [proyectos, setProyectos] = useState([])
  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (id) {
      const cv = obtenerCVPorId(id)
      if (cv?.proyectos) setProyectos(cv.proyectos)
    } else {
      const cvs = JSON.parse(localStorage.getItem("cvs")) || []
      const ultimoCV = cvs[cvs.length - 1]
      if (ultimoCV?.proyectos) setProyectos(ultimoCV.proyectos)
    }
  }, [id])

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
    setProyectos(proyectos.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!id && proyectos.length === 0) {
      setErrores({ nombre: 'Agrega al menos un proyecto' })
      return
    }

    if (id) {
      handleConfirmar(() => actualizarCV(id, { proyectos }))
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
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label>Descripción *</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
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
            <button type="button" className="btn-eliminar" onClick={() => eliminar(i)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button type="submit" className="btn-principal">
        {id ? 'Actualizar proyectos' : 'Guardar y continuar'}
      </button>
    </form>
  )
}

export default ProyectoForm