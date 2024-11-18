export const AVAILABLE_CURRENCIES = ['SEK', 'EUR', 'USD'] as const
export type AvailableCurrency = (typeof AVAILABLE_CURRENCIES)[number]
