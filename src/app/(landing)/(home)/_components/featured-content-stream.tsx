import { getFeaturedArticles } from '@/lib/queries/strapi/article'
import { getUpcomingEvents } from '@/lib/queries/strapi/event'
import FeaturedContentSection from './featured-content-section'

export default async function FeaturedContentStream() {
  const [featuredArticles, upcomingEvents] = await Promise.all([
    getFeaturedArticles(),
    getUpcomingEvents(),
  ])

  return (
    <FeaturedContentSection
      featuredArticles={featuredArticles.data}
      events={upcomingEvents.data}
    />
  )
}
