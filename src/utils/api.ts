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
