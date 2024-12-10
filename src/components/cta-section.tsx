'use client'

import { buttonVariants } from '@/components/ui/button'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function CtaSection({
  heading,
  description,
  link,
}: {
  heading: string
  description: string
  link: {
    text: string
    href: string
  }
}) {
  return (
    <section className="pt-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className=" text-center bg-blue-50 rounded-xl p-8 container"
      >
        <h2 className="mb-4">{heading}</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        <Link href={link.href} className={buttonVariants({ size: 'lg' })}>
          {link.text}
        </Link>
      </motion.div>
    </section>
  )
}
