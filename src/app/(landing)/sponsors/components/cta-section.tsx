'use client'

import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className=" text-center bg-blue-50 rounded-xl p-8 container"
      >
        <h2 className="mb-4">Ready to Make a Difference?</h2>
        <p className="text-gray-700 mb-6">
          Contact us to discuss partnership opportunities that align with your
          organization&apos;s values and goals.
        </p>
        <Link
          href={ROUTES.GET_INVOLVED}
          className={buttonVariants({ size: 'lg' })}
        >
          Start the Conversation
        </Link>
      </motion.div>
    </section>
  )
}
