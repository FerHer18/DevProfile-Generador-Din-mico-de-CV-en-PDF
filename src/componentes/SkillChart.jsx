import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const NIVEL_VALOR = {
  'Básico': 25,
  'Intermedio': 50,
  'Avanzado': 75,
  'Experto': 100
}

function SkillChart({ habilidades }) {
  if (!habilidades || habilidades.length === 0) return null

  const data = habilidades.map(h => ({
    habilidad: h.nombre,
    nivel: NIVEL_VALOR[h.nivel] ?? 50
  }))

  return (
    <div className="skill-chart">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="habilidad" />
          <Tooltip />
          <Radar dataKey="nivel" stroke="#2d6a4f" fill="#2d6a4f" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SkillChart