import { CHECKOUT_TYPES } from "@/constants/checkout";

export type Checkout = typeof CHECKOUT_TYPES[keyof typeof CHECKOUT_TYPES]

export type LineItem = {
  skuId: string
  skuDocumentId: string
  price: number
  quantity: number
}

export type Address = {
  country: string
  region: string
  adress1: string
  adress2: string | null
  city: string
  zip: string
}
