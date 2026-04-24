import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Logement", href: "#logement" },
  { label: "Service", href: "#service" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground">T</span>
              </div>
              <span className="text-xl font-semibold">TuniStay</span>
            </div>
            <p className="text-black/80 text-sm leading-relaxed">
              La première plateforme de réservation de logements dédiée à la Tunisie. 
              Découvrez des propriétés uniques pour des séjours inoubliables.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Liens rapides
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-black/80 hover:text-black transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-black/80 font-medium">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@tunistay.tn</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-black/80 font-medium">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+216 71 123 456</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-black/80 font-medium">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Rue du Lac, Les Berges du Lac, Tunis, Tunisie</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 hover:bg-black hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-center text-sm font-medium text-black/70">
            © {new Date().getFullYear()} TuniStay. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
