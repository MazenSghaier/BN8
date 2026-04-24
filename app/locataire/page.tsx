"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Search, SlidersHorizontal, Heart, Star, MapPin, Users, Bed, ChevronLeft, ChevronRight, X, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ListingHeader } from "@/components/listing-header"

// Dynamically import the map component to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import("@/components/property-map"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center">Chargement de la carte...</div>
})

const properties = [
  {
    id: 1,
    title: "Le prestige à La Marsa plage",
    location: "La Marsa",
    beds: 2,
    guests: 5,
    price: 280,
    rating: 5,
    isNew: false,
    images: ["/images/property-1.jpg"],
    coordinates: [36.8789, 10.3247] as [number, number],
  },
  {
    id: 2,
    title: "Appartement Chic : Calme et Confort",
    location: "Gammarth, La Marsa",
    beds: 3,
    guests: 5,
    price: 180,
    rating: 5,
    isNew: false,
    images: ["/images/property-2.jpg"],
    coordinates: [36.9111, 10.2883] as [number, number],
  },
  {
    id: 3,
    title: "Chic & Luxe - Quartier Diplomatique",
    location: "Les Berges Du Lac II",
    beds: 1,
    guests: 3,
    price: 220,
    rating: null,
    isNew: true,
    images: ["/images/property-3.jpg"],
    coordinates: [36.8353, 10.2336] as [number, number],
  },
  {
    id: 4,
    title: "Bel appartement neuf et lumineux",
    location: "Ain Zaghouane Nord",
    beds: 1,
    guests: 3,
    price: 170,
    rating: null,
    isNew: true,
    images: ["/images/property-4.jpg"],
    coordinates: [36.8019, 10.1358] as [number, number],
  },
  {
    id: 5,
    title: "Villa traditionnelle avec piscine",
    location: "Sidi Bou Said",
    beds: 4,
    guests: 8,
    price: 450,
    rating: 5,
    isNew: false,
    images: ["/images/property-5.jpg"],
    coordinates: [36.8687, 10.3417] as [number, number],
  },
  {
    id: 6,
    title: "Dar authentique au coeur de la Médina",
    location: "Médina de Tunis",
    beds: 2,
    guests: 4,
    price: 150,
    rating: 4,
    isNew: false,
    images: ["/images/property-6.jpg"],
    coordinates: [36.7992, 10.1706] as [number, number],
  },
  {
    id: 7,
    title: "Studio moderne vue mer",
    location: "Sousse",
    beds: 1,
    guests: 2,
    price: 120,
    rating: 4,
    isNew: true,
    images: ["/images/property-1.jpg"],
    coordinates: [35.8288, 10.6089] as [number, number],
  },
  {
    id: 8,
    title: "Penthouse luxueux avec terrasse",
    location: "Hammamet",
    beds: 3,
    guests: 6,
    price: 350,
    rating: 5,
    isNew: false,
    images: ["/images/property-2.jpg"],
    coordinates: [36.4000, 10.6167] as [number, number],
  },
]

function PropertyCard({ property, onFavorite, isFavorite }: { 
  property: typeof properties[0]
  onFavorite: (id: number) => void
  isFavorite: boolean 
}) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <Link href={`/property/${property.id}`}>
      <div className="group relative cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <Image
          src={property.images[currentImage]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => onFavorite(property.id)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-secondary")} />
        </button>

        {/* New Badge */}
        {property.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Nouveau
          </span>
        )}

        {/* Image Navigation Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all",
                  idx === currentImage ? "bg-white w-3" : "bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-secondary line-clamp-1">{property.title}</h3>
          {property.rating && (
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{property.location}</p>
        <p className="text-sm text-muted-foreground">
          {property.beds} lits • {property.guests} invités
        </p>
        <p className="font-semibold text-secondary">
          {property.price} TND <span className="font-normal text-muted-foreground">/ nuit</span>
        </p>
      </div>
      </div>
    </Link>
  )
}

export default function LocatairePage() {
  const [showMap, setShowMap] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ListingHeader />
      

      {/* Main Content */}
      <div className="relative">
        {/* Property Grid */}
        <div className={cn(
          "mx-auto max-w-7xl px-4 py-8 transition-all duration-300",
          showMap && "lg:mr-[50%] lg:max-w-none lg:pr-8"
        )}>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-secondary">{properties.length} logements</span> disponibles
            </p>
          </div>

          <div className={cn(
            "grid gap-6",
            showMap 
              ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavorite={toggleFavorite}
                isFavorite={favorites.includes(property.id)}
              />
            ))}
          </div>
        </div>

        {/* Map Panel */}
        <div className={cn(
          "fixed right-0 top-[137px] z-30 h-[calc(100vh-137px)] w-full bg-muted transition-transform duration-300 lg:w-1/2",
          showMap ? "translate-x-0" : "translate-x-full"
        )}>
          {showMap && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowMap(false)}
                className="absolute left-4 top-4 z-50 rounded-full bg-card shadow-lg"
              >
                <X className="h-5 w-5" />
              </Button>
              <PropertyMap properties={properties} />
            </>
          )}
        </div>
      </div>

      {/* Floating Map Toggle Button */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
        <Button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-secondary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          {showMap ? "Masquer la carte" : "Afficher la carte"}
          <Map className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
