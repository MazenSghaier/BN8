"use client"

import { Shield, Sparkles, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Confiance",
    description: "Des propriétaires vérifiés et des paiements sécurisés",
  },
  {
    icon: Sparkles,
    title: "Simplicité",
    description: "Une expérience de réservation fluide et intuitive",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Des outils modernes pour une gestion optimale",
  },
]

export function PhilosophySection() {
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

  return (
    <section ref={sectionRef} id="service" className="py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className={`text-sm font-medium text-accent uppercase tracking-wider ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          Notre vision
        </span>
        <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Notre Philosophie
        </h2>
        <p className={`mt-6 text-lg text-secondary-foreground/70 max-w-2xl mx-auto leading-relaxed text-pretty ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
          Nous croyons que chaque voyage mérite un logement d&apos;exception. Notre mission 
          est de rendre accessible le confort, l&apos;authenticité et la simplicité de la 
          réservation pour tous les voyageurs en Tunisie.
        </p>

        {/* Features */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-8 rounded-2xl bg-card shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${400 + index * 150}ms` }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-secondary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <feature.icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
