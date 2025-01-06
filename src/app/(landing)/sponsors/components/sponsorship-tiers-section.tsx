'use client'
import { useEffect, useRef, useState } from 'react'
import CurrencySelector from '@/components/currency-selector'
import { AvailableCurrency } from '@/config/payment'
import { SponsorshipTier } from '@/types/donation'
import SponsorshipTierCard from './sponsorship-tier-card'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SponsorshipTiersSection({
  tiers,
}: {
  tiers: SponsorshipTier[]
}) {
  const [currency, setCurrency] = useState<AvailableCurrency>('EUR')
  const [selectedTier, setSelectedTier] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const sectionRef = useRef<null | HTMLElement>(null)

  useEffect(() => {
    if (searchParams.get('canceled') && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
      const query = new URLSearchParams(searchParams)
      query.delete('canceled')
      router.replace(`${pathname}${query}`, { scroll: false })
    }
  }, [])


  return (
    <section ref={sectionRef} className="py-section">
      <div className="container">
        <h2 className="mb-8 lg:mb-12">Corporate Sponsorship Tiers</h2>
        <div className="flex justify-end mb-6">
          <CurrencySelector onCurrencyChange={setCurrency} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers
            .map(tier => (
              <SponsorshipTierCard
                key={tier.lookupKey}
                sponsorshipTier={tier}
                currency={currency}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
