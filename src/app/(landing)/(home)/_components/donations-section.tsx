'use client'

import DonationOptions from '@/components/donation-options'
import { motion } from 'motion/react'

export default function DonationsSection() {
  return (
    <section className="bg-beige py-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container space-y-12"
      >
        <div className="space-y-4 text-center">
          <h2>Make a Difference Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your donation helps us protect vulnerable children and fight against
            exploitation. Every contribution, no matter how small, brings us
            closer to a world where every child is safe.
          </p>
        </div>
        <DonationOptions />
      </motion.div>
    </section>
  )
}
