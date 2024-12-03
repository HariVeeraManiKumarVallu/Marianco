'use client'
import { ROUTES } from '@/config/routes'
import { ArticleData } from '@/types/article'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedArticles({
  featuredArticles,
}: {
  featuredArticles: ArticleData[]
}) {
  if (!featuredArticles || featuredArticles.length === 0) {
    return null
  }

  return (
    <section className="flex-grow w-full my-section">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Featured Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link
              href={`${ROUTES.ARTICLES}/${featuredArticles[0].slug}`}
              className="group block"
            >
              <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src={featuredArticles[0].thumbnailUrl}
                  alt={featuredArticles[0].title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="inline-block bg-brand-blue-900 text-white px-3 py-1 rounded-full text-sm mb-4">
                    Featured
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    {featuredArticles[0].title}
                  </h2>
                  <p className="text-white/80 mb-4">
                    {featuredArticles[0].summary}
                  </p>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(
                      featuredArticles[0].publishedAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Secondary Featured Articles */}
          <div className="grid gap-8">
            {featuredArticles.slice(1, 3).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`${ROUTES.ARTICLES}/${article.slug}`}
                  className="group block"
                >
                  <div className="relative h-[280px] rounded-lg overflow-hidden">
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <span className="inline-block bg-brand-blue-900 text-white px-3 py-1 rounded-full text-sm mb-4">
                        Article
                      </span>
                      <h2 className="text-xl font-bold mb-2">
                        {article.title}
                      </h2>
                      <p className="text-white/80 mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
