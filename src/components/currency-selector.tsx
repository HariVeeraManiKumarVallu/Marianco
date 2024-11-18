'use client'

import { AVAILABLE_CURRENCIES, AvailableCurrency } from '@/config/currencies'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

const getDefaultCurrency = (countryCode: string): AvailableCurrency => {
  if (['US', 'CA'].includes(countryCode)) return 'USD'
  if (countryCode === 'SE') return 'SEK'
  return 'EUR'
}

interface CurrencySelectorProps {
  onCurrencyChange: (currency: AvailableCurrency) => void
  className?: string
}

export default function CurrencySelector({ onCurrencyChange, className = '' }: CurrencySelectorProps) {
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
          onCurrencyChange(savedCurrency as AvailableCurrency)
          return
        }

        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const userCountry = data.country_code

        const detectedCurrency = getDefaultCurrency(userCountry)
        setCurrency(detectedCurrency)
        onCurrencyChange(detectedCurrency)
      } catch (error) {
        console.error('Error fetching location:', error)
        setCurrency('EUR')
        onCurrencyChange('EUR')
      }
    }

    initCurrency()
  }, [onCurrencyChange])

  const handleCurrencyChange = (newCurrency: AvailableCurrency) => {
    setCurrency(newCurrency)
    localStorage.setItem('preferredCurrency', newCurrency)
    onCurrencyChange(newCurrency)
  }

  return (
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className={`w-24 ${className}`}>
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
  )
}
