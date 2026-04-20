"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Property {
  id: number
  title: string
  location: string
  price: number
  coordinates: [number, number]
}

interface PropertyMapProps {
  properties: Property[]
}

// Custom marker icon with price
const createPriceIcon = (price: number, isActive: boolean = false) => {
  return L.divIcon({
    className: "custom-price-marker",
    html: `
      <div style="
        background-color: ${isActive ? "#000000" : "#FFFFFF"};
        color: ${isActive ? "#FFFFFF" : "#000000"};
        border: 2px solid #000000;
        border-radius: 20px;
        padding: 6px 12px;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        ${price} TND
      </div>
    `,
    iconSize: [80, 32],
    iconAnchor: [40, 16],
  })
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  const [mounted, setMounted] = useState(false)
  const [activeProperty, setActiveProperty] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p className="text-muted-foreground">Chargement de la carte...</p>
      </div>
    )
  }

  // Center on Tunisia
  const center: [number, number] = [36.8065, 10.1815]

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={property.coordinates}
          icon={createPriceIcon(property.price, activeProperty === property.id)}
          eventHandlers={{
            click: () => setActiveProperty(property.id),
            mouseover: () => setActiveProperty(property.id),
            mouseout: () => setActiveProperty(null),
          }}
        >
          <Popup>
            <div className="min-w-[200px] p-2">
              <h3 className="font-semibold text-secondary">{property.title}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="mt-2 font-bold text-primary">{property.price} TND / nuit</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
