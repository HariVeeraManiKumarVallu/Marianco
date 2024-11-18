'use client'

import { GetInvolvedForm } from '@/components/forms/get-involved-form'
import { Icons } from '@/components/icons'
import TitleSection from '@/components/title-section'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import Link from 'next/link'

export default function GetInvolvedContent() {
  return (
    <div className="space-y-page">
      <TitleSection
        title="Join Our Fight Against Child Exploitation"
        description="Together, we can protect children and create a safer world. Every voice, every action counts."
        image={{ url: '/titleImg.png', altText: 'altText' }}
      />

      <section>
        <div className="container ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Become a Part of Our Mission
            </h2>
            <p>
              Whether you&apos;re looking to volunteer, sponsor, or advocate,
              your support makes a difference.
            </p>
          </div>
          <GetInvolvedForm />
        </div>
      </section>

      <section className="pb-section">
        <div className="container text-center p-8 rounded-xl bg-blue-50">
          <h3 className="mb-4">Every Action Makes a Difference</h3>
          <p className="mb-8">
            Join us in our mission to protect children and create a world free
            from exploitation.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={ROUTES.EVENTS}
              className={buttonVariants({
                variant: 'outline',
                className: 'group hover:bg-brand-white',
              })}
            >
              Learn More
              <Icons.arrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={ROUTES.DONATE} className={buttonVariants()}>
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
