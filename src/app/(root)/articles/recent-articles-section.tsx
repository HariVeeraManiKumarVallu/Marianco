import {
  getNotFeaturedArticles,
  getRelatedArticles,
} from '@/lib/queries/strapi/article'
import { ArticleCard } from '../../../components/article-card'

export default async function RecentArticlesSection({ id }: { id?: string }) {
  const data = id
    ? await getRelatedArticles(id)
    : await getNotFeaturedArticles()

  return (
    <section className="py-section bg-beige flex-1 w-full">
      <div className="container">
        <h2 className="mb-8">Recent Articles</h2>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.data.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
