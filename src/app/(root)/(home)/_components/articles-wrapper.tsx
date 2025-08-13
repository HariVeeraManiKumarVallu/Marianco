import { getFeaturedArticles } from '@/lib/queries/strapi/article'
import RecentArticles from './recent-articles'

export default async function ArticlesWrapper() {
  await new Promise(resolve => setTimeout(resolve, 4000))
  const data = await getFeaturedArticles()

  return <RecentArticles articles={data} />
}
