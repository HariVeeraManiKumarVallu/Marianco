import NewsletterSignup from '@/components/forms/newsletter-signup'
import { Metadata } from 'next'
import AboutSection from './_components/about-section'
import ArticlesWrapper from './_components/articles-wrapper'
import DonationsSection from './_components/donations-section'
import EventsWrapper from './_components/events-wrapper'
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <EventsWrapper />
      <ArticlesWrapper />
      <DonationsSection />
      <NewsletterSignup />
    </>
  )
}
