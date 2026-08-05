import type { SimulationReport } from '../../types'

interface ReportTableProps {
  report: SimulationReport | null
}

export default function ReportTable({ report }: ReportTableProps) {
  if (!report || report.metrics.length === 0) {
    return (
      <div className="empty">
        Aún no hay métricas. Cuando los camiones terminen verás acá el tiempo mínimo,
        máximo y promedio de cada uno.
      </div>
    )
  }

  return (
    <div className="data-card">
      <table className="table">
        <thead>
          <tr>
            <th>Camion</th>
            <th>Viajes</th>
            <th>Mín (s)</th>
            <th>Máx (s)</th>
            <th>Promedio</th>
          </tr>
        </thead>
        <tbody>
          {report.metrics.map((metric) => (
            <tr key={metric.id}>
              <td>{metric.id}</td>
              <td>{metric.count}</td>
              <td>{metric.min.toFixed(1)}</td>
              <td>{metric.max.toFixed(1)}</td>
              <td>{metric.avg.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
