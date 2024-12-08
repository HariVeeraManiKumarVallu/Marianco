'use client'

import TitleSection from '@/components/title-section'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <TitleSection
      title="Protect, Educate, Empower"
      description="Partner with us in our mission to eradicate child exploitation and create a world where every child can grow up safe, empowered, and loved. Together, we can give children the future they deserve."
      image={{
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3',
        altText: 'altText',
      }}
      className="h-[700px] max-h-[calc(100vh)] "
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col md:flex-row justify-center gap-4 mt-8"
      >
        <Button size="lg" variant={'secondary'} asChild>
          <Link href={ROUTES.GET_INVOLVED}>Join the Movement</Link>
        </Button>
        <Button size={'lg'} asChild>
          <Link href={ROUTES.DONATE}>Make a Donation</Link>
        </Button>
      </motion.div>
    </TitleSection>
  )
}
