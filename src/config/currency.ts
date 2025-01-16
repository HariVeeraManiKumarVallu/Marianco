export const AVAILABLE_CURRENCIES = Object.freeze({
  SEK: { title: 'SEK', label: '🇸🇪 SEK', symbol: 'kr', decimals: 2 },
  EUR: { title: 'EUR', label: '🇪🇺 EUR', symbol: '€', decimals: 2 },
  USD: { title: 'USD', label: '🇺🇸 USD', symbol: '$', decimals: 2 }
} as const)

export const availableCurrencyCodes = [AVAILABLE_CURRENCIES.SEK.title, AVAILABLE_CURRENCIES.EUR.title, AVAILABLE_CURRENCIES.USD.title] as const
