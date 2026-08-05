interface ControlPanelProps {
  running: boolean
  onStart: () => void
  onStop: () => void
  onReset: () => void
}

export default function ControlPanel({ running, onStart, onStop, onReset }: ControlPanelProps) {
  return (
    <div className="controls">
      <button
        type="button"
        className="btn btn--primary btn--block"
        onClick={onStart}
        disabled={running}
      >
        {running ? 'Simulación en marcha' : 'Iniciar simulación'}
      </button>
      <div className="controls-row">
        <button type="button" className="btn btn--outline" onClick={onStop} disabled={!running}>
          Detener
        </button>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Reiniciar
        </button>
      </div>
    </div>
  )
}
