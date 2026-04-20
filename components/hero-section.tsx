import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-villa.jpg"
          alt="Beautiful Tunisian coastal villa"
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
          Trouvez votre séjour idéal en Tunisie
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-pretty">
          Des logements uniques pour des expériences inoubliables
        </p>
        <Button
          size="lg"
          className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          Explorer les logements
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-white/70 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
