import { StrapiData, StrapiImage } from './strapi'

export type Category = {
  title: string
}

export type Product = {
  title: string
  description: string
  price: number
  category: Category
  images: StrapiImage[]
  tags: string[]
  product_category: StrapiData<Category>
}
