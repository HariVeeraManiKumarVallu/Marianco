export const AVAILABLE_CURRENCIES = ['SEK', 'EUR', 'USD'] as const
export type AvailableCurrency = (typeof AVAILABLE_CURRENCIES)[number]
export const CHECKOUT_TYPES = {
  SPONSORSHIP: 'sponsorship',
  DONATION: 'donation',
  PURCHASE: 'purchase'
} as const
export type Checkout = typeof CHECKOUT_TYPES[keyof typeof CHECKOUT_TYPES] 
