'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight, BicepsFlexed, GraduationCap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function WhatWeDoSection() {
  return (
    <section>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>What We Do</h2>
          <ul className="grid gap-8 md:grid-cols-3 mt-6 justify-center">
            {[
              {
                icon: Shield,
                title: 'Protection',
                description:
                  'We work to prevent child trafficking through education and community awareness programs.',
              },
              {
                icon: GraduationCap,
                title: 'Education',
                description:
                  'Organizing educational workshops, scholarships, and mentoring programs to help individuals grow.',
              },
              {
                icon: BicepsFlexed,
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
                className="text-center max-w-[400px] "
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <item.icon className="w-6 h-6 text-secondary" />
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

          <Button asChild variant={'link'}>
            <Link href="/events" className="mt-6">
              Learn more about our work <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
