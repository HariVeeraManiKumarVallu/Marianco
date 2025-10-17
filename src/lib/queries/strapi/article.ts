import { STATIC_CONFIG } from '@/constants/cache'
import qs from 'qs'

const API_BASE = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '')

type StrapiList<T> = { data: T[] }
interface ArticleEntity {
  id: number
  attributes: Record<string, any>
}

type ArticleListResponse = StrapiList<ArticleEntity>;

// Shared fetch helper (public, no auth header)
async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      next: { revalidate: 300 }
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

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
  return data.data[0] // Returns ArticleData[]

}

export async function getFeaturedArticles() {
  const query = qs.stringify({
    filters: { isFeatured: { $eq: true } },
    fields: ['title','summary','slug','isFeatured','featuredGridPosition','publishedDate'],
    populate: '*',
    sort: ['featuredGridPosition:asc','publishedDate:desc'],
    pagination: { pageSize: 20 }
  })
  const data = await safeFetch<StrapiList<ArticleEntity>>(`${API_BASE}/articles?${query}`)
  return data?.data || []
}

export async function getNotFeaturedArticles() {
  const query = qs.stringify({
    filters: { isFeatured: { $eq: false } },
    fields: ['title','summary','slug','isFeatured','featuredGridPosition','publishedDate'],
    populate: '*',
    sort: ['publishedDate:desc'],
    pagination: { pageSize: 50 }
  })
  const data = await safeFetch<StrapiList<ArticleEntity>>(`${API_BASE}/articles?${query}`)
  return data?.data || []
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
 
  return data.data // Returns ArticleData[]

}
