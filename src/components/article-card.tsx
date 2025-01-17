'use client'
import { formatDate } from '@/lib/formatters'
import { ArticleData } from '@/types/article'
import { motion } from 'motion/react'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ArticleCardProps {
  article: ArticleData
  index: number
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
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
            src={article.image.formats?.small?.url || article.image.url}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.summary}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(new Date(article.publishedDate))}
          </div>
        </div>
      </Link>
    </motion.li>
  )
}
