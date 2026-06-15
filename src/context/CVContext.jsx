import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner'

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
    /*const confirmado = window.confirm('¿Seguro que deseas continuar?') //VALE
    if (confirmado) {
      guardarFn()
      if (onConfirm) onConfirm()
      return true
    }
    
    return false*/

    console.log('F. confirmarGuardado llamado')

    toast('¿Seguro que deseas continuar?', {
      action: {
        label: 'Sí, continuar',
        onClick: () => {
          console.log('G. usuario clickeó "Sí, continuar"')
          guardarFn()
          console.log('H. guardarFn ejecutado')
          if (onConfirm) onConfirm()
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {} //Cerrar el toast sin hacer nada
      },
      duration: 10000
    })
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