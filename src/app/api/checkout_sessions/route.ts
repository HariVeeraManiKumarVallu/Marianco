import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { CheckoutRequestBody } from './types'
import { handleDonationCheckout, handleSponsorshipChekcout, handleStoreCheckout } from './controllers'
import { CHECKOUT_TYPES } from '@/config/payment'


export async function POST(req: Request) {
  try {
    const reqHeaders = await headers()
    const body: CheckoutRequestBody = await req.json()
    const reqOrigin = reqHeaders.get('origin')

    if (!reqOrigin) {
      return NextResponse.json({
        error: 'Unable to get request origin'
      }, { status: 500 })
    }

    switch (body.checkoutType) {
      case CHECKOUT_TYPES.SPONSORSHIP:
        return handleSponsorshipChekcout(body, reqOrigin)
      case CHECKOUT_TYPES.DONATION:
        return handleDonationCheckout(body, reqOrigin)
      case CHECKOUT_TYPES.PURCHASE:
        return handleStoreCheckout(body, reqOrigin)
      default:
        return NextResponse.json(
          { error: 'Invalid checkout type' },
          { status: 400 }
        )
    }


  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.message || 'Failed to process payment' },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: error.message || 'Failed to process payment' },
      { status: 500 }
    )
  }
}


