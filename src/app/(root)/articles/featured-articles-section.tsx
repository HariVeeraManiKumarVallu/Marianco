'use client'
import { ROUTES } from '@/constants/routes'
import { formatDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { ArticleData } from '@/types/article'
import { motion } from 'motion/react'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FEATURED_GRID_POSITIONS } from '@/constants/articles'

export default function FeaturedArticlesSection({
  featuredArticles,
  className,
}: {
  featuredArticles: ArticleData[]
  className?: string
}) {
  if (!featuredArticles || featuredArticles.length === 0) {
    return null
  }

  return (
    <section className={cn('flex-grow w-full my-section', className)}>
      <div className="container mx-auto px-4">
        <div className={'grid gap-8 articles-grid'}
        >
          {featuredArticles.map((article, index) => {
            const isLeft = article.featuredGridPosition === FEATURED_GRID_POSITIONS.LEFT

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={
                  cn({
                    '[grid-area:left]': isLeft,
                    '[grid-area:top_right]': article.featuredGridPosition === FEATURED_GRID_POSITIONS.TOP_RIGHT,
                    '[grid-area:bottom_left]': article.featuredGridPosition === FEATURED_GRID_POSITIONS.BOTTOM_RIGHT,
                  })
                }
              >
                <Link
                  href={`${ROUTES.ARTICLES}/${article.slug}`}
                  className="group block"
                >
                  <div className={cn(
                    isLeft ? 'h-[400px] lg:h-[600px]' : 'h-[280px]',
                    "relative rounded-lg overflow-hidden")}>
                    <Image
                      src={article.image.formats?.medium?.url || article.image.url}
                      alt={article.image.alternativeText || ''}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <h2 className={
                        cn(
                          isLeft ? 'text-2xl lg:text-3xl' : 'text-xl',
                          "font-bold mb-2")}
                      >
                        {article.title}
                      </h2>
                      <p className="text-white/80 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(new Date(article.publishedDate))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>)
          })}
        </div>
      </div>
    </section >
  )
}
