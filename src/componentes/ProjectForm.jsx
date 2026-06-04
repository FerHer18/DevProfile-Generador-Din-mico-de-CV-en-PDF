import { useState } from 'react'
import { validarProyecto } from '../hooks/useFormValidation'
import { guardarProyectos } from '../hooks/useLocalStorage'

const estructuraProyecto = {
    nombre: "",
    descripcion: "",
    tecnologias: "", 
    urlRepo: "",
    urlDeploy: "",
    imagen: "",
}

function ProjectForm({ proyectos = [], onGuardar }) {

    const [form, setForm] = useState(estructuraProyecto)
    const [errores, setErrores] = useState({})

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()

        const errores = validarProyecto(form)

        setErrores(errores)
        if (Object.keys(errores).length > 0) return

        guardarProyectos(form)
        setForm(estructuraProyecto)
        setErrores({})
    }

  return (
    <div className="project-form-container">
        <form className="project-form" onSubmit={handleSubmit}>
            <h3>Agregar proyecto</h3>

            <div>
                <label>Nombre del proyecto *</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} />
                {errores.nombre ? <span className="error">{errores.nombre}</span> : null}
            </div>

            <div>
                <label>Descripción *</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
                {errores.descripcion ? <span className="error">{errores.descripcion}</span> : null}
            </div>

            <div>
                <label>Tecnologías utilizadas * (ej: React, Node.js, CSS)</label>
                <input name="tecnologias" value={form.tecnologias} onChange={handleChange} />
                {errores.tecnologias ? <span className="error">{errores.tecnologias}</span> : null}
            </div>

            <div>
                <label>URL del repositorio (opcional)</label>
                <input name="urlRepo" value={form.urlRepo} onChange={handleChange} placeholder="https://github.com/..." />
                {errores.urlRepo ? <span className="error">{errores.urlRepo}</span> : null}
            </div>

            <div>
                <label>URL del deploy (opcional)</label>
                <input name="urlDeploy" value={form.urlDeploy} onChange={handleChange} placeholder="https://..." />
                {errores.urlDeploy ? <span className="error">{errores.urlDeploy}</span> : null}
            </div>

            <div>
                <label>URL de imagen representativa (opcional)</label>
                <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
                {errores.imagen ? <span className="error">{errores.imagen}</span> : null}
            </div>

            <button type="submit">Agregar</button>
        </form>

        <ul className="project-list">
            {proyectos.map((p, i) => (
                <li key={i}>
                    <strong>{p.nombre}</strong> — {p.tecnologias}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProjectForm