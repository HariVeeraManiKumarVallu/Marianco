'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useCart } from './use-cart'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export function useCheckout() {
  const { items, clearCart } = useCart()

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const session = await response.json()
      if (!session?.id) throw new Error('Failed to create checkout session')

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (error) {
        throw error
      }

      // Clear cart after successful redirect
      clearCart()
    } catch (error) {
      console.error('Checkout error:', error)
      // Here you might want to show an error notification to the user
    }
  }

  return { handleCheckout }
}
