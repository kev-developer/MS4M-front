import { useEffect } from 'react'
import ControlPanel from './components/dashboard/ControlPanel'
import Legend from './components/dashboard/Legend'
import MapView from './components/map/MapView'
import HeuristicText from './components/reports/HeuristicText'
import ReportTable from './components/reports/ReportTable'
import ErrorScreen from './components/ErrorScreen'
import LoadingScreen from './components/LoadingScreen'
import { useMapData } from './hooks/useMapData'
import { useSimulation } from './hooks/useSimulation'
import { useSSE } from './hooks/useSSE'

export default function App() {
  const { routes, loads, dumps, loading, error: mapError } = useMapData()
  const { running, report, error: simError, start, stop, reset, setAllFinished } =
    useSimulation()
  const { trucks, allFinished } = useSSE(running)

  useEffect(() => {
    setAllFinished(allFinished)
  }, [allFinished, setAllFinished])

  if (mapError) {
    return <ErrorScreen message={mapError} />
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="app-shell">
      <main className="map-area">
        <MapView routes={routes} trucks={trucks} loads={loads} dumps={dumps} />
      </main>

      <aside className="side-panel">
        <header className="panel-header">
          <h1 className="panel-title">Flota de camiones</h1>
          <p className="panel-subtitle">Despacho y tiempos de viaje de la operación.</p>
        </header>

        <div className="panel-scroll">
          <ControlPanel running={running} onStart={start} onStop={stop} onReset={reset} />

          {simError && <div className="error-banner">{simError}</div>}

          <p className="status-pill">
            <span className={`status-dot${running ? ' status-dot--on' : ''}`} />
            {running ? 'Simulación en ejecución' : 'Simulación detenida'}
          </p>

          <h2 className="section-label">Leyenda</h2>
          <Legend routes={routes} loads={loads} dumps={dumps} />

          <h2 className="section-label">Velocidades en tiempo real</h2>
          <div className="truck-grid">
            {trucks.length === 0 ? (
              <div className="empty">
                Los camiones aparecerán acá al iniciar la simulación.
              </div>
            ) : (
              trucks.map((truck) => (
                <div key={truck.id} className="truck-chip">
                  <span className="truck-id">{truck.id}</span>
                  <span className={`status-tag status-tag--${truck.status}`}>
                    {truck.status}
                  </span>
                  <span className="truck-speed">{truck.speed.toFixed(1)} km/h</span>
                </div>
              ))
            )}
          </div>

          <h2 className="section-label">Métricas</h2>
          <ReportTable report={report} />

          <h2 className="section-label">Análisis</h2>
          <HeuristicText report={report} />
        </div>
      </aside>
    </div>
  )
}
