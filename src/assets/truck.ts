import * as L from 'leaflet'

export function createTruckIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: '',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    html: truckSvg(color),
  })
}

function truckSvg(color: string): string {
  return `<svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="13" height="10" fill="${color}" stroke="#000" stroke-width="1"/>
    <rect x="15" y="8" width="7" height="7" fill="#374151" stroke="#000" stroke-width="1"/>
    <circle cx="7" cy="17" r="2.2" fill="#1f2937" stroke="#000" stroke-width="0.5"/>
    <circle cx="17" cy="17" r="2.2" fill="#1f2937" stroke="#000" stroke-width="0.5"/>
  </svg>`
}
