'use client'
import AnimatedWorldMap from '@/components/animated-world-map'
import DonationOptions from '@/components/donation-options'
import NewsletterSignup from '@/components/forms/newsletter-signup'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col ">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
        </div>

        <div className="relative container flex-1 flex flex-col items-center justify-center text-center text-pretty">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-white"
          >
            Protect, Educate, Empower
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-prose text-xl lg:text-2xl/9 text-brand-white "
          >
            Partner with us in our mission to eradicate child exploitation and
            create a world where every child can grow up safe, empowered, and
            loved. Together, we can give children the future they deserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col md:flex-row justify-center gap-4"
          >
            <Button size="lg" variant={'secondary'} asChild>
              <Link href={ROUTES.GET_INVOLVED}>Join the Movement</Link>
            </Button>
            <Button size={'lg'} asChild>
              <Link href={ROUTES.DONATE}>Make a Donation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-b from-brand-white to-brand-blue-900/20 pb-section space-y-20">
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
              Marianco is a global nonprofit organization dedicated to
              protecting children from the horrors of trafficking, exploitation
              and abuse. Founded by Francisco Padilla, a former street orphan
              from Cartagena, Colombia, Marianco is committed to safeguarding
              the rights of children and ensuring they have a future full of
              hope and opportunities. We believe that every child deserves to
              grow up in a world where they are protected, valued, and empowered
              to reach their full potential.
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
          <div className="container text-center">
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
                    <Card className="h-full border-brand-blue-300  transition-colors   ">
                      <CardHeader>
                        <div className="size-16 bg-brand-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <item.icon className="size-8 text-brand-blue-100" />
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm lg:text-base">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.li>
                ))}
              </ul>

              <Button asChild variant={'link'} className="">
                <Link href={ROUTES.ABOUT} className="mt-12 group">
                  Learn more about our work{' '}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </article>
      </section>
      {/* Stats Section */}
      <section className="p-section bg-gradient-to-b">
        <div className="container  ">
          <h2 className=" text-center mb-4">
            A World in Peril
            <br />
            <span className="text-xl lg:text-2xl text-pretty">
              The Alarming Reality of Child Exploitation
            </span>
          </h2>
          <div className="flex flex-col lg:flex-row">
            <AnimatedWorldMap />
            <div className="lg:px-8 grid text-center md:place-items-center">
              <div>
                <h3 className="whitespace-nowrap   mb-6">Alarming Numbers</h3>
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="gap-4 grid md:grid-cols-2 lg:grid-cols-1"
                >
                  {[
                    {
                      title: '1.2 million',
                      description: 'Children trafficked annually',
                    },
                    {
                      title: '1 million',
                      description: 'Children in commercial sex trade',
                    },
                    {
                      title: '70% - 80%',
                      description: 'Child trafficking victims are girls',
                    },
                    {
                      title: '69 million',
                      description: 'Reports of abuse images annually',
                    },
                  ].map(({ title, description }) => (
                    <li
                      key={title}
                      className="space-y-2 lg:text-start bg-brand-blue-100/20 p-4 rounded-lg"
                    >
                      <h4 className="text-brand-blue-900">{title}</h4>
                      <p className=" text-sm">{description}</p>
                    </li>
                  ))}
                  <p className="text-muted-foreground text-xs text-start max-w-prose">
                    * These numbers vary across sources, and actual figures can
                    be challenging to verify due to the hidden nature of these
                    crimes
                  </p>
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-section bg-gradient-to-b from-brand-white to-brand-blue-900/20">
        <div className="container">
          <h2>How You Can Help Us</h2>
          <p className="text-muted-foreground mb-12">
            Join us in protecting children and ending exploitation—every action
            makes a difference.
          </p>
          <DonationOptions />
        </div>
      </section>
      <NewsletterSignup />
    </div>
  )
}
