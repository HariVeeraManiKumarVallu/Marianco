'use client'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import AboutSection from './about-section'
import HeroSection from './hero-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <NewsletterSignup />
    </>
  )
}
