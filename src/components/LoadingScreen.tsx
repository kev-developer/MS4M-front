export default function LoadingScreen() {
  return (
    <div className="screen-center">
      <div className="loader-box">
        <div className="spinner" />
        <h1 className="loader-title">Cargando mapa…</h1>
        <p className="loader-sub">Conectando con el servidor de simulación.</p>
      </div>
    </div>
  )
}
