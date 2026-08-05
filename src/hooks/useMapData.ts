import { useEffect, useState } from 'react'
import type { LocationPoint, MapData, Route } from '../types'
import { fetchMapData } from '../utils/api'

export function useMapData() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loads, setLoads] = useState<LocationPoint[]>([])
  const [dumps, setDumps] = useState<LocationPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    fetchMapData()
      .then((data: MapData) => {
        if (!active) return
        setRoutes(data.routes)
        setLoads(data.loads)
        setDumps(data.dumps)
        setLoading(false)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { routes, loads, dumps, loading, error }
}
