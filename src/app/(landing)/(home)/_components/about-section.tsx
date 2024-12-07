'use client'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="py-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container space-y-12"
      >
        <div className="space-y-4">
          <h2>About Us</h2>
          <p className=" leading-7">
            Marianco is a global nonprofit organization dedicated to protecting
            children from the horrors of trafficking, exploitation and abuse.
            Founded by Francisco Padilla, a former street orphan from Cartagena,
            Colombia, Marianco is committed to safeguarding the rights of
            children and ensuring they have a future full of hope and
            opportunities. We believe that every child deserves to grow up in a
            world where they are protected, valued, and empowered to reach their
            full potential.
          </p>
        </div>
        <ul className="grid lg:grid-cols-3 gap-6 max-w-96 mx-auto lg:max-w-none">
          {[
            {
              title: 'Combatting Child Trafficking',
              description:
                'Dedicated to ending the horrific practice of child trafficking. Join us in the fight to protect vulnerable children and restore their freedom and dignity.',
              img: '/a.jpg',
              altText: '',
            },
            {
              title: 'Fighting Against Child Pornography',
              description:
                'Unwavering in our commitment to eradicating child pornography. Stand with us to protect children and eliminate this  crime.',
              img: '/b.jpg',
              altText: '',
            },
            {
              title: 'Eradicating Child Prostitution',
              description:
                'Marianco is dedicated to ending child prostitution. Stand with us to protect children and give them the future they deserve.',
              img: '/c.gif',
              altText: '',
            },
          ].map(item => (
            <li
              key={item.title}
              className=" bg-brand-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={item.img}
                  alt={item.altText}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <h4 className="">{item.title}</h4>
                <p className="text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      <article>
        <div className="container text-center mt-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* <h2>What We Do</h2> */}
            <ul className="grid gap-8 md:grid-cols-3 mt-6 justify-center">
              {[
                {
                  icon: Icons.protection,
                  title: 'Protection',
                  description:
                    'We work to prevent child trafficking through education and community awareness programs.',
                },
                {
                  icon: Icons.education,
                  title: 'Education',
                  description:
                    'Organizing educational workshops, scholarships, and mentoring programs to help individuals grow.',
                },
                {
                  icon: Icons.empowerment,
                  title: 'Empowerment',
                  description:
                    'Fostering economic independence by providing skills training and community support.',
                },
              ].map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card className="h-full border-brand-blue-500  transition-colors   ">
                    <CardHeader>
                      <div className="size-16 bg-brand-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="size-8 text-brand-blue-100" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm lg:text-base">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </ul>

            <Link
              href={ROUTES.ABOUT}
              className={buttonVariants({
                variant: 'link',
                className: 'mt-12 group',
              })}
            >
              Learn more about our work
              <Icons.arrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </article>
    </section>
  )
}
