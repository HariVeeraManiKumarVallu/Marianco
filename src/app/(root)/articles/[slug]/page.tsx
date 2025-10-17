import ContentRenderer from '@/components/content-renderer'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import { ShareButtons } from '@/components/share-buttons'
import { STATIC_CONFIG } from '@/constants/cache'
import { formatDate } from '@/lib/formatters'
import { getArticle } from '@/lib/queries/strapi/article'
import type { ArticleListResponse } from '@/types/article'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import RecentArticlesSection from '../recent-articles-section'

export const revalidate = STATIC_CONFIG?.revalidate ?? 60
export const dynamic = 'force-dynamic' as const

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    next: { revalidate },
  })
  const data: ArticleListResponse = await res.json()
  if (!data?.data) return []
  return data.data.map((article: ArticleListResponse['data'][number]) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug
  const article = await getArticle(slug)
  if (!article) return {}
  const a = article.attributes
  return {
    title: a.title,
    openGraph: {
      images: [a.image?.formats?.large?.url || a.image?.url].filter(Boolean) as string[],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const slug = params.slug
  const article = await getArticle(slug)
  if (!article) notFound()
  const a = article.attributes

  return (
    <div className="my-32 lg:my-section px-8">
      <section className="prose mx-auto lg:prose-lg prose-img:rounded-lg mb-16">
        <h1 className="text-pretty">{a.title}</h1>
        <p className="text-muted-foreground -mt-4">
          {a.publishedDate ? formatDate(new Date(a.publishedDate)) : null}
        </p>
        <ShareButtons title={a.title} summary={a.summary} />
        <div className="relative h-[400px] rounded-lg overflow-clip my-8">
          {a.image && (
            <Image
              src={a.image.formats?.large?.url || a.image.url}
              alt={a.image.alternativeText || ''}
              fill
              className="rounded-lg"
              priority
            />
          )}
        </div>
        {a.content && <ContentRenderer content={a.content} />}
        <div className="mt-16">
          <ShareButtons title={a.title} summary={a.summary} className="w-full" />
        </div>
      </section>
      <RecentArticlesSection id={article.id.toString()} />
      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  )
}
