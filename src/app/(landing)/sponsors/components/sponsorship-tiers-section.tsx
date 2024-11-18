'use client'

import { AvailableCurrency } from '@/config/currencies'
import { useState } from 'react'
import Stripe from 'stripe'
import SponsorshipTier from './sponsorship-tier'
import CurrencySelector from '@/components/currency-selector'

export default function SponsorshipTiersSection({
  prices,
}: {
  prices: Stripe.Price[]
}) {
  const [currency, setCurrency] = useState<AvailableCurrency>('EUR')

  return (
    <section className="bg-beige py-section">
      <div className="container">
        <h2 className="mb-8 lg:mb-12">Corporate Sponsorship Tiers</h2>
        <div className="flex justify-end mb-6">
          <CurrencySelector onCurrencyChange={setCurrency} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {prices
            .sort((a, b) => a.unit_amount! - b.unit_amount!)
            .map(tier => (
              <SponsorshipTier
                key={tier.id}
                sponsorshipTier={tier}
                currency={currency}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
