import { donationsConfig, DonationType } from '@/config/donations-options'
import stripe from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const reqHeaders = await headers()
    const { type, value }: { type: DonationType; value: string } =
      await req.json()

    const validatedAmount = donationsConfig[type].schema.parse(value)
    const paymentMode =
      type === 'monthly' || type === 'sponsorship' ? 'subscription' : 'payment'
    function createLineItem() {
      const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: type,
            description: donationsConfig[type].description,
          },
          unit_amount: Number(validatedAmount) * 100,
        },
        quantity: 1,
      }

      if (paymentMode === 'subscription') {
        lineItem.price_data!.recurring = {
          interval: 'month',
          interval_count: 1,
        }
      }

      return lineItem
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [createLineItem()],
      mode: paymentMode,

      success_url: `${reqHeaders.get('origin')}/donations/?success=true`,
      cancel_url: `${reqHeaders.get('origin')}/donations/?canceled=true`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.message || 'Failed to process payment' },
        { status: 500 }
      )
    }
  }
  return NextResponse.json(
    { error: 'Failed to process payment' },
    { status: 500 }
  )
}
