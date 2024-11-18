'use client'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdditionalOptions() {
  return (
    <section className="pb-section bg-beige">
      <div className="container grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Icons.heart className="size-6 text-primary" />
            Foundation Partnerships
          </h2>
          <p className="text-gray-700 mb-4">
            We invite foundations to collaborate with us on special
            initiatives, such as funding the creation of new safe homes,
            expanding our advocacy work, or sponsoring research on child
            exploitation.
          </p>

          <Link
            href={ROUTES.SPONSORS}
            className={buttonVariants({
              variant: 'outline',
              className: 'group',
            })}
          >
            Learn More
            <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Icons.gift className="size-6 text-primary" />
            In-Kind Donations
          </h2>
          <p className="text-gray-700 mb-4">
            We gratefully accept in-kind donations that can help in our
            operations—legal services, technology, marketing, and more. Your
            company&apos;s expertise can help us extend our reach and impact.
          </p>
          <Link
            href={ROUTES.DONATE}
            className={buttonVariants({
              variant: 'outline',
              className: 'group',
            })}
          >
            Donate
            <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
