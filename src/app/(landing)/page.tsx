import NewsletterSignup from '@/components/forms/newsletter-signup'
import Hero from '@/components/hero'
import WorldMapHero from '@/components/world-map-hero'

export default function Home() {
  return (
    <section>
      <div className="container flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12">
        <WorldMapHero />
        <Hero />
      </div>
      <NewsletterSignup />
    </section>
  )
}
