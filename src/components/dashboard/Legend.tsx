import { useState } from 'react'
import type { ReactNode } from 'react'
import type { LocationPoint, Route } from '../../types'

interface LegendProps {
  routes: Route[]
  loads: LocationPoint[]
  dumps: LocationPoint[]
}

interface SectionProps {
  title: string
  count: number
  defaultOpen?: boolean
  children: ReactNode
}

function Section({ title, count, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`acc${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="acc-head"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="acc-head-label">{title}</span>
        <span className="acc-badge">{count}</span>
        <span className="acc-chev" aria-hidden="true" />
      </button>
      <div className="acc-body">
        <div className="acc-scroll">{children}</div>
      </div>
    </div>
  )
}

export default function Legend({ routes, loads, dumps }: LegendProps) {
  return (
    <div>
      <Section title="Rutas" count={routes.length} defaultOpen>
        {routes.map((route) => (
          <div key={route.id_trm_cs} className="legend-item legend-item--route">
            <span className="legend-swatch" style={{ backgroundColor: route.color }} />
            <span>{route.nombre_tramo}</span>
          </div>
        ))}
      </Section>

      <Section title="Cargas (palas)" count={loads.length}>
        {loads.map((load) => (
          <div key={load.id} className="legend-item legend-item--dot">
            <span className="legend-swatch" style={{ backgroundColor: '#10b981' }} />
            <span>{load.name}</span>
          </div>
        ))}
      </Section>

      <Section title="Botaderos (descargas)" count={dumps.length}>
        {dumps.map((dump) => (
          <div key={dump.id} className="legend-item legend-item--dot">
            <span className="legend-swatch" style={{ backgroundColor: '#ef4444' }} />
            <span>{dump.name}</span>
          </div>
        ))}
      </Section>
    </div>
  )
}
