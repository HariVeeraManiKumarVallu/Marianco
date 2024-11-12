'use client'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import AboutSection from './about-section'
import HeroSection from './hero-section'
import StatsSection from './stats-section'
import WhatWeDoSection from './what-we-do'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <StatsSection />
      <NewsletterSignup />
    </>
  )
}
