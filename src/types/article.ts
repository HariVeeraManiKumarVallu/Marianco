import { type BlocksContent } from '@strapi/blocks-react-renderer'
import { StrapiData, StrapiImage, StrapiResponse } from './strapi'
import { GRID_POSITION_VALUES } from '@/constants/articles'

export type Article = {
  publishedDate: string
  title: string
  content: BlocksContent
  slug: string
  summary: string
  isFeatured: boolean
  image: StrapiImage
  isArchived: boolean
  featuredGridPosition: typeof GRID_POSITION_VALUES[number]
}

export type ArticleData = StrapiData<Article>
export type ArticleResponse = StrapiResponse<ArticleData>
export type ArticleListResponse = StrapiResponse<ArticleData[]>

