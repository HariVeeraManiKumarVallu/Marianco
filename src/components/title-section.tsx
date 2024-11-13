'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

type TitleSectionProps = {
  title: string
  description: string
  image: {
    url: string
    altText: string
  }
}

export default function TitleSection({
  title,
  description,
  image,
}: TitleSectionProps) {
  return (
    <section className="h-[500px] relative">
      <Image
        src={image.url}
        alt={image.altText}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative container h-full"
      >
        <div className="h-full flex flex-col justify-center items-start text-primary-foreground space-y-2">
          <h1 className="">{title}</h1>
          <p className="max-w-prose">{description}</p>
        </div>
      </motion.div>
    </section>
  )
}
