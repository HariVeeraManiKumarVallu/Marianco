import { DonationType } from "@/config/donations-options"
import { AvailableCurrency, CHECKOUT_TYPES } from "@/config/payment"
import { SPONSORSHIP_TIERS } from "@/config/sponsorship-tiers"
import { CartItem } from "@/store/cart-store"

type BaseCheckout = {
  currency: AvailableCurrency
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
  checkoutType: typeof CHECKOUT_TYPES.PURCHASE
  items: Omit<CartItem, 'price'>[]
}

export type CheckoutRequestBody = SponsorshipCheckout | DonationCheckout | StoreCheckout
