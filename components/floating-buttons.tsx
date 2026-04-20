"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, User, MessageCircleQuestion, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Comment réserver un logement ?",
    answer: "Parcourez nos logements, sélectionnez vos dates et procédez au paiement sécurisé. Vous recevrez une confirmation instantanée.",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes bancaires, les virements et les paiements en espèces à l'arrivée pour certains logements.",
  },
  {
    question: "Puis-je annuler ma réservation ?",
    answer: "Oui, les conditions d'annulation varient selon le logement. Consultez les détails avant de réserver.",
  },
  {
    question: "Comment devenir propriétaire partenaire ?",
    answer: "Cliquez sur le bouton 'Propriétaire' et remplissez le formulaire d'inscription. Notre équipe vous contactera rapidement.",
  },
]

export function FloatingButtons() {
  const [isFaqOpen, setIsFaqOpen] = useState(false)

  return (
    <>
      {/* Right side floating buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        <Link
          href="/proprietaire"
          className="group flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <Home className="h-5 w-5" />
          <span className="text-sm font-medium">Propriétaire</span>
        </Link>
        <Link
          href="/locataire"
          className="group flex items-center gap-3 rounded-full bg-card border border-border px-5 py-3 text-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:border-accent"
        >
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Locataire</span>
        </Link>
      </div>

      {/* Left side FAQ button */}
      <button
        onClick={() => setIsFaqOpen(true)}
        className="fixed bottom-8 left-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      >
        <MessageCircleQuestion className="h-6 w-6" />
      </button>

      {/* FAQ Modal */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFaqOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Questions fréquentes
              </h3>
              <button
                onClick={() => setIsFaqOpen(false)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              D&apos;autres questions ?{" "}
              <a href="#contact" className="text-accent hover:underline" onClick={() => setIsFaqOpen(false)}>
                Contactez-nous
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
