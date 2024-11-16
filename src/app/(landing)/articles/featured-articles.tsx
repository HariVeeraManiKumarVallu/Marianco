'use client'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedArticles({
  featuredArticles,
}: {
  featuredArticles: any
}) {
  return (
    <section>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Featured Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link
              href={`/articles/${featuredArticles[0].id}`}
              className="group"
            >
              <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src={featuredArticles[0].image}
                  alt={featuredArticles[0].title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                    {featuredArticles[0].category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    {featuredArticles[0].title}
                  </h2>
                  <p className="text-white/80 mb-4">
                    {featuredArticles[0].description}
                  </p>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {/* {format(
                        new Date(featuredArticles[0].date),
                        'MMMM d, yyyy'
                      )} */}
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Secondary Featured Articles */}
          <div className="grid gap-8">
            {featuredArticles.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/articles/${article.id}`} className="group">
                  <div className="relative h-[280px] rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                        {article.category}
                      </span>
                      <h2 className="text-xl font-bold mb-2">
                        {article.title}
                      </h2>
                      <p className="text-white/80 mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {/* {format(new Date(article.date), 'MMMM d, yyyy')} */}
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
