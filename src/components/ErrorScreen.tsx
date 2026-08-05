interface ErrorScreenProps {
  message: string
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="screen-center">
      <div className="loader-box">
        <div className="error-mark">!</div>
        <h1 className="loader-title">No pudimos conectar con el servidor</h1>
        <p className="loader-sub">
          Revisa que el backend esté corriendo en http://localhost:8000 e intenta
          recargar la página.
        </p>
        <p className="error-detail">{message}</p>
      </div>
    </div>
  )
}
