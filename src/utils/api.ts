import type { MapData, SimulationReport, TruckState } from '../types'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchMapData(): Promise<MapData> {
  const response = await fetch(`${API_URL}/tramos`)
  if (!response.ok) {
    throw new Error(`Failed to fetch map data: ${response.statusText}`)
  }
  return response.json()
}

export async function startSimulation(): Promise<void> {
  const response = await fetch(`${API_URL}/simulacion/iniciar`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error(`Failed to start simulation: ${response.statusText}`)
  }
}

export async function stopSimulation(): Promise<void> {
  const response = await fetch(`${API_URL}/simulacion/detener`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error(`Failed to stop simulation: ${response.statusText}`)
  }
}

export async function fetchReport(): Promise<SimulationReport> {
  const response = await fetch(`${API_URL}/reporte`)
  if (!response.ok) {
    throw new Error(`Failed to fetch report: ${response.statusText}`)
  }
  return response.json()
}

export function subscribeToSimulation(onMessage: (trucks: TruckState[]) => void, onError: (error: Error) => void): () => void {
  const eventSource = new EventSource(`${API_URL}/simulacion/stream`)

  eventSource.addEventListener('message', (event) => {
    try {
      const trucks = JSON.parse(event.data)
      onMessage(trucks)
    } catch (error) {
      onError(new Error(`Failed to parse SSE data: ${error}`))
    }
  })

  eventSource.addEventListener('error', () => {
    onError(new Error('SSE connection failed'))
    eventSource.close()
  })

  return () => eventSource.close()
}

export interface SimulationConfig {
  time_multiplier?: number
  speed_min?: number
  speed_max?: number
}

export async function updateSimulationConfig(config: SimulationConfig): Promise<any> {
  const params = new URLSearchParams()
  if (config.time_multiplier !== undefined) params.append('time_multiplier', String(config.time_multiplier))
  if (config.speed_min !== undefined) params.append('speed_min', String(config.speed_min))
  if (config.speed_max !== undefined) params.append('speed_max', String(config.speed_max))

  const response = await fetch(`${API_URL}/simulacion/config`, {
    method: 'POST',
    body: params.toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  if (!response.ok) {
    throw new Error(`Failed to update config: ${response.statusText}`)
  }
  return response.json()
}
