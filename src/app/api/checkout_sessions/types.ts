import { CHECKOUT_TYPES } from "@/constants/checkout"
import { DonationType } from "@/constants/donations-options"
import { SPONSORSHIP_TIERS } from "@/constants/sponsorship-tiers"
import { CartItem } from "@/store/cart-store"
import { CurrencyCodes } from "@/types/currency"

type BaseCheckout = {
  currency: CurrencyCodes
}

export type SponsorshipCheckout = BaseCheckout & {
  checkoutType: typeof CHECKOUT_TYPES.SPONSORSHIP
  lookupKey: keyof typeof SPONSORSHIP_TIERS
}

export type DonationCheckout = BaseCheckout & {
  checkoutType: typeof CHECKOUT_TYPES.DONATION
  donationType: DonationType
  amount: string
}

export type StoreCheckout = BaseCheckout & {
  // checkoutType: typeof CHECKOUT_TYPES.PURCHASE
  items: Omit<CartItem, 'price'>[]
}


export type CheckoutRequestBody = SponsorshipCheckout | DonationCheckout | StoreCheckout
