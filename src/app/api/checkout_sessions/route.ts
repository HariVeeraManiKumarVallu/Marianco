import stripe from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const reqHeaders = await headers()
    // Create Checkout Sessions from body params.
    const body = await req.json()
    console.log(body)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: body.type,
            },
            unit_amount: (body.value as number) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${reqHeaders.get('origin')}/donations/?success=true`,
      cancel_url: `${reqHeaders.get('origin')}/donations/?canceled=true`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { error: error.message || 'Failed to process payment' },
        { status: 500 }
      )
  }
}
