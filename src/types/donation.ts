import { SPONSORSHIP_TIERS } from "@/constants/sponsorship-tiers"
import Stripe from "stripe"
import { StrapiImage } from "./strapi"

export type SponsorshipTier = {
  title: string
  lookupKey: keyof typeof SPONSORSHIP_TIERS
  currencyOptions: Record<string, Stripe.Price.CurrencyOptions>
  benefits: string[]
}

