import getStripe from '@/services/load-stripe'
import { Address, LineItem } from '@/types/checkout'


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


export async function getShippingCost(lineItems: LineItem[], address: Address) {
  const response = await fetch(`${process.env.PRINTIFY_BASE_URL}/shops/${process.env.PRINTIFY_SHOP_ID}/orders/shipping.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
    },
    body: JSON.stringify({
      line_items: lineItems,
      address_to: address
    })
  })

  if (!response.ok) {
    throw new Error(`Error while getting shipping cost! Status: ${response.status}`);
  }

  const shippingInfo = await response.json()

  return shippingInfo.standard

}
