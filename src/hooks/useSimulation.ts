import { useCallback, useEffect, useState } from 'react'
import type { SimulationReport } from '../types'
import { startSimulation, stopSimulation, fetchReport } from '../utils/api'

export function useSimulation() {
  const [running, setRunning] = useState(false)
  const [report, setReport] = useState<SimulationReport | null>(null)
  const [allFinished, setAllFinished] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = useCallback(async () => {
    try {
      setError(null)
      await startSimulation()
      setRunning(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start simulation')
    }
  }, [])

  const stop = useCallback(async () => {
    try {
      setError(null)
      await stopSimulation()
      setRunning(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop simulation')
    }
  }, [])

  const reset = useCallback(async () => {
    try {
      setError(null)
      await stopSimulation()
      setRunning(false)
      setReport(null)
      setAllFinished(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset simulation')
    }
  }, [])

  // Cargar reporte cuando todos los camiones terminan
  useEffect(() => {
    if (!allFinished) return

    let active = true
    fetchReport()
      .then((data) => {
        if (active) {
          setReport(data)
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to fetch report')
        }
      })

    return () => {
      active = false
    }
  }, [allFinished])

  return {
    running,
    report,
    error,
    start,
    stop,
    reset,
    setAllFinished,
  }
}
