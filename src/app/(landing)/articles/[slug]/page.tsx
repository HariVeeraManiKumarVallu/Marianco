import ArticleRenderer from '@/components/article-renderer'
import { Article, ArticleResponse } from '@/types/article'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
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
    <div className="container mx-auto px-4 py-8">
      {article.featuredImgUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featuredImgUrl}`}
          alt={article.title}
          width={1200}
          height={600}
          className="rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <ArticleRenderer content={article.content} />
      {/* <BlocksRenderer content={article.content} /> */}
    </div>
  )
}
