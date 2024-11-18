'use client'

import { AVAILABLE_CURRENCIES, AvailableCurrency } from '@/config/currencies'
import { useEffect, useState } from 'react'
import Stripe from 'stripe'
import SponsorshipTier from './sponsorship-tier'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const getDefaultCurrency = (countryCode: string): AvailableCurrency => {
  if (['US', 'CA'].includes(countryCode)) return 'USD'
  if (countryCode === 'SE') return 'SEK'
  return 'EUR'
}

export default function SponsorshipTiersSection({
  prices,
}: {
  prices: Stripe.Price[]
}) {
  const [currency, setCurrency] = useState<AvailableCurrency>('EUR')

  useEffect(() => {
    const initCurrency = async () => {
      try {
        const savedCurrency = localStorage.getItem('preferredCurrency')
        if (
          savedCurrency &&
          AVAILABLE_CURRENCIES.includes(savedCurrency as AvailableCurrency)
        ) {
          setCurrency(savedCurrency as AvailableCurrency)
          return
        }

        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const userCountry = data.country_code

        const detectedCurrency = getDefaultCurrency(userCountry)
        setCurrency(detectedCurrency)
      } catch (error) {
        console.error('Error fetching location:', error)
        setCurrency('EUR')
      }
    }

    initCurrency()
  }, [])

  const handleCurrencyChange = (newCurrency: AvailableCurrency) => {
    setCurrency(newCurrency)
    localStorage.setItem('preferredCurrency', newCurrency)
  }

  return (
    <section className="bg-beige py-section">
      <div className="container">
        <h2 className="mb-8 lg:mb-12">Corporate Sponsorship Tiers</h2>
        <div className="flex justify-end mb-6">
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_CURRENCIES.map(curr => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
