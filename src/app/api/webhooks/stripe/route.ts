import stripe from '@/services/stripe'
import { NextRequest } from 'next/server'

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
const endpointSecret =
  'whsec_06be7f68004097bbe3389f7837e41e3670b1dbf0fbfd12c2c617dd5770a3a22f'

export async function POST(request: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get('stripe-signature') as string,
    endpointSecret!
  )

  console.log(event)

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break
    default:
      console.log(`Unhandled event type ${event.type}.`)
  }

  return new Response(null, { status: 200 })
}
