'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAtom } from 'jotai'
import { selectedCurrencyAtom } from '@/store/currency-atom'
import { AVAILABLE_CURRENCIES } from '@/constants/currency'
import { CurrencyCodes } from '@/types/currency'

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

  const handleCurrencyChange = (newCurrency: CurrencyCodes) => {
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
