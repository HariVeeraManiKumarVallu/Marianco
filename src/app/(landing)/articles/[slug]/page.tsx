import ArticleRenderer from '@/components/article-renderer'
import { formatDate } from '@/lib/formatters'
import { Article, ArticleResponse } from '@/types/article'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[slug][$eq]=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  )

  console.log(res)

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
  console.log(slug)
  const article = await getArticle(slug)

  console.log(article)
  if (!article) notFound()

  return (
    <article className="my-section">
      <div className="prose mx-auto prose-lg ">
        <h1>{article?.title}</h1>
        <p className="text-muted-foreground -mt-4">
          {formatDate(new Date(article.publishedDate))}
        </p>
        <div className="relative h-[400px] rounded-lg overflow-clip mb-8">
          {article?.featuredImageUrl && (
            <Image
              src={article.featuredImageUrl}
              alt={article.title}
              fill
              className="rounded-lg"
            />
          )}
        </div>
        <ArticleRenderer content={article.content} />
      </div>
    </article>
  )
}
