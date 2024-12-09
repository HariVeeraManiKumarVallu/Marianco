import NewsletterSignup from '@/components/forms/newsletter-signup'
import TitleSection from '@/components/title-section'
import { SOCIAL_LINKS } from '@/config/social-links'
import { getFeaturedArticles } from '@/lib/queries/strapi/article'
import { Metadata } from 'next'
import FeaturedArticlesSection from './featured-articles-section'
import RecentArticlesSection from './recent-articles-section'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Stay informed with the latest news, insights, and stories from Marianco. Read about our impact, child protection initiatives, and ways to make a difference.',
  openGraph: {
    title: 'Articles | Marianco',
    description:
      'Stay informed with the latest news, insights, and stories from Marianco. Read about our impact, child protection initiatives, and ways to make a difference.',
  },
}

export default async function ArticlesPage() {
  const data = await getFeaturedArticles()

  return (
    <div className="flex-1 flex flex-col">
      <TitleSection
        title="Latest Articles"
        description="Stay informed about our work and the latest developments in child protection."
        image={{ url: '/titleImg.png', altText: 'altText' }}
      />
      {data.data.length === 0 ? (
        <div className="container flex-1 flex flex-col items-center justify-center gap-4 ">
          <p className="text-center mt-48">
            No articles yet. Subscribe to our newsletter or follow us on social
            media to stay updated with the latest news.
          </p>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={social.label}
              >
                <social.icon className="size-5 fill-foreground hover:fill-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      ) : (
        <>
          <FeaturedArticlesSection featuredArticles={data.data} />

          <RecentArticlesSection
          // recentArticles={data.data.filter(article => !article.isFeatured)}
          />
        </>
      )}

      <NewsletterSignup />
    </div>
  )
}
