import stripe from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Create Checkout Sessions from body params.
    const headersList = headers()
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    })
    NextResponse.redirect(303, session.url)
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { error: error.message || 'Failed to subscribe' },
        { status: 500 }
      )
  }
}

//   return NextResponse.json(
//     { message: 'Successfully subscribed' },
//     { status: 200 }
//   )
