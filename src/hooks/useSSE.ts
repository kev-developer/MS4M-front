import { useEffect, useRef, useState } from 'react'
import type { TruckState } from '../types'
import { subscribeToSimulation } from '../utils/api'

export function useSSE(running: boolean) {
  const [trucks, setTrucks] = useState<TruckState[]>([])
  const [allFinished, setAllFinished] = useState(false)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!running) {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
      return
    }

    unsubscribeRef.current = subscribeToSimulation(
      (newTrucks) => {
        setTrucks(newTrucks)
        const finished = newTrucks.every((truck) => truck.status === 'FINISHED')
        setAllFinished(finished)
      },
      (error) => {
        console.error('SSE error:', error)
      },
    )

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
    }
  }, [running])

  if (!running && trucks.length > 0) {
    setTrucks([])
  }

  return { trucks, allFinished }
}
