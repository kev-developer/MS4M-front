import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import type { LocationPoint, Route, TruckState } from '../../types'
import Routes from './Routes'
import Trucks from './Trucks'

// Configurar los íconos por defecto de Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapViewProps {
  routes: Route[]
  trucks: TruckState[]
  loads: LocationPoint[]
  dumps: LocationPoint[]
}

const CENTER: [number, number] = [-15.15, -75.74]

function MapBounds({ routes, loads, dumps }: { routes: Route[]; loads: LocationPoint[]; dumps: LocationPoint[] }) {
  const map = useMap()

  useEffect(() => {
    const allCoordinates: [number, number][] = []

    routes.forEach((route) => {
      allCoordinates.push(...route.points)
    })

    loads.forEach((load) => {
      allCoordinates.push(load.coor as [number, number])
    })

    dumps.forEach((dump) => {
      allCoordinates.push(dump.coor as [number, number])
    })

    if (allCoordinates.length > 0) {
      map.invalidateSize()
      const bounds = L.latLngBounds(allCoordinates)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [routes, loads, dumps, map])

  return null
}

export default function MapView({ routes, trucks, loads, dumps }: MapViewProps) {
  return (
    <MapContainer
      center={CENTER}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CartoDB</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
        minZoom={1}
      />
      <MapBounds routes={routes} loads={loads} dumps={dumps} />
      <Routes routes={routes} />
      {loads.map((load) => (
        <CircleMarker
          key={load.id}
          center={load.coor as [number, number]}
          radius={8}
          pathOptions={{ color: '#065f46', fillColor: '#10b981', fillOpacity: 1 }}
        >
          <Tooltip>{load.name}</Tooltip>
        </CircleMarker>
      ))}
      {dumps.map((dump) => (
        <CircleMarker
          key={dump.id}
          center={dump.coor as [number, number]}
          radius={8}
          pathOptions={{ color: '#dc2626', fillColor: '#ef4444', fillOpacity: 1 }}
        >
          <Tooltip>{dump.name}</Tooltip>
        </CircleMarker>
      ))}
      <Trucks trucks={trucks} />
    </MapContainer>
  )
}
