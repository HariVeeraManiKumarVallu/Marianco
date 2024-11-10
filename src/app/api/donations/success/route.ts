import stripe from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.nextUrl.searchParams.get('session_id') as string
    )
    // const customer = await stripe.customers.retrieve(session.id)
    const customerDetails = {
      name: session.customer_details?.name,
      email: session.customer_details?.email,
    }
    return NextResponse.json(customerDetails)
  } catch (error) {
    console.log({ error })
  }
}
