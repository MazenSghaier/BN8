"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Globe, DollarSign, User, Search, Calendar, Users as UsersIcon, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const languages = [
  { code: "fr", label: "Francais" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
]

const currencies = [
  { code: "TND", symbol: "DT", label: "Dinar (TND)" },
  { code: "EUR", symbol: "€", label: "Euro (EUR)" },
  { code: "USD", symbol: "$", label: "Dollar (USD)" },
]

export function ListingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-[1000] transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-primary">
              <span className="flex h-full w-full items-center justify-center text-xl font-bold text-primary-foreground">
                T
              </span>
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:inline">
              TuniStay
            </span>
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-border hover:shadow-lg transition-all">
            <div className="flex-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                type="text"
                placeholder="Où allez-vous ?"
                className="border-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0"
              />
            </div>

            <div className="w-px h-5 bg-border" />

            <div className="flex items-center gap-2 min-w-max">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="date"
                className="border-0 bg-transparent text-sm focus:outline-none focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="w-px h-5 bg-border" />

            <div className="flex items-center gap-2 min-w-max">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="date"
                className="border-0 bg-transparent text-sm focus:outline-none focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="w-px h-5 bg-border" />

            <div className="flex items-center gap-2 min-w-max">
              <UsersIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <select className="border-0 bg-transparent text-sm focus:outline-none focus:ring-0 cursor-pointer">
                <option>Ajouter invités</option>
                <option>1 invité</option>
                <option>2 invités</option>
                <option>3 invités</option>
                <option>4+ invités</option>
              </select>
            </div>

            <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 w-9 p-0 shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Right: Language, Currency, Profile */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
                )}
              >
                <Globe size={16} />
                <span>{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang)}
                    className={cn(
                      "cursor-pointer",
                      selectedLanguage.code === lang.code && "bg-muted"
                    )}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
                )}
              >
                <DollarSign size={16} />
                <span>{selectedCurrency.code}</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency)}
                    className={cn(
                      "cursor-pointer",
                      selectedCurrency.code === currency.code && "bg-muted"
                    )}
                  >
                    <span className="w-6">{currency.symbol}</span>
                    {currency.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sign In / Account */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
              >
                <User size={16} />
                <span>{isSignedIn ? "Mon compte" : "Connexion"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isSignedIn ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer">
                      Mon profil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Mes reservations
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive"
                      onClick={() => setIsSignedIn(false)}
                    >
                      Deconnexion
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setIsSignedIn(true)}
                    >
                      Se connecter
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Creer un compte
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <div className="flex flex-col gap-2 rounded-xl bg-card p-3 shadow-lg">
              {/* Mobile search */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Destination</p>
                <Input placeholder="Où allez-vous ?" className="text-sm" />
              </div>

              {/* Mobile Language */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Langue</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang)}
                      className={cn(
                        "px-3 py-1 rounded text-sm",
                        selectedLanguage.code === lang.code
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Currency */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Devise</p>
                <div className="flex gap-2">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency)}
                      className={cn(
                        "px-3 py-1 rounded text-sm",
                        selectedCurrency.code === currency.code
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {currency.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Sign In */}
              <Button
                onClick={() => {
                  setIsSignedIn(!isSignedIn)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full mt-2 bg-secondary text-secondary-foreground"
              >
                {isSignedIn ? "Deconnexion" : "Connexion"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
