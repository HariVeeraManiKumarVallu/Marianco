'use client'

import { motion } from 'motion/react'

export default function Heading() {
  return (
    <section className="py-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container"
      >
        <h2 className=" mb-8">Why Partner with Marianco?</h2>
        <p className="max-w-prose">
          When you partner with Marianco, you become part of a global network
          dedicated to eradicating child exploitation. Your support will not
          only help children in immediate danger but will also ensure long-term
          solutions through prevention, education, and advocacy.
        </p>
      </motion.div>
    </section>
  )
}
