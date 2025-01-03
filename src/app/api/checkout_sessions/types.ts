import { DonationType } from "@/config/donations-options"
import { AvailableCurrency, CHECKOUT_TYPES } from "@/config/payment"

type BaseCheckout = {
  currency: AvailableCurrency
}

export type SponsorshipCheckout = BaseCheckout & {
  checkoutType: typeof CHECKOUT_TYPES.SPONSORSHIP
  priceId: string
  tierName: string
}

export type DonationCheckout = BaseCheckout & {
  checkoutType: typeof CHECKOUT_TYPES.DONATION
  donationType: DonationType
  amount: string
}

export type StoreCheckout = BaseCheckout & {
  checkoutType: typeof CHECKOUT_TYPES.PURCHASE
  supplierProductId: string
  variantId: string
}

export type CheckoutRequestBody = SponsorshipCheckout | DonationCheckout | StoreCheckout
