// Estructuras estáticas (GET /tramos)
export interface Route {
  id_trm_cs: number
  nombre_tramo: string
  color: string
  points: [number, number][] // Tuplas de [latitud, longitud]
}

export interface LocationPoint {
  id: number
  name: string
  coor: [number, number]
  radio: number | null
}

export interface MapData {
  routes: Route[]
  loads: LocationPoint[]
  dumps: LocationPoint[]
}

// Estructuras dinámicas (SSE - GET /simulacion/stream)
export interface TruckState {
  id: string // ej. "CAM-001"
  status: 'IDLE' | 'MOVING' | 'FINISHED' | 'ERROR'
  lat: number
  lng: number
  speed: number
}

// Estructuras de resultados (GET /reporte)
export interface TruckMetric {
  id: string
  count: number
  min: number
  max: number
  avg: number
}

export interface SimulationReport {
  metrics: TruckMetric[]
  explanation: string
}
