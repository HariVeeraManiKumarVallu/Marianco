import ContentRenderer from '@/components/content-renderer'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import { ShareButtons } from '@/components/share-buttons'
import { STATIC_CONFIG } from '@/constants/cache'
import { formatDate } from '@/lib/formatters'
import { getArticle } from '@/lib/queries/strapi/article'
import type { ArticleListResponse } from '@/types/article'
import RecentArticlesSection from '../recent-articles-section'
import React from 'react';
import { notFound } from 'next/navigation';

/* using notFound from 'next/navigation' */

export const revalidate = 60
export const dynamic = 'force-static'

// Avoid failing builds if CMS is offline
export async function generateStaticParams() {
  try {
    return []
  } catch {
    return []
  }
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Record<string, any>> {
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
export default async function Page({ params }: { params: { slug: string } }) {
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
            <img
              src={a.image.formats?.large?.url || a.image.url}
              alt={a.image.alternativeText || ''}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              loading="eager"
            />
          )}
        </div>
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
