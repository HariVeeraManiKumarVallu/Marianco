import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import stripe from '@/services/stripe'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { session_id } = await searchParams
  const session = await stripe.checkout.sessions.retrieve(session_id as string)
  const customer = {
    name: session.customer_details?.name,
    email: session.customer_details?.email,
  }
  const tierName = session.metadata?.tierName

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
  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thanks for becoming a <span className="whitespace-nowrap">{tierName}&nbsp;Partner</span>, {customer.name}!
          </h1>
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
