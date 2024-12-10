import { STATIC_CONFIG } from '@/config/cache'
import { ArticleResponse } from '@/types/article'

export async function getArticle(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch article')
  }

  const data: ArticleResponse = await res.json()
  return data.data[0]
}

export async function getFeaturedArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[isFeatured][$eq]=true&populate=*&pagination[limit]=3`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch articles')
  }

  const data: ArticleResponse = await res.json()

  return data
}

export async function getNotFeaturedArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[isFeatured][$eq]=false&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch articles')
  }

  const data: ArticleResponse = await res.json()

  return data
}

export async function getRelatedArticles(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[id][$ne]=${id}&limit=3&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch articles')
  }

  const data: ArticleResponse = await res.json()

  return data
}
