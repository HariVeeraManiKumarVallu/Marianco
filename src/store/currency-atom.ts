import { AVAILABLE_CURRENCIES } from '@/constants/currency'
import { AvailableCurrency, currencySchema } from '@/types/currency'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

async function getUserCurrency() {
  const response = await fetch('https://ipapi.co/json/')
  const data = await response.json()
  return currencySchema.parse(data.currency)
}

export const selectedCurrencyAtom = atomWithStorage<AvailableCurrency | undefined>('selectedCurrency', undefined)

export const localCurrencyAtom = atom(null, async (get, set) => {
  const storedValue = get(selectedCurrencyAtom)
  if (!storedValue) {
    try {
      const userCurrency = await getUserCurrency()
      set(selectedCurrencyAtom, userCurrency)
      return
    } catch (error) {
      set(selectedCurrencyAtom, AVAILABLE_CURRENCIES.USD.title)
    }
  }
})

