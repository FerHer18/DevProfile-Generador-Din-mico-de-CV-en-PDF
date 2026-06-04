export const obtenerCVPorId = (id) => {
  const cvs = obtenerCVs();

  return cvs.find(
    cv => Number(cv.id) === Number(id)
  );
};

export const actualizarCV = (id, datos) => {
  const cvs = obtenerCVs();

  const cvsActualizados = cvs.map(cv =>
    Number(cv.id) === Number(id)
      ? { ...cv, ...datos }
      : cv
  );

  guardarCVs(cvsActualizados);
};