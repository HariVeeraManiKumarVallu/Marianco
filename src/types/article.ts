import { type BlocksContent } from '@strapi/blocks-react-renderer'
import { StrapiData, StrapiImage, StrapiResponse } from './strapi'

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
