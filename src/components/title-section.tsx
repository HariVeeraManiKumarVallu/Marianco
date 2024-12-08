'use client'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'

type TitleSectionProps = {
  title: string | React.ReactNode
  description: string
  className?: string
  image: {
    url: string
    altText: string
  }
  children?: React.ReactNode
}

export default function TitleSection({
  title,
  description,
  image,
  className,
  children,
}: TitleSectionProps) {
  return (
    <section className={cn('relative h-[600px]', className ?? '')}>
      <Image
        src={image.url}
        alt={image.altText}
        fill
        sizes="100vw"
        priority
        quality={85}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative container h-full "
      >
        <div className="h-full flex flex-col justify-center items-start text-primary-foreground gap-2">
          <h1 className="">{title}</h1>
          <p className="max-w-prose">{description}</p>
          {children}
        </div>
      </motion.div>
    </section>
  )
}
