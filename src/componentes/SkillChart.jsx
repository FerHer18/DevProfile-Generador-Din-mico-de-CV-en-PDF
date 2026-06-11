import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'

/*const NIVEL_VALOR = {
  'Básico': 25,
  'Intermedio': 50,
  'Avanzado': 75,
  'Experto': 100
}*/ // Ya no se usará esta constante, pero la dejo comentada por si acaso

function SkillChart({ habilidades }) {
  if (!habilidades || habilidades.length === 0) return null

  /*const data = habilidades.map(h => ({
    nombre: h.nombre,
    nivel: NIVEL_VALOR[h.nivel] ?? 50,
    etiqueta: h.nivel
  }))*/
  
  const data = [
    {
      categoria: 'Técnica',
      cantidad: habilidades.filter(h => h.categoria === 'Técnica').length,
    },
    {
      categoria: 'Blanda',
      cantidad: habilidades.filter(h => h.categoria === 'Blanda').length
    }
  ]

  return (
    <div className="skill-chart" style={{ width: '100%', height: 180, marginTop: '24px', marginBottom: '24px', padding: '16px' /* 40 * habilidades.length + 60 */ }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
          <XAxis type="number" /* domain={[0, 100]} hide */ />
          <YAxis type="category" dataKey="categoria" width={100} /* dataKey="nombre" width={100} */ />
          <Tooltip formatter={(value) => [value, 'Cantidad']} /*formatter={(value, name, props) => [props.payload.etiqueta, 'Nivel']} */ />
          <Bar dataKey="cantidad" radius={[0, 6, 6, 0]}>
            {data.map((item, index) => (
              <Cell
                key={index}
                fill={item.categoria === 'Técnica' ? '#3b82f6' : '#22c55e'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SkillChart