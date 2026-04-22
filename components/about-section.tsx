"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    { title: "Confiance", desc: "Des propriétés vérifiées et des avis authentiques" },
    { title: "Qualité", desc: "Une sélection rigoureuse pour votre confort" },
    { title: "Simplicité", desc: "Une réservation en quelques clics" },
  ]

  return (
    <section ref={sectionRef} id="logement" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                À propos
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Qui sommes-nous
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                TuniStay est la première plateforme de réservation de logements dédiée 
                exclusivement à la Tunisie. Nous connectons les voyageurs avec des 
                propriétés authentiques et soigneusement sélectionnées à travers tout le pays.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Nos valeurs</h3>
                <div className="grid gap-4">
                  {values.map((value, index) => (
                    <div 
                      key={value.title} 
                      className={`flex items-start gap-3 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                      style={{ animationDelay: `${400 + index * 150}ms` }}
                    >
                      <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <span className="font-medium text-foreground group-hover:text-accent transition-colors">{value.title}</span>
                        <span className="text-muted-foreground"> — {value.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Video Placeholder */}
          <div className={`relative ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/about-video-thumbnail.jpg"
                alt="Découvrez TuniStay"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              
              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-2xl animate-float">
                  <Play className="h-8 w-8 text-accent ml-1" fill="currentColor" />
                </div>
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-accent/20 -z-10 animate-pulse" />
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-secondary -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
