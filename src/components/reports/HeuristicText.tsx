import type { SimulationReport } from '../../types'

interface HeuristicTextProps {
  report: SimulationReport | null
}

export default function HeuristicText({ report }: HeuristicTextProps) {
  if (!report || report.metrics.length === 0) {
    return (
      <div className="empty">
        Todavía no hay datos para analizar. Deja correr la simulación hasta que todos
        los camiones terminen y acá aparecerá el resumen.
      </div>
    )
  }

  return <div className="callout">{report.explanation}</div>
}
