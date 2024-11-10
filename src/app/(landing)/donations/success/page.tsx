import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { session_id } = await searchParams
  const res = await fetch(
    `http://localhost:3000/api/donations/success?session_id=${session_id}`,
    {
      method: 'GET',
    }
  )
  const customer: { name: string; email: string } | undefined = await res.json()
  console.log(customer)
  if (!customer) {
    return (
      <>
        <h1>Something went wrong</h1>
      </>
    )
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thanks for your donation, {customer.name}!
          </h1>
          <p className="text-gray-600">
            We&apos;ll send a confirmation email to {customer.email}
          </p>
        </div>
        <Link href={'/'} className={buttonVariants({ className: 'w-full' })}>
          Back to Home
        </Link>
      </div>
    </section>
  )
}
