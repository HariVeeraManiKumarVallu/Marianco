import { STATIC_CONFIG } from '@/app/config'
import ContentRenderer from '@/components/content-renderer'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import { ShareButtons } from '@/components/share-buttons'
import { formatDate } from '@/lib/formatters'
import { getArticle } from '@/lib/queries/strapi/article'
import { ArticleResponse } from '@/types/article'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const { revalidate, dynamic } = STATIC_CONFIG

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  const data: ArticleResponse = await res.json()

  return data.data.map(article => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const article = await getArticle(slug)

  return {
    title: article.title,
    openGraph: {
      images: [article.image.formats?.large?.url || article.image.url],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug
  const article = await getArticle(slug)

  if (!article) notFound()

  return (
    <article className="my-section">
      <div className="prose mx-auto prose-lg prose-img:rounded-lg container">
        <h1>{article?.title}</h1>
        <p className="text-muted-foreground -mt-4">
          {formatDate(new Date(article.publishedDate))}
        </p>
        <ShareButtons title={article.title} summary={article.summary} />
        <div className="relative h-[400px] rounded-lg overflow-clip my-8">
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
        <div className=" mt-16">
          <ShareButtons
            title={article.title}
            summary={article.summary}
            className="mx-auto"
          />
        </div>
      </div>
      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </article>
  )
}
