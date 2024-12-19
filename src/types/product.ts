import { StrapiData } from './strapi'

export type Category = {
  title: string
}

// export type Product = {
//   title: string
//   description: string
//   price: number
//   category: Category
//   images: StrapiImage[]
//   tags: string[]
//   product_category: StrapiData<Category>
// }

export type Product = StrapiData & {
  title: string
  description?: string
  mdDescription?: string
  longDescription?: string
  basePrice: number
  variants: {
    id: number
    price: number
    isEnabled: boolean
    isDefault: boolean
    isAvailable: boolean
    options: {
      type: string
      id: number
      name: string
      value: string
    }[]
  }[]
  images: {
    src: string
    variantIds: number[]
    is_default: boolean
  }[]
  supplierProductId: string
}
