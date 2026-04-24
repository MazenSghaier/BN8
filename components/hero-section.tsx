"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Home } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
          poster="/images/hero-villa.jpg"
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Main Hero Text */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          Trouvez votre séjour idéal
          <br />
          ou confiez-nous votre bien
        </h1>
        
        <p 
          className={`mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-pretty ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}
        >
          Des logements uniques et un service de gestion complet
        </p>

        {/* Single CTA Button - Shows initially */}
        {!showChoices && (
          <div className={`mt-10 transition-all duration-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Button
              onClick={() => setShowChoices(true)}
              size="lg"
              className="bg-accent text-secondary hover:bg-accent/90 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-glow"
            >
              Que voulez-vous faire ?
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Choice Cards - Revealed on button click */}
        {showChoices && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-10">
            {/* Tenant Card */}
            <Link
              href="/locataire"
              className="group animate-fade-in-up"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 text-left h-full">
                {/* Background icon */}
                <div className="absolute top-0 right-0 opacity-5 -mr-8 -mt-8">
                  <MapPin className="h-40 w-40" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <MapPin className="h-7 w-7 text-accent" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Je cherche un logement
                  </h2>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="text-accent font-bold mt-1">✓</span>
                      <span>Large choix de logements</span>
                    </li>
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="text-accent font-bold mt-1">✓</span>
                      <span>Réservation sécurisée</span>
                    </li>
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="text-accent font-bold mt-1">✓</span>
                      <span>Prix transparents</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-accent text-secondary hover:bg-accent/90 rounded-full py-2.5 font-semibold group-hover:shadow-lg transition-all">
                    Explorer les logements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>

            {/* Owner Card */}
            <Link
              href="/proprietaire"
              className="group animate-fade-in-up animation-delay-200"
            >
              <div className="relative overflow-hidden rounded-3xl bg-secondary/95 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 text-left h-full">
                {/* Background icon */}
                <div className="absolute top-0 right-0 opacity-5 -mr-8 -mt-8">
                  <Home className="h-40 w-40" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-accent/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/40 transition-colors">
                    <Home className="h-7 w-7 text-accent" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
                    Je suis propriétaire
                  </h2>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-secondary-foreground/80">
                      <span className="font-bold mt-1">✓</span>
                      <span>Gestion complète A à Z</span>
                    </li>
                    <li className="flex items-start gap-3 text-secondary-foreground/80">
                      <span className="font-bold mt-1">✓</span>
                      <span>Optimisation des revenus</span>
                    </li>
                    <li className="flex items-start gap-3 text-secondary-foreground/80">
                      <span className="font-bold mt-1">✓</span>
                      <span>Accompagnement personnalisé</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-accent text-secondary hover:bg-accent/90 rounded-full py-2.5 font-semibold group-hover:shadow-lg transition-all">
                    Confier mon bien
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      
    </section>
  )
}
