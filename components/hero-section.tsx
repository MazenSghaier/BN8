"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, MapPin, Calendar, Users, Search } from "lucide-react"
import Link from "next/link"

const suggestions = [
  "Villa avec piscine à Hammamet",
  "Appartement à Tunis centre",
  "Maison vue mer à Sousse",
  "Dar traditionnel à Sidi Bou Said",
  "Studio à La Marsa",
]

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchFocused && searchValue.length > 0) {
      setIsThinking(true)
      setShowSuggestions(false)
      const timer = setTimeout(() => {
        setIsThinking(false)
        setShowSuggestions(true)
      }, 800)
      return () => clearTimeout(timer)
    } else if (!isSearchFocused) {
      setShowSuggestions(false)
      setIsThinking(false)
    }
  }, [searchValue, isSearchFocused])

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(searchValue.toLowerCase())
  )

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
        {/* Animated heading */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          Trouvez votre séjour idéal en Tunisie
        </h1>
        
        <p 
          className={`mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-pretty ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}
        >
          Des logements uniques pour des expériences inoubliables
        </p>

        {/* AI Search Bar */}
        <div 
          className={`mt-10 ${mounted ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}
        >
          <div 
            className={`relative max-w-3xl mx-auto transition-all duration-500 ${
              isSearchFocused ? 'scale-105' : ''
            }`}
          >
            {/* AI Label */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/80 font-medium">Recherche intelligente</span>
            </div>

            {/* Search Container - Glassmorphism */}
            <div 
              className={`glass-dark rounded-full p-2 transition-all duration-300 ${
                isSearchFocused ? 'ring-2 ring-accent/50 shadow-2xl' : 'shadow-xl'
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Destination Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <MapPin className="h-5 w-5 text-accent shrink-0" />
                  <input
                    type="text"
                    placeholder="Où allez-vous ?"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none text-sm sm:text-base"
                  />
                </div>

                {/* Divider */}
                <div className="hidden sm:block h-8 w-px bg-white/20" />

                {/* Date */}
                <div className="hidden sm:flex items-center gap-3 px-4 py-3">
                  <Calendar className="h-5 w-5 text-white/60" />
                  <span className="text-white/60 text-sm">Quand ?</span>
                </div>

                {/* Divider */}
                <div className="hidden md:block h-8 w-px bg-white/20" />

                {/* Guests */}
                <div className="hidden md:flex items-center gap-3 px-4 py-3">
                  <Users className="h-5 w-5 text-white/60" />
                  <span className="text-white/60 text-sm">Invités</span>
                </div>

                {/* Search Button */}
                <Button
                  size="lg"
                  className="rounded-full bg-accent text-secondary hover:bg-accent/90 px-4 sm:px-6 h-12 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline ml-2">Rechercher</span>
                </Button>
              </div>
            </div>

            {/* AI Suggestions Dropdown */}
            {isSearchFocused && searchValue.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 glass-dark rounded-2xl overflow-hidden shadow-2xl z-50">
                {isThinking ? (
                  <div className="px-6 py-4 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full thinking-dot" />
                      <div className="w-2 h-2 bg-accent rounded-full thinking-dot" />
                      <div className="w-2 h-2 bg-accent rounded-full thinking-dot" />
                    </div>
                    <span className="text-white/60 text-sm">Recherche en cours...</span>
                  </div>
                ) : showSuggestions && filteredSuggestions.length > 0 ? (
                  <div className="py-2">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => setSearchValue(suggestion)}
                      >
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className={`mt-8 ${mounted ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
          <Link href="/locataire">
            <Button
              size="lg"
              className="bg-accent text-secondary hover:bg-accent/90 rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-glow"
            >
              Explorer les logements
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
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
