import getStripe from '@/services/load-stripe'

const stripePromise = getStripe()

export async function handleStripeCheckoutSession<T>(data: T) {
  try {
    const stripe = await stripePromise
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!stripe) throw new Error('Stripe failed to initialize.')

    const { sessionId } = await response.json()
    const stripeError = await stripe.redirectToCheckout({ sessionId })

    if (stripeError) {
      console.error(stripeError)
    }

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }
  } catch (error) {
    console.error(error)
  }
}
