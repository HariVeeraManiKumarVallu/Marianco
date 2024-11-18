import { donationsConfig, DonationType } from '@/config/donations-options'
import stripe from '@/services/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const reqHeaders = await headers()
    const {
      type,
      value,
      priceId,
      currency,
      tierName,
    }: {
      type: DonationType | 'sponsorship'
      value?: string
      priceId?: string
      currency?: string
      tierName?: string
    } = await req.json()

    if (type === 'sponsorship' && priceId) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription' as Stripe.Checkout.SessionCreateParams.Mode,
        currency: currency as string,
        metadata: {
          tierName: tierName || null,
        },
        success_url: `${reqHeaders.get(
          'origin'
        )}/sponsors/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${reqHeaders.get('origin')}/sponsors?canceled=true`,
      } satisfies Stripe.Checkout.SessionCreateParams)

      return NextResponse.json({ sessionId: session.id })
    }

    const validatedAmount =
      donationsConfig[type as DonationType].schema.parse(value)
    const paymentMode =
      type === 'monthly' || type === 'sponsor' ? 'subscription' : 'payment'
    function createLineItem() {
      const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          currency: 'USD',
          product_data: {
            name: type,
            description: donationsConfig[type as DonationType].description,
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
      mode: paymentMode as Stripe.Checkout.SessionCreateParams.Mode,

      success_url: `${reqHeaders.get(
        'origin'
      )}/donations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${reqHeaders.get('origin')}/donations?canceled=true`,
    } satisfies Stripe.Checkout.SessionCreateParams)

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
