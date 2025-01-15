export type Category = {
  title: string
}

export type Product = {
  productId: string
  title: string
  description: string
  basePrice: number
  optionTypes: OptionType[]
  optionValues: OptionValue[]
  skus: { skuId: string }[]
  variants: Variant[]
  images: ProductImage[]
}

export type Variant = {
  variantId: number
  price: number
  isEnabled: boolean
  isDefault: boolean
  isAvailable: boolean
  quantity: number
  weight: number
  skus: {
    skuId: string
  }[]
  options: Pick<OptionValue, 'optionId'>[]
}

export type OptionType = {
  type: 'color' | 'size' | 'paper'
  name: string
  optionValues: OptionValue[]
}

export type OptionValue = {
  optionId: number
  title: string
  previewUrl?: string
  optionType: OptionType[]
}

export type ProductImage = {
  src: string
  variantIds: number[]
  isDefault: boolean
}
