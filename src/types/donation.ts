import { SPONSORSHIP_TIERS } from "@/config/sponsorship-tiers"
import Stripe from "stripe"

export type SponsorshipTier = {
  title: string
  lookupKey: keyof typeof SPONSORSHIP_TIERS
  currencyOptions: { [key: string]: Stripe.Price.CurrencyOptions }
  benefits: string[]
}
