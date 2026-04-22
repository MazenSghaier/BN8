import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { PhilosophySection } from "@/components/philosophy-section"
import { FloatingButtons } from "@/components/floating-buttons"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProperties />
        <PhilosophySection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
