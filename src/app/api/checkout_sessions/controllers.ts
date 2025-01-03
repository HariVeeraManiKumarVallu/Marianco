import stripe from "@/services/stripe"
import Stripe from "stripe"
import { DonationCheckout, SponsorshipCheckout, StoreCheckout } from "./types"
import { ROUTES } from "@/config/routes"
import { NextResponse } from "next/server"
import { donationsConfig } from "@/config/donations-options"

export async function handleSponsorshipChekcout(body: SponsorshipCheckout, reqOrigin: string) {
  console.log(body)
  const { priceId, currency, tierName } = body

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription' as Stripe.Checkout.SessionCreateParams.Mode,
    currency,
    metadata: {
      tierName,
    },
    success_url: `${reqOrigin}/${ROUTES.SPONSORS
      }/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${reqOrigin}/${ROUTES.SPONSORS
      }?canceled=true`,
  } satisfies Stripe.Checkout.SessionCreateParams)

  return NextResponse.json({ sessionId: session.id })

}

export async function handleDonationCheckout(body: DonationCheckout, reqOrigin: string) {
  const { donationType, currency, amount } = body

  const donation = donationsConfig[donationType]
  const validatedAmount =
    donation.schema.parse(amount)
  const paymentMode =
    donationType === 'monthly' || donationType === 'sponsor' ? 'subscription' : 'payment'

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    price_data: {
      currency,
      product_data: {
        name: donation.title,
        description: donation.description,
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


  const session = await stripe.checkout.sessions.create({
    line_items: [lineItem],
    mode: paymentMode as Stripe.Checkout.SessionCreateParams.Mode,
    currency,
    success_url: `${reqOrigin}/${ROUTES.DONATE
      }/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${reqOrigin}/${ROUTES.DONATE}?canceled=true`,
  } satisfies Stripe.Checkout.SessionCreateParams)

  return NextResponse.json({ sessionId: session.id })
}



export async function handleStoreCheckout(body: StoreCheckout, reqOrigin: string) {
  const { type, priceId, currency, tierName } = body

  if (type === 'sponsorship' && priceId) {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription' as Stripe.Checkout.SessionCreateParams.Mode,
      currency,
      metadata: {
        tierName,
      },
      success_url: `${reqOrigin}/${ROUTES.SPONSORS
        }/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${reqOrigin}/${ROUTES.SPONSORS
        }?canceled=true`,
    } satisfies Stripe.Checkout.SessionCreateParams)

    return NextResponse.json({ sessionId: session.id })
  }
}
