'use client'

import { type SponsorshipTier } from '@/config/sponsorship-tiers'
import { motion } from 'framer-motion'
import { Icons } from './icons'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function SponsorshipTier({
  title,
  amount,
  benefits,
}: SponsorshipTier) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="relative overflow-hidden h-full flex flex-col border border-brand-blue-300 hover:border-brand-blue-900 transition-colors duration-300 max-w-96 mx-auto">
        <CardHeader className="space-y-3">
          <CardTitle>{title}</CardTitle>
          <div>
            <span className="text-3xl font-bold">{amount}</span>
            <span className="text-muted-foreground ml-1">/year</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4 mb-6">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="rounded-full p-1 bg-primary/10 text-primary">
                  <Icons.check className="size-4" />
                </div>
                <p className="text-sm">{benefit}</p>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full flex items-center justify-center gap-2 group"
            size="lg"
          >
            <span>Select Plan</span>
            <Icons.arrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
