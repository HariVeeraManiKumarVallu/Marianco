'use client'

import { motion } from 'framer-motion'
import { HandHeart } from 'lucide-react'
import Link from 'next/link'
import AnimatedWorldMap from './animated-world-map'
import HeroContent from './hero-content'
import { Button, buttonVariants } from './ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* <div className="container flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12"> */}
      {/* <AnimatedWorldMap /> */}
      <div className="relative container flex-1 flex flex-col items-center justify-center text-center text-pretty">
        {/* <div className="text-center"> */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold tracking-tight text-white  md:text-[5rem]"
        >
          <span className="text-orange-600">Protect, </span>
          Educate, <span className="">Empower</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg mx-auto text-xl lg:text-2xl/9 text-gray-200 sm:max-w-3xl "
        >
          Partner with us in our mission to{' '}
          <span className="text-orange-500">eradicate child exploitation</span>{' '}
          and create a world where every child can grow up{' '}
          <span className="">safe, empowered, and loved.</span> Together, we can
          give children the future they deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button
            className="text-lg py-6 bg-white text-black rounded-full"
            size={'lg'}
            asChild
          >
            <Link href={'/membership'}>Join the Movement</Link>
          </Button>
          <Button
            className="text-lg py-6 bg-orange-500 rounded-full"
            size={'lg'}
            asChild
          >
            <Link href={'/donations'}>Make a Donation</Link>
          </Button>
        </motion.div>
        {/* </div> */}
      </div>
      {/* <HeroContent /> */}
      {/* </div> */}
    </section>
  )
}
