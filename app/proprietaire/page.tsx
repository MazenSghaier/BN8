"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Camera, Calendar, Users, Shield, TrendingUp, Headphones, Play, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const services = [
  {
    icon: Camera,
    title: "Photographie professionnelle",
    description: "Photos HD de votre propriété pour attirer plus de locataires",
  },
  {
    icon: Calendar,
    title: "Gestion des réservations",
    description: "Nous gérons votre calendrier et les demandes de réservation",
  },
  {
    icon: Users,
    title: "Accueil des locataires",
    description: "Check-in et check-out personnalisés pour vos invités",
  },
  {
    icon: Shield,
    title: "Assurance et sécurité",
    description: "Protection complète de votre bien pendant les locations",
  },
  {
    icon: TrendingUp,
    title: "Optimisation des revenus",
    description: "Stratégies de tarification pour maximiser vos gains",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Assistance continue pour vous et vos locataires",
  },
]

export default function ProprietairePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const whatsappMessage = `Bonjour, je suis ${formData.name}.%0A%0AType de propriété: ${formData.propertyType}%0A%0AMessage: ${formData.message}`
    const whatsappUrl = `https://wa.me/21612345678?text=${whatsappMessage}`
    
    window.open(whatsappUrl, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Retour</span>
          </Link>
          <Link href="/" className="text-2xl font-bold text-foreground">
            Tuni<span className="text-primary">Stay</span>
          </Link>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-balance">
            Devenez partenaire <span className="text-primary">TuniStay</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-foreground/80">
            Confiez-nous la gestion de votre propriété et profitez de revenus locatifs optimisés sans le stress
          </p>
        </div>
      </section>

      {/* Services and Video Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Services on the left */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Nos services pour les propriétaires
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video on the right */}
            <div className="flex items-center">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                {!isVideoPlaying ? (
                  <div className="relative aspect-video">
                    <Image
                      src="/images/proprietaire-video.jpg"
                      alt="Découvrez nos services"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110">
                        <Play className="h-8 w-8 ml-1" fill="currentColor" />
                      </div>
                    </button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-lg font-medium">
                        Découvrez comment nous gérons votre propriété
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <p className="text-secondary-foreground">
                      Vidéo en cours de lecture...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Contact Form */}
      <section className="bg-secondary/5 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-600 mb-4">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Contactez-nous via WhatsApp</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Parlons de votre projet
            </h2>
            <p className="mt-4 text-muted-foreground">
              Remplissez le formulaire ci-dessous et nous vous contacterons sur WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nom complet
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Numéro de téléphone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+216 XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="propertyType" className="text-sm font-medium text-foreground">
                Type de propriété
              </label>
              <Input
                id="propertyType"
                type="text"
                placeholder="Appartement, Villa, Maison..."
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                required
                className="bg-background"
              />
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Votre message
              </label>
              <Textarea
                id="message"
                placeholder="Décrivez votre propriété et vos attentes..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                required
                className="bg-background resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white"
            >
              <Send className="mr-2 h-5 w-5" />
              Envoyer via WhatsApp
            </Button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              En soumettant ce formulaire, vous serez redirigé vers WhatsApp pour continuer la conversation
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 TuniStay. Tous droits réservés.
          </p>
        </div>
      </footer>
    </main>
  )
}
