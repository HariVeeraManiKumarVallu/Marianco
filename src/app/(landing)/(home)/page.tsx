import NewsletterSignup from '@/components/forms/newsletter-signup'
import { getFeaturedArticles } from '@/lib/queries/strapi/article'
import { getUpcomingEvents } from '@/lib/queries/strapi/event'
import { Metadata } from 'next'
import AboutSection from './_components/about-section'
import DonationsSection from './_components/donations-section'
import FeaturedContentSection from './_components/featured-content-section'
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

export default async function Home() {
  const [featuredArticles, upcomingEvents] = await Promise.all([
    getFeaturedArticles(),
    getUpcomingEvents(),
  ])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedContentSection
        featuredArticles={featuredArticles.data}
        events={upcomingEvents.data}
      />
      <StatsSection />
      <DonationsSection />
      <NewsletterSignup />
    </>
  )
}
