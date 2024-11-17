'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'

type PartnershipTierProps = {
  title: string
  amount: string
  benefits: string[]
}

export default function PartnershipTier({
  title,
  amount,
  benefits,
}: PartnershipTierProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="relative overflow-hidden h-full flex flex-col border border-border/50 hover:border-primary/50 transition-colors duration-300">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div>
            <span className="text-3xl font-bold">{amount}</span>
            <span className="text-muted-foreground ml-1">/year</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="rounded-full p-1 bg-primary/10 text-primary">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full group" variant="outline" size="lg">
            <span className="flex items-center justify-center gap-2">
              Select Plan
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
