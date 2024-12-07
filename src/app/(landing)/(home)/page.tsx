import NewsletterSignup from '@/components/forms/newsletter-signup'
import { Metadata } from 'next'
import AboutSection from './_components/about-section'
import DonationsSection from './_components/donations-section'
import FeaturedContentSection from './_components/featured-content-section'
import HeroSection from './_components/hero-section'
import StatsSection from './_components/stats-section'

export const metadata: Metadata = {
  title: 'Marianco | Working to Protect Children',
  description:
    'Marianco is dedicated to protecting children from exploitation. Join our mission to create a safer world for every child.',
  openGraph: {
    title: 'Marianco | Working to Protect Children',
    description:
      'Marianco is dedicated to protecting children from exploitation. Join our mission to create a safer world for every child.',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedContentSection />
      <StatsSection />
      <DonationsSection />
      <NewsletterSignup />
    </>
  )
}
