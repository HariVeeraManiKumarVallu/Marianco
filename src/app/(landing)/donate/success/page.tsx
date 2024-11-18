import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import stripe from '@/services/stripe'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { session_id } = await searchParams
  const session = await stripe.checkout.sessions.retrieve(
    session_id as string,
    {
      expand: ['line_items'],
    }
  )
  const customer = {
    name: session.customer_details?.name,
    email: session.customer_details?.email,
  }

  if (!customer.email || !customer.name) {
    return (
      <>
        <h1>Something went wrong</h1>
        <Link
          href={ROUTES.HOME}
          className={buttonVariants({ className: 'w-full' })}
        >
          Back to Home
        </Link>
      </>
    )
  }

  const lineItem = session.line_items?.data[0]
  const amount = lineItem?.amount_total ? lineItem.amount_total / 100 : 0
  const currency = lineItem?.currency?.toUpperCase()
  const isRecurring = session.mode === 'subscription'

  return (
    <section className="flex-1 flex items-center justify-center my-48">
      <div className="max-w-md space-y-8 p-8 rounded-lg shadow mx-2">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thanks for your donation, {customer.name}!
          </h1>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold text-gray-900">
              {isRecurring ? 'Monthly' : 'One-time'} Donation
            </p>
            <p className="text-3xl font-bold text-brand-blue-900 mt-2">
              {currency} {amount}
            </p>
            {isRecurring && (
              <p className="text-sm text-gray-600 mt-1">per month</p>
            )}
          </div>
          <p className="text-gray-600">
            We&apos;ll send a confirmation email to {customer.email}
          </p>
        </div>
        <Link
          href={ROUTES.HOME}
          className={buttonVariants({ className: 'w-full' })}
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
