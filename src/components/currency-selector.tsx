'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { localCurrencyAtom, selectedCurrencyAtom } from '@/store/currency-atom'
import { AvailableCurrency } from '@/types/currency'
import { AVAILABLE_CURRENCIES } from '@/config/currency'

const getDefaultCurrency = (countryCode: string): AvailableCurrency => {
  if (['US', 'CA'].includes(countryCode)) return 'USD'
  if (countryCode === 'SE') return 'SEK'
  return 'EUR'
}

type CurrencySelectorProps = {
  className?: string
}

export default function CurrencySelector({ className = '' }: CurrencySelectorProps) {
  const [currency, setCurrency] = useAtom(selectedCurrencyAtom)

  const handleCurrencyChange = (newCurrency: AvailableCurrency) => {
    setCurrency(newCurrency)
  }

  return (
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className={`w-24 ${className}`}>
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(AVAILABLE_CURRENCIES).map(currency => (
          <SelectItem key={currency.title} value={currency.title}>
            {currency.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
