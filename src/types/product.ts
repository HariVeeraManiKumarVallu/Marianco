import { StrapiData } from './strapi'

export type Category = {
  title: string
}

export type Product = StrapiData & {
  supplierProductId: string
  title: string
  description: string
  basePrice: number
  variants: Variant[]
  images: ProductImage[]
}

export type Variant = StrapiData & {
  variantId: string
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

export type ProductImage = {
  src: string
  variantIds: number[]
  isDefault: boolean
}
