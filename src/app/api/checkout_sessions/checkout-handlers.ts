import stripe from "@/services/stripe"
import Stripe from "stripe"
import { DonationCheckout, SponsorshipCheckout, StoreCheckout } from "./types"
import { ROUTES } from "@/constants/routes"
import { NextResponse } from "next/server"
import { donationsConfig } from "@/constants/donations-options"
import { Product } from "@/types/product"
import { StrapiData } from "@/types/strapi"
import { getProductSku } from "@/lib/queries/strapi/product"

export async function handleSponsorshipChekcout(body: SponsorshipCheckout, reqOrigin: string) {
  const { currency, lookupKey } = body
  const res = await stripe.prices.list({
    active: true,
    lookup_keys: [lookupKey],
    currency,
    expand: ['data.currency_options'],
  })

  const sponsorshipPriceList = res.data[0]

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: sponsorshipPriceList.id,
        quantity: 1,
      },
    ],
    mode: 'subscription' as Stripe.Checkout.SessionCreateParams.Mode,
    currency,
    metadata: {
      tierName: sponsorshipPriceList.nickname,
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
  const { currency, items } = body
  const updatedItems = await Promise.all(items.map(item => getProductSku(item.documentId, item.variantId, item.skuId)))
  const lineItems = updatedItems.map(item => ({
    price_data: {
      product_data: {
        name: item.title, images: [item.imageSrc],
      }, currency: currency.toLowerCase(), unit_amount: item.price,
    },
    quantity: items.find(i => i.skuId === item.skuId)?.quantity
  }))

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    currency,
    success_url: `${reqOrigin}/${ROUTES.STORE
      }/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${reqOrigin}/${ROUTES.STORE
      }?canceled=true`,
  } satisfies Stripe.Checkout.SessionCreateParams)

  return NextResponse.json({ sessionId: session.id })
}


//async function getLatestProductDetails(productId: string, variantId: number) {
//  const product = await getProduct(productId)
//  const { is_available, price } = product.variants.find(variant => variant.id === variantId)
//
//  const imgUrl = product.images.find(img => img.variant_ids.includes(variantId) && img.is_default)?.src
//
//  if (!is_available) return { error: { message: 'Out of stock' } }
//
//  return {
//    productId,
//    variantId,
//    title: product.title,
//    price,
//    imgUrl
//  }
//}

//async function getProduct(productId: string) {
//  const res = await fetch(`${process.env.PRINTIFY_API_BASE_URL}/shops/${process.env.PRINTIFY_SHOP_ID}/products/${productId}.json`,
//    {
//      headers: {
//        Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
//      }
//    }
//  )
//
//  const data = await res.json()
//  return data
//}
