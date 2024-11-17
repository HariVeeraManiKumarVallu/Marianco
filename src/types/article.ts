import { type BlocksContent } from '@strapi/blocks-react-renderer'

// interface StrapiImage {
//   data: {
//     attributes: {
//       url: string;
//       formats: {
//         thumbnail: { url: string };
//         small: { url: string };
//         medium: { url: string };
//         large: { url: string };
//       };
//     };
//   };
// }

type StrapiData<T> = {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string & T
}

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
  featuredImgUrl: string
  thumbnailUrl: string
  isArchived: boolean
}

export type ArticleResponse = StrapiResponse<Article>
export type ArticleData = StrapiData<Article>
// export type Article = ArticleResponse['data'][0];
