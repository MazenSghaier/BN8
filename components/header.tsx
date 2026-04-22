"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Globe, DollarSign, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "Logement", href: "#logement" },
  { label: "Service", href: "#service" },
  { label: "Contact", href: "#contact" },
]

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

export function Header() {
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-primary">
                <span className="flex h-full w-full items-center justify-center text-xl font-bold text-primary-foreground">
                  T
                </span>
              </div>
              <span
                className={cn(
                  "text-xl font-semibold transition-colors",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                TuniStay
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                    isScrolled ? "text-foreground" : "text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side: Language, Currency, Sign In */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/10",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                <Globe size={16} />
                <span>{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
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
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/10",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                <DollarSign size={16} />
                <span>{selectedCurrency.code}</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
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

            {/* Sign In / Sign Out */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isScrolled
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <User size={16} />
                <span>{isSignedIn ? "Mon compte" : "Connexion"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
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
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col gap-2 rounded-xl bg-card p-4 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-border my-2 pt-2">
                {/* Mobile Language */}
                <div className="px-4 py-2">
                  <p className="text-xs text-muted-foreground mb-2">Langue</p>
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
                <div className="px-4 py-2">
                  <p className="text-xs text-muted-foreground mb-2">Devise</p>
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
                <button
                  onClick={() => {
                    setIsSignedIn(!isSignedIn)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full mt-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium"
                >
                  {isSignedIn ? "Deconnexion" : "Connexion"}
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
