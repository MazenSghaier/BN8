"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Star, MapPin, Users, Bed, Bath, Wifi, Wind, UtensilsCrossed, Eye, Waves, Zap, Tv, Home as HomeIcon, Lock, ChevronLeft, ChevronRight, Share2, Flag, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { ListingHeader } from "@/components/listing-header"
import dynamic from "next/dynamic"

const PropertyMapDetail = dynamic(() => import("@/components/property-map-detail"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted animate-pulse flex items-center justify-center">Chargement de la carte...</div>
})

const properties: Record<number, any> = {
  1: {
    id: 1,
    title: "Le prestige à La Marsa plage",
    location: "La Marsa, Tunis",
    price: 280,
    rating: 4.9,
    reviewCount: 32,
    beds: 2,
    bathrooms: 1,
    guests: 5,
    host: {
      name: "Ahmed",
      avatar: "/images/host-1.jpg",
      isSuperhost: true,
      memberSince: "mars 2020",
      responseTime: "1 heure",
      responseRate: "100%",
      bio: "Je serai ravi de vous accueillir et de vous faire découvrir la beauté de notre région. N'hésitez pas si vous avez des questions !",
    },
    images: [
      "/images/property-1.jpg",
      "/images/property-2.jpg",
      "/images/property-3.jpg",
      "/images/property-4.jpg",
      "/images/property-5.jpg",
      "/images/property-6.jpg",
    ],
    description: "Découvrez un séjour unique au cœur de La Marsa, dans un appartement raffiné mélangeant charme tunisien et confort moderne. Profitez d'une vue mer impénable, d'une terrasse ensoleillée et d'un intérieur décoré avec des matériaux locaux et l'artisanat traditionnel.",
    amenities: [
      { icon: Wifi, label: "Wi-Fi haut débit" },
      { icon: Wind, label: "Climatisation" },
      { icon: UtensilsCrossed, label: "Cuisine équipée" },
      { icon: Eye, label: "Vue sur mer" },
      { icon: Tv, label: "Télévision" },
      { icon: HomeIcon, label: "Patio traditionnel" },
      { icon: Waves, label: "Parking gratuit" },
      { icon: Lock, label: "Accès sécurisé" },
    ],
    mapCoordinates: [36.8789, 10.3247] as [number, number],
    reviews: [
      {
        id: 1,
        author: "Sophie",
        country: "France",
        rating: 5,
        date: "il y a 2 semaines",
        text: "Un séjour parfait ! L'appartement est exceptionnel en vrai, très propre et délicieusement situé en ville, très proche de la plage.",
        avatar: "/images/guest-1.jpg",
      },
      {
        id: 2,
        author: "Marc",
        country: "Belgique",
        rating: 5,
        date: "il y a 1 mois",
        text: "Magnifique hôte très accueillant et réactif. Je recommande vivement !",
        avatar: "/images/guest-2.jpg",
      },
      {
        id: 3,
        author: "Lina",
        country: "Allemagne",
        rating: 5,
        date: "il y a 2 mois",
        text: "Tout était parfait, merci ! C'est un endroit chaleureuse et les petites attentions.",
        avatar: "/images/guest-3.jpg",
      },
    ],
  },
  2: {
    id: 2,
    title: "Appartement Chic : Calme et Confort",
    location: "Gammarth, La Marsa",
    price: 180,
    rating: 4.9,
    reviewCount: 28,
    beds: 3,
    bathrooms: 2,
    guests: 5,
    host: {
      name: "Fatima",
      avatar: "/images/host-2.jpg",
      isSuperhost: true,
      memberSince: "janvier 2021",
      responseTime: "30 minutes",
      responseRate: "100%",
      bio: "Bienvenue dans mon bel appartement. Je suis disponible pour vous aider.",
    },
    images: [
      "/images/property-2.jpg",
      "/images/property-3.jpg",
      "/images/property-4.jpg",
      "/images/property-5.jpg",
      "/images/property-1.jpg",
      "/images/property-6.jpg",
    ],
    description: "Un appartement chic et confortable situé dans le quartier calme de Gammarth. Parfait pour les familles ou groupes d'amis.",
    amenities: [
      { icon: Wifi, label: "Wi-Fi haut débit" },
      { icon: Wind, label: "Climatisation" },
      { icon: UtensilsCrossed, label: "Cuisine équipée" },
      { icon: Eye, label: "Vue sur mer" },
      { icon: Tv, label: "Télévision" },
      { icon: Bath, label: "Baignoire" },
    ],
    mapCoordinates: [36.9111, 10.2883] as [number, number],
    reviews: [],
  },
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute top-6 left-6 z-50 text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <div className="relative w-[80%] h-[80%] flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={title}
            fill
            className="object-contain"
          />
          <button
            onClick={goToPrevious}
            className="absolute -left-16 z-50 text-white hover:bg-white/10 p-2 rounded-full cursor-pointer"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-16 z-50 text-white hover:bg-white/10 p-2 rounded-full cursor-pointer"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute -bottom-10 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted cursor-pointer" onClick={() => setIsExpanded(true)}>
        <Image
          src={images[currentIndex]}
          alt={title}
          fill
          className="object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            goToPrevious()
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-all z-10"
        >
          <ChevronLeft className="h-5 w-5 text-secondary" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            goToNext()
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-all z-10"
        >
          <ChevronRight className="h-5 w-5 text-secondary" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg",
              currentIndex === idx ? "ring-2 ring-primary" : ""
            )}
          >
            <Image
              src={img}
              alt={`${title} ${idx + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const property = properties[parseInt(id)]
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedDates, setSelectedDates] = useState({ arrival: "", departure: "" })

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Logement non trouvé</h1>
          <Link href="/locataire">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Retour aux logements
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <ListingHeader />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header with title and actions */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-2">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium text-secondary">{property.rating}</span>
                <span>({property.reviewCount} avis)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="rounded-full"
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Property Details */}
            <div className="mt-8 space-y-8">
              <div className="border-b border-border pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary">Appartement entier – Hôte : {property.host.name}</h2>
                    <p className="text-muted-foreground mt-1 flex flex-wrap gap-4">
                      <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.beds} lits</span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {property.guests} invités</span>
                      <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms} salle de bain</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-border pb-8">
                <h3 className="text-xl font-bold text-secondary mb-4">À propos de ce logement</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                <button className="mt-4 font-semibold text-primary hover:underline">Voir plus</button>
              </div>

              {/* Amenities */}
              <div className="border-b border-border pb-8">
                <h3 className="text-xl font-bold text-secondary mb-6">Équipements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {property.amenities.map((amenity, idx) => {
                    const Icon = amenity.icon
                    return (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <span className="text-sm text-muted-foreground">{amenity.label}</span>
                      </div>
                    )
                  })}
                </div>
                <button className="mt-6 font-semibold text-primary hover:underline">Voir tous les équipements</button>
              </div>

              {/* Location Map */}
              <div className="border-b border-border pb-8">
                <h3 className="text-xl font-bold text-secondary mb-4">Où vous dormez</h3>
                <p className="text-muted-foreground mb-4">{property.location}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Situé dans un quartier calme et résidentiel, à 5 minutes de la plage et proche de toutes les commodités.
                </p>
                <div className="relative z-0 h-[400px] rounded-xl overflow-hidden bg-muted">
                  <PropertyMapDetail coordinates={property.mapCoordinates} title={property.title} />
                </div>
                <Link href="#" className="mt-4 font-semibold text-primary hover:underline inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Voir dans Google Maps
                </Link>
              </div>

              {/* Host Info */}
              <div className="border-b border-border pb-8">
                <h3 className="text-xl font-bold text-secondary mb-6">À propos de l'hôte</h3>
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted shrink-0">
                    <Image
                      src={property.host.avatar}
                      alt={property.host.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-secondary">{property.host.name}</h4>
                    {property.host.isSuperhost && (
                      <p className="text-sm text-primary font-medium flex items-center gap-1">
                        ⭐ Superhôte
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">Membre depuis {property.host.memberSince}</p>
                    <p className="text-sm text-muted-foreground">{property.host.responseRate} d'évaluations</p>
                    <p className="text-sm text-muted-foreground">Délai de réponse en {property.host.responseTime}</p>
                    <p className="text-muted-foreground mt-3">{property.host.bio}</p>
                  </div>
                </div>
                <Button className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Contacter l'hôte
                </Button>
              </div>

              {/* Reviews */}
              {property.reviews.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-6">Ce que disent les voyageurs</h3>
                  <div className="space-y-6">
                    {property.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted shrink-0">
                            <Image
                              src={review.avatar}
                              alt={review.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-secondary">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.country}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-3 w-3",
                                      i < review.rating ? "fill-primary text-primary" : "text-border"
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-6 w-full rounded-lg">
                    Voir tous les avis ({property.reviewCount})
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-secondary">{property.price} TND</span>
                  <span className="text-muted-foreground">/ nuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < Math.floor(property.rating) ? "fill-primary text-primary" : "text-border"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-secondary">{property.rating}</span>
                  <span className="text-sm text-muted-foreground">({property.reviewCount} avis)</span>
                </div>
              </div>

              {/* Date Selectors */}
              <div className="mb-6 space-y-3 border-b border-border pb-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Arrivée</label>
                  <Input
                    type="date"
                    value={selectedDates.arrival}
                    onChange={(e) => setSelectedDates({ ...selectedDates, arrival: e.target.value })}
                    className="w-full rounded-lg bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Départ</label>
                  <Input
                    type="date"
                    value={selectedDates.departure}
                    onChange={(e) => setSelectedDates({ ...selectedDates, departure: e.target.value })}
                    className="w-full rounded-lg bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Invités</label>
                  <Input
                    type="number"
                    placeholder="Combien ?"
                    min="1"
                    max={property.guests}
                    className="w-full rounded-lg bg-background border-border"
                  />
                </div>
              </div>

              {/* Booking Button */}
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-bold py-3 mb-3 text-base">
                Réserver maintenant
              </Button>
              <p className="text-xs text-center text-muted-foreground">Vous ne serez pas encore débité</p>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary">Annulation gratuite</p>
                    <p className="text-xs text-muted-foreground">Jusqu'à 5 jours avant l'arrivée</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary">Réponse rapide de l'hôte</p>
                    <p className="text-xs text-muted-foreground">Répond en 1 heure en moyenne</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary">Paiement sécurisé</p>
                    <p className="text-xs text-muted-foreground">Vos informations sont protégées</p>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <Button variant="outline" className="w-full mt-6 rounded-lg border-border">
                💬 Contacter l'hôte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
