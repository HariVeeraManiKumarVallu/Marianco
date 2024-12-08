import NewsletterSignup from '@/components/forms/newsletter-signup'
import { Metadata } from 'next'
import { Suspense } from 'react'
import AboutSection from './_components/about-section'
import DonationsSection from './_components/donations-section'
import FeaturedContentStream from './_components/featured-content-stream'
import HeroSection from './_components/hero-section'
import StatsSection from './_components/stats-section'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Marianco is a non-profit organization dedicated to protecting children from exploitation and creating lasting change.',
  openGraph: {
    title: 'Home | Marianco',
    description:
      'Marianco is a non-profit organization dedicated to protecting children from exploitation and creating lasting change.',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedContentStream />
      </Suspense>
      <StatsSection />
      <DonationsSection />
      <NewsletterSignup />
    </>
  )
}
