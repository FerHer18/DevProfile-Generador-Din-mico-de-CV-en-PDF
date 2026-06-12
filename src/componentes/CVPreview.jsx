import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generarPDF } from "../utils/pdfGenerator";
import { obtenerCVPorId } from "../services/cvService";
import SkillChart from "../componentes/SkillChart";

function CVPreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cv, setCv] = useState(null);

  useEffect(() => {
    if (id) {
      const cv = obtenerCVPorId(id)
      if (cv) setCv(cv)
      return
    }
    const cvs = JSON.parse(localStorage.getItem("cvs")) || [];
    if (cvs.length > 0) setCv(cvs[cvs.length - 1]);
  }, [id]);

  const handleExportar = async () => {
    await generarPDF(cv)
    navigate('/')
  }

  if (!cv) {
    return <div className="sin-cv">No existe información para mostrar.</div>;
  }

  return (
    <div className="cv-container">
      <header className="cv-header">
        <img src={cv.foto} alt={cv.nombre} className="cv-photo" />
        <div>
          <h1>{cv.nombre}</h1>
          <h3>{cv.profesion}</h3>
          <p>{cv.ciudad}</p>
        </div>
      </header>

      <section className="cv-section">
        <h2>Perfil Profesional</h2>
        <p>{cv.descripcion}</p>
      </section>

      <section className="cv-section">
        <h2>Contacto</h2>
        <p>{cv.correo}</p>
        <p>{cv.telefono}</p>
      </section>

      <section className="cv-section">
        <h2>Enlaces Profesionales</h2>
        {cv.enlaces?.map((link, index) => (
          <a key={index} href={link} target="_blank" rel="noreferrer">{link}</a>
        ))}
      </section>

      <section className="cv-section">
        <h2>Habilidades</h2>
        <div className="skills-grid">
          {cv.habilidades?.map((habilidad, index) => (
            <span key={index} className="skill-tag">
              {habilidad.nombre} — {habilidad.nivel}
            </span>
          ))}
        </div>
        <SkillChart habilidades={cv.habilidades} />
      </section>

      <section className="cv-section">
        <h2>Proyectos</h2>
        {cv.proyectos?.map((proyecto, index) => (
          <div className="project-card" key={index}>
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>Educación</h2>
        {cv.educacion?.map((edu, index) => (
          <div key={index}>
            <h3>{edu.institucion}</h3>
            <p>{edu.ingreso} - {edu.egreso}</p>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>Idiomas</h2>
        {cv.idiomas?.map((idioma, index) => (
          <div key={index}>
            <h3>{idioma.idioma}</h3>
            <p>{idioma.nivel}</p>
            <p>{idioma.descripcion}</p>
          </div>
        ))}
      </section>

      <div className="pdf-button-container">
        <button onClick={handleExportar}>Exportar PDF</button>
      </div>
    </div>
  );
}

export default CVPreview;