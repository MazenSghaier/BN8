"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Home, ChevronRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [activeImageTenantIdx, setActiveImageTenantIdx] = useState(0)
  const [activeImageOwnerIdx, setActiveImageOwnerIdx] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const tenantImages = ["/images/property-2.jpg", "/images/property-3.jpg", "/images/property-1.jpg"]
  const ownerImages = ["/images/proprietaire-video.jpg", "/images/property-4.jpg", "/images/property-5.jpg"]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tenantIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const ownerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleTenantMouseEnter = () => {
    if (!tenantIntervalRef.current) {
      tenantIntervalRef.current = setInterval(() => {
        setActiveImageTenantIdx(prev => (prev + 1) % tenantImages.length)
      }, 1500)
    }
  }

  const handleTenantMouseLeave = () => {
    if (tenantIntervalRef.current) {
      clearInterval(tenantIntervalRef.current)
      tenantIntervalRef.current = null
    }
    setActiveImageTenantIdx(0)
  }

  const handleOwnerMouseEnter = () => {
    if (!ownerIntervalRef.current) {
      ownerIntervalRef.current = setInterval(() => {
        setActiveImageOwnerIdx(prev => (prev + 1) % ownerImages.length)
      }, 1500)
    }
  }

  const handleOwnerMouseLeave = () => {
    if (ownerIntervalRef.current) {
      clearInterval(ownerIntervalRef.current)
      ownerIntervalRef.current = null
    }
    setActiveImageOwnerIdx(0)
  }

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
      <div className="relative z-10 mx-auto w-full px-4 md:px-8 xl:px-16 text-center">
        {/* Main Hero Text */}
        <div className={`mb-4 flex justify-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
            LOCATION COURTE DURÉE EN TUNISIE
          </span>
        </div>

        <h1 
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          Trouvez votre séjour idéal<br />ou confiez-nous votre bien
        </h1>
        
        <p 
          className={`mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto text-pretty ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}
        >
          Des logements uniques pour des expériences inoubliables
          <br className="hidden md:block" />
          et un service de gestion complet pour les propriétaires.
        </p>

        {/* Choice Cards - Always visible */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[60rem] mx-auto mt-16 ${mounted ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
            {/* Tenant Card */}
            <Link
              href="/locataire"
              className="group h-full"
              onMouseEnter={handleTenantMouseEnter}
              onMouseLeave={handleTenantMouseLeave}
            >
              <div className="relative overflow-hidden rounded-3xl h-full flex shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {/* Left side - White background with text */}
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-2">
                      Je cherche
                      <br />
                      un logement
                    </h2>

                    <p className="text-foreground/70 text-sm mb-4">
                      Trouvez et réservez le logement parfait pour votre séjour.
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      <li className="flex items-center gap-2 text-foreground/80">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span className="text-sm">Large choix de logements</span>
                      </li>
                      <li className="flex items-center gap-2 text-foreground/80">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span className="text-sm">Réservation sécurisée</span>
                      </li>
                      <li className="flex items-center gap-2 text-foreground/80">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span className="text-sm">Prix transparents</span>
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full bg-accent text-secondary hover:bg-accent/90 rounded-full py-2.5 font-semibold group-hover:shadow-lg transition-all">
                    Rechercher un logement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Right side - Image carousel */}
                <div className="w-1/3 relative overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-all duration-700 ease-out"
                    style={{
                      backgroundImage: `url('${tenantImages[activeImageTenantIdx]}')`,
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
                </div>
              </div>
            </Link>

            {/* Owner Card */}
            <Link
              href="/proprietaire"
              className="group h-full"
              onMouseEnter={handleOwnerMouseEnter}
              onMouseLeave={handleOwnerMouseLeave}
            >
              <div className="relative overflow-hidden rounded-3xl h-full flex shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {/* Left side - Dark background with text */}
                <div className="flex-1 bg-secondary p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-accent/40 rounded-xl flex items-center justify-center mb-4">
                      <Home className="h-5 w-5 text-accent" />
                    </div>

                    <h2 className="text-xl font-bold text-secondary-foreground mb-2">
                      Je suis
                      <br />
                      propriétaire
                    </h2>

                    <p className="text-secondary-foreground/80 text-sm mb-4">
                      Confiez-nous votre bien, on s'occupe de tout.
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      <li className="flex items-center gap-2 text-secondary-foreground/90">
                        <Home className="h-4 w-4 text-accent" />
                        <span className="text-sm">Gestion complète A à Z</span>
                      </li>
                      <li className="flex items-center gap-2 text-secondary-foreground/90">
                        <Home className="h-4 w-4 text-accent" />
                        <span className="text-sm">Optimisation des revenus</span>
                      </li>
                      <li className="flex items-center gap-2 text-secondary-foreground/90">
                        <Home className="h-4 w-4 text-accent" />
                        <span className="text-sm">Accompagnement personnalisé</span>
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full bg-accent text-secondary hover:bg-accent/90 rounded-full py-3 font-semibold group-hover:shadow-lg transition-all">
                    Confier mon bien
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Right side - Image carousel */}
                <div className="w-1/3 relative overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-all duration-700 ease-out"
                    style={{
                      backgroundImage: `url('${ownerImages[activeImageOwnerIdx]}')`,
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
                </div>
              </div>
            </Link>
        </div>
      </div>
    </section>
  )
}
