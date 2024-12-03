'use client'
import { ArticleData } from '@/types/article'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RecentArticles({
  recentArticles,
}: {
  recentArticles: ArticleData[]
}) {
  return (
    <section className="py-section bg-beige flex-1 w-full">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {recentArticles.map((article, index) => (
            <motion.li
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <Link href={`/articles/${article.slug}`} className="group">
                <div className="relative h-48">
                  <Image
                    src={article.thumbnailUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-brand-blue-900 text-white px-3 py-1 rounded-full text-sm mb-4">
                    category
                  </span>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.summary}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {/* {format(new Date(article.date), 'MMMM d, yyyy')} */}
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
