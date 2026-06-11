import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'

const NIVEL_VALOR = {
  'Básico': 25,
  'Intermedio': 50,
  'Avanzado': 75,
  'Experto': 100
}

function SkillChart({ habilidades }) {
  if (!habilidades || habilidades.length === 0) return null

  const data = habilidades.map(h => ({
    nombre: h.nombre,
    nivel: NIVEL_VALOR[h.nivel] ?? 50,
    etiqueta: h.nivel
  }))

  return (
    <div className="skill-chart" style={{ width: '100%', height: 40 * habilidades.length + 60 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="nombre" width={100} />
          <Tooltip formatter={(value, name, props) => [props.payload.etiqueta, 'Nivel']} />
          <Bar dataKey="nivel" radius={[0, 6, 6, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill="#2d6a4f" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SkillChart