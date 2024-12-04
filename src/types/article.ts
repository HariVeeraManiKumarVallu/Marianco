import { type BlocksContent } from '@strapi/blocks-react-renderer'

type StrapiImageFormats = {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  createdAt: string
  ext: string
  formats: {
    thumbnail?: StrapiImageFormats
    small?: StrapiImageFormats
    medium?: StrapiImageFormats
    large?: StrapiImageFormats
  }
  hash: string
  height: number
  mime: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  publishedAt: string
  size: number
  updatedAt: string
  url: string
  width: number
}

type StrapiData<T> = {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
} & T

export type StrapiResponse<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type Article = {
  publishedDate: string
  title: string
  content: BlocksContent
  slug: string
  summary: string
  isFeatured: boolean
  image: StrapiImage
  isArchived: boolean
}

export type ArticleData = StrapiData<Article>
export type ArticleResponse = StrapiResponse<ArticleData>
// export type Article = ArticleResponse['data'][0];
