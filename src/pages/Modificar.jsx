import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerCVPorId } from '../services/cvService';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

import '../styles/Modificar.css';

function Modificar() {

  const [idCV, setIdCV] = useState('');

  const navigate = useNavigate();

  const buscarCV = () => {

    const cv = obtenerCVPorId(idCV);

    if (!cv) {
      alert('No existe un CV con ese ID');
      return;
    }

    navigate(`/editar/${idCV}/datos`);
  };

  return (
    <>

      <section className="modificar-page">

        <div className="modificar-container">

          <h1>Modificar CV</h1>

          <p>
            Ingresa el ID del currículum que deseas modificar.
          </p>

          <input
            type="number"
            placeholder="ID del CV"
            value={idCV}
            onChange={(e) => setIdCV(e.target.value)}
          />

          <button onClick={buscarCV}>
            Buscar CV
          </button>

        </div>

      </section>
    </>
  );
}

export default Modificar;