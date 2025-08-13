'use client'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { formatDate } from '@/lib/formatters'
import { ArticleData } from '@/types/article'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function RecentArticles({
  articles,
}: {
  articles: ArticleData[]
}) {
  return (
    <section>
      <div className="container py-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <h3 className=" mb-4">Featured Articles</h3>
          <p className="text-lg text-muted-foreground">
            Discover our latest insights, research, and stories about protecting
            children and creating lasting change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 ">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[400px] mx-auto"
            >
              <Link
                href={`${ROUTES.ARTICLES}/${article.slug}`}
                className="block"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image.url}
                    alt={article.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date(article.publishedDate))}
                  </p>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="pt-2 flex items-center text-primary font-medium">
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="grid lg:justify-center">
          <Link href={ROUTES.ARTICLES} className={buttonVariants()}>
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
