import { SPONSORSHIP_TIERS } from "@/config/sponsorship-tiers"
import Stripe from "stripe"

export type SponsorshipTier = {
  title: string
  lookup_key: keyof typeof SPONSORSHIP_TIERS
  prices: Stripe.Price[]
  benefits: string[]
}
