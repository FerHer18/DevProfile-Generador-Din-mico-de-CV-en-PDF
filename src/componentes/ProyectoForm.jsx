import '../styles/ProyectoForm.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import { guardarSeccion, actualizarCV, obtenerCVPorId } from '../services/cvService'
import { validarProyecto } from '../hooks/useFormValidation'
import { useCV } from '../context/CVContext'
import { guardarProyectos } from '../hooks/useLocalStorage'


const estadoInicial = {
  nombre: '',
  rol: '',
  descripcion: '',
  herramientas: '',
  resultado: '',
  url: '',
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
      const cvs = JSON.parse(localStorage.getItem('cvs')) || []
      const ultimoCV = cvs[cvs.length - 1]
      if (ultimoCV?.proyectos) setProyectos(ultimoCV.proyectos)
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const agregar = () => {
    const e = validarProyecto(form,proyectos)
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
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label>Tu rol *</label>
        <input
          name="rol"
          value={form.rol}
          onChange={handleChange}
          placeholder="Ej: Líder de proyecto, Diseñador, Colaborador, Freelance"
        />
        {errores.rol && <span className="error">{errores.rol}</span>}
      </div>

      <div className="campo">
        <label>Descripción *</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}
      </div>

      <div className="campo">
        <label>Resultado o logro</label>
        <input
          name="resultado"
          value={form.resultado}
          onChange={handleChange}
          placeholder="Ej: Aumenté ventas un 30%, entregado antes de deadline, 500 usuarios"
        />
        {errores.resultado && <span className="error">{errores.resultado}</span>}
      </div>

      <div className="campo">
        <label>Herramientas o habilidades usadas</label>
        <input
          name="herramientas"
          value={form.herramientas}
          onChange={handleChange}
          placeholder="Ej: Figma, Excel, Photoshop, React, AutoCAD..."
        />
        {errores.herramientas && <span className="error">{errores.herramientas}</span>}
      </div>

      <div className="campo">
        <label>Enlace del proyecto</label>
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="Ej: behance.net/proyecto, github.com/repo, drive.google.com/..."
        />
        {errores.url && <span className="error">{errores.url}</span>}
      </div>

      <button type="button" className="btn-agregar" onClick={agregar}>
        Agregar proyecto
      </button>

      <ul className="proyectos-lista">
        {proyectos.map((p, i) => (
          <li key={i}>
            <strong>{p.nombre}</strong> — {p.rol}
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