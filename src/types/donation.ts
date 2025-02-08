import { SPONSORSHIP_TIERS } from "@/constants/sponsorship-tiers"
import Stripe from "stripe"

export type SponsorshipTier = {
  title: string
  lookupKey: keyof typeof SPONSORSHIP_TIERS
  currencyOptions: Record<string, Stripe.Price.CurrencyOptions>
  benefits: string[]
}

export type Sponsor = {
  name: string,
  url: string,
  imageUrl: string

}
