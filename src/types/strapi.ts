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

export interface StrapiImage {
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

export type StrapiData = {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type StrapiResponse<T> = {
  data: T
  meta: {
    pagination: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
}
