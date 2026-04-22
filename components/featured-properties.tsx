"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, MapPin, ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const properties = [
  {
    id: 1,
    title: "Le prestige à la Marsa plage",
    location: "La Marsa",
    image: "/images/property-1.jpg",
    beds: 2,
    guests: 5,
    price: 280,
    rating: 5,
    badge: "Recommandé",
  },
  {
    id: 2,
    title: "Appartement Chic : Calme et Confort",
    location: "Gammarth, La Marsa",
    image: "/images/property-2.jpg",
    beds: 3,
    guests: 5,
    price: 180,
    rating: 5,
    badge: "Populaire",
  },
  {
    id: 3,
    title: "Chic & Luxe – Quartier Diplomatique",
    location: "Les Berges Du Lac II",
    image: "/images/property-3.jpg",
    beds: 1,
    guests: 3,
    price: 220,
    rating: 4.8,
    badge: "Nouveau",
  },
  {
    id: 4,
    title: "Bel appartement neuf et lumineux",
    location: "Ain Zaghouane Nord",
    image: "/images/property-4.jpg",
    beds: 1,
    guests: 3,
    price: 170,
    rating: 4.9,
    badge: null,
  },
]

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Découvrir
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Logements populaires
            </h2>
          </div>
          <Link href="/locataire">
            <Button 
              variant="outline" 
              className="group rounded-full border-foreground/20 hover:border-accent hover:bg-accent hover:text-secondary transition-all"
            >
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={`group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                {property.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-secondary text-xs font-medium shadow-lg">
                    {property.badge}
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors ${
                      favorites.includes(property.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-foreground/70'
                    }`} 
                  />
                </button>

                {/* Hover CTA */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Button className="w-full bg-white/90 hover:bg-white text-foreground rounded-full shadow-lg">
                    Voir détails
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  {property.beds} lits • {property.guests} invités
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-lg font-bold text-foreground">{property.price} TND</span>
                  <span className="text-muted-foreground"> / nuit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
