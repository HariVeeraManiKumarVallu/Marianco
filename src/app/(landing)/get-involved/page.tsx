import { JoinForm } from '@/components/forms/join-form'
import TitleSection from '@/components/title-section'
import { buttonVariants } from '@/components/ui/button'
import { HandHeart } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="space-y-36">
      <TitleSection
        title="Join Our Fight Against Child Exploitation"
        description="Together, we can protect children and create a safer world. Every voice, every action counts."
        image={{ url: '/titleImg.png', altText: 'altText' }}
      />

      <section>
        <div className="container">
          <div className="text-center mb-12">
            <HandHeart className="w-16 h-16 mx-auto mb-4 text-teal-500" />
            <h2 className="text-3xl font-bold mb-4">
              Become a Part of Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you&apos;re looking to volunteer, sponsor, or advocate,
              your support makes a difference.
            </p>
          </div>
          <JoinForm />
        </div>
      </section>

      <section className="">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Every Action Makes a Difference
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join us in our mission to protect children and create a world free
            from exploitation.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/get-involved/ways-to-give"
              className={buttonVariants({ variant: 'outline' })}
            >
              Learn More
            </Link>
            <Link href="/donations" className={buttonVariants()}>
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
