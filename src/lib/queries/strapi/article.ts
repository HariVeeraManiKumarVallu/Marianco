import { staticConfig } from '@/app/config'
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
        revalidate: staticConfig.revalidate,
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
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?filters[isFeatured][$eq]=true&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: staticConfig.revalidate,
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
        revalidate: staticConfig.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch articles')
  }

  const data: ArticleResponse = await res.json()

  return data
}
