'use client'

import { useState } from 'react'
import CurrencySelector from '@/components/currency-selector'
import { AvailableCurrency } from '@/config/payment'
import SponsorshipTierCard from './sponsorship-tier-card'
import { SponsorshipTier } from '@/types/donation'

export default function SponsorshipTiersSection({
  tiers,
}: {
  tiers: SponsorshipTier[]
}) {
  console.log(tiers)
  const [currency, setCurrency] = useState<AvailableCurrency>('EUR')
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    Object.fromEntries(prices.map(tier => [tier.lookup_key, false]))
  )

  const setTierLoading = (lookup_key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [lookup_key]: loading }))
  }

  return (
    <section className=" py-section">
      <div className="container">
        <h2 className="mb-8 lg:mb-12">Corporate Sponsorship Tiers</h2>
        <div className="flex justify-end mb-6">
          <CurrencySelector onCurrencyChange={setCurrency} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers
            .map(tier => (
              <SponsorshipTierCard
                key={tier.lookup_key}
                sponsorshipTier={tier}
                currency={currency}
                isLoading={loadingStates[tier.lookup_key!]}
                isAnyLoading={Object.values(loadingStates).some(Boolean)}
                setLoading={setTierLoading}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
