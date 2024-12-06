import ContentRenderer from '@/components/content-renderer'
import { formatDate } from '@/lib/formatters'
import { Article, ArticleResponse } from '@/types/article'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { testConfig } from '@/app/config'

// Destructure config values
export const { dynamic, revalidate } = testConfig

async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',  // Don't cache in development
      next: { revalidate: 0 }  // Don't revalidate in development
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch article')
  }

  const data: ArticleResponse = await res.json()
  return data.data[0]
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',  // Don't cache in development
      next: { revalidate: 0 }  // Don't revalidate in development
    }
  )

  const articles: ArticleResponse = await res.json()

  return articles.data.map(article => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const article = await getArticle(slug)

  if (!article) notFound()

  return (
    <article className="my-section">
      <div className="prose mx-auto prose-lg prose-img:rounded-lg">
        <h1>{article?.title}</h1>
        <p className="text-muted-foreground -mt-4">
          {formatDate(new Date(article.publishedDate))}
        </p>
        <div className="relative h-[400px] rounded-lg overflow-clip mb-8">
          {article?.image && (
            <Image
              src={article.image.formats?.large?.url || ''}
              alt={article.image.alternativeText || ''}
              fill
              className="rounded-lg"
            />
          )}
        </div>
        {article.content && <ContentRenderer content={article.content} />}
      </div>
    </article>
  )
}
