import { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export function CVProvider({ children }) {
  const [cvData, setCvData] = useState({
    imagen: '',
    datos: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      linkedin: '',
      github: '',
      resumen: '',
    },
    habilidades: [],
    proyectos: [],
    educacion: [],
    idiomas: [],
  });

  const updateSection = (seccion, valor) => {
    setCvData(prev => ({ ...prev, [seccion]: valor }));
  };

  const resetCV = () => {
    setCvData({
      imagen: '',
      datos: { nombre: '', apellido: '', email: '', telefono: '', direccion: '', linkedin: '', github: '', resumen: '' },
      habilidades: [],
      proyectos: [],
      educacion: [],
      idiomas: [],
    });
  };

  const confirmarGuardado = (guardarFn, onConfirm) => {
    const confirmado = window.confirm('¿Seguro que deseas continuar?')
    if (confirmado) {
      guardarFn()
      if (onConfirm) onConfirm()
      return true
    }
    return false
  };

  return (
    <CVContext.Provider value={{ cvData, setCvData, updateSection, resetCV, confirmarGuardado }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  return useContext(CVContext);
}