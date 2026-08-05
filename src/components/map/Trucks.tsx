import { Marker, Tooltip } from 'react-leaflet'
import type { TruckState } from '../../types'
import { createTruckIcon } from '../../assets/truck'

interface TrucksProps {
  trucks: TruckState[]
}

export default function Trucks({ trucks }: TrucksProps) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'FINISHED':
        return '#10b981' // green
      case 'MOVING':
        return '#3b82f6' // blue
      case 'ERROR':
        return '#ef4444' // red
      default:
        return '#6b7280' // gray
    }
  }

  return (
    <>
      {trucks.map((truck) => (
        <Marker
          key={truck.id}
          position={[truck.lat, truck.lng]}
          icon={createTruckIcon(getStatusColor(truck.status))}
        >
          <Tooltip>
            {truck.id} - {truck.speed.toFixed(1)} km/h - {truck.status}
          </Tooltip>
        </Marker>
      ))}
    </>
  )
}
