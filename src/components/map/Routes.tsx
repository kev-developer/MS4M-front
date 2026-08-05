import { Polyline } from 'react-leaflet'
import type { Route } from '../../types'

interface RoutesProps {
  routes: Route[]
}

export default function Routes({ routes }: RoutesProps) {
  return (
    <>
      {routes.map((route) => (
        <Polyline
          key={route.id_trm_cs}
          positions={route.points as [number, number][]}
          pathOptions={{ color: route.color, weight: 4, opacity: 0.8 }}
        />
      ))}
    </>
  )
}
