import { AvailableCurrency } from "@/config/payment"

export const formattedDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatters = {
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
  EUR: new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
  }),
  SEK: new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  }),
}

function getCurrencyFormatter(currency: AvailableCurrency, options?: { hideDecimals?: boolean }) {
  switch (currency) {
    case 'USD':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: options?.hideDecimals ? 0 : 2,
        maximumFractionDigits: options?.hideDecimals ? 0 : 2,
      })
    case 'EUR':
      return new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: options?.hideDecimals ? 0 : 2,
        maximumFractionDigits: options?.hideDecimals ? 0 : 2,
      })
    case 'SEK':
      return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        minimumFractionDigits: options?.hideDecimals ? 0 : 2,
        maximumFractionDigits: options?.hideDecimals ? 0 : 2,
      })
  }

}

// Get user's currency based on location
export const getUserCurrency = () => {
  // Get user's country from browser
  const userLanguage = navigator.language
  const userCountry = userLanguage.split('-')[1]?.toUpperCase()

  if (userCountry === 'SE') return 'SEK'
  if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(userCountry)) return 'EUR'
  return 'USD'
}

export function formatAmount(
  amount: number,
  currency: AvailableCurrency,
  options?: { hideDecimals?: boolean }
) {
  return getCurrencyFormatter(currency, options).format(amount)
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(time: string) {
  try {
    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(parseInt(hours, 10))
    date.setMinutes(parseInt(minutes, 10))

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  } catch {
    return 'Invalid time'
  }
}
