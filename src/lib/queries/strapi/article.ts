import { FEATURED_GRID_POSITIONS, GRID_POSITION_VALUES } from '@/constants/articles'
import { STATIC_CONFIG } from '@/constants/cache'
import { ArticleResponse, ArticleListResponse } from '@/types/article'
import qs from 'qs'

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

  const data: ArticleListResponse = await res.json()
  return data.data[0]
}

export async function getFeaturedArticles() {
  const query = qs.stringify({
    filters: {
      isFeatured: {
        $eq: true
      }
    },
    fields: ['title', 'summary', 'slug', 'isFeatured', 'featuredGridPosition', 'publishedDate'],
    populate: '*'
  })
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?${query}`,
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

  const data: ArticleListResponse = await res.json()

  return data
}

export async function getNotFeaturedArticles() {
  const query = qs.stringify({
    filters: {
      isFeatured: {
        $eq: false
      }
    },
    fields: ['title', 'summary', 'slug', 'isFeatured', 'featuredGridPosition', 'publishedDate'],
    populate: '*'
  })
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?${query}`,
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

  const data: ArticleListResponse = await res.json()

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

  const data: ArticleListResponse = await res.json()

  return data
}
