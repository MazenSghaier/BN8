"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface PropertyMapDetailProps {
  coordinates: [number, number]
  title: string
}

export default function PropertyMapDetail({ coordinates, title }: PropertyMapDetailProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center bg-muted">
        <p className="text-muted-foreground">Chargement de la carte...</p>
      </div>
    )
  }

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  return (
    <MapContainer
      center={coordinates}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={customIcon}>
        <Popup>
          <div className="min-w-[200px] p-2">
            <h3 className="font-semibold text-secondary">{title}</h3>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
