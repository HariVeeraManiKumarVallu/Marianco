import stripe from '@/services/stripe'
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) return NextResponse.json({}, { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.environment === 'production' ? process.env.STRIPE_WEBHOOK_SECRET! : process.env.STRIPE_TEST_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  switch (event.type) {
    case 'checkout.session.completed':
      console.log(session)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders/${session.metadata?.orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            isPaid: session.payment_status === 'paid' ? true : false,
            //adress: addressString,
            phone: session?.customer_details?.phone || "",
          }
        })
      })

      console.log(response)
      break
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break
    default:
      console.log(`Unhandled event type ${event.type}.`)
  }

  return new Response(null, { status: 200 })
}
