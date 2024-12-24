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
  supplierProductId: string
  title: string
  description: string
  basePrice: number
  variants: Variant[]
  images: {
    src: string
    variantIds: number[]
    isDefault: boolean
  }[]
}

export type Variant = StrapiData & {
  variantId: number
  price: number
  isEnabled: boolean
  isDefault: boolean
  isAvailable: boolean
  quantity: number
  weight: number
  options: Option[]
}

export type Option = StrapiData & {
  optionId: string
  type: 'color' | 'size' | 'paper'
  title: string
  name: string
}
