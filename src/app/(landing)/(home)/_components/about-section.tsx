'use client'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { focusAreaCards, focusAreas } from '@/data/about'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="py-section space-y-16 lg:space-y-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center lg:text-start"
      >
        <h2 className="mb-4">About Us</h2>
        <div className="flex gap-24 ">
          <div className="mx-auto">
            <p className="leading-7 text-lg text-muted-foreground max-w-prose ">
              Marianco is a global nonprofit organization dedicated to
              protecting children from the horrors of trafficking, exploitation
              and abuse. Founded by Francisco Padilla, a former street orphan
              from Cartagena, Colombia, Marianco is committed to safeguarding
              the rights of children and ensuring they have a future full of
              hope and opportunities. We believe that every child deserves to
              grow up in a world where they are protected, valued, and empowered
              to reach their full potential.
            </p>
            <Link
              href={ROUTES.ABOUT}
              className={buttonVariants({
                variant: 'link',
                className: 'mt-6 group px-0',
              })}
            >
              Learn more about our work
              <Icons.arrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="hidden lg:block ">
            <Image
              src="https://marianco-images.s3.eu-north-1.amazonaws.com/happy_children_0346907c45.avif"
              alt="Happy children"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container pt-12"
      >
        <h3 className="text-center mb-8 text-2xl font-semibold">
          Our Focus Areas
        </h3>
        <ul className="grid lg:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {focusAreas.map(item => (
            <li
              key={item.title}
              className="bg-brand-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group overflow-clip "
            >
              <div className="relative h-56 w-full rounded-t-lg overflow-hidden ">
                <Image
                  src={item.img}
                  alt={item.altText}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 py-8 px-6">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-muted-foreground text-sm lg:text-base">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container text-center"
      >
        <h3 className="text-center mb-8 text-2xl font-semibold">What We Do</h3>
        <ul className="grid gap-8 md:grid-cols-3 mt-6 justify-center max-w-6xl mx-auto">
          {focusAreaCards.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="h-full border-brand-blue-500 hover:border-brand-blue-600 transition-all">
                <CardHeader>
                  <div className="size-16 bg-brand-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="size-8 text-brand-blue-100" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      </motion.article>
    </section>
  )
}
