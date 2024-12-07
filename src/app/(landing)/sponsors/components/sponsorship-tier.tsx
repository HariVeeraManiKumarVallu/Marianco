'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type AvailableCurrency } from '@/config/currencies'
import { SPONSORSHIP_TIERS } from '@/config/sponsorship-tiers'
import { formatAmount } from '@/lib/formatters'
import { handleStripeCheckoutSession } from '@/lib/queries/stripe/checkout'
import { motion } from 'framer-motion'
import Stripe from 'stripe'

interface SponsorshipTierProps {
  sponsorshipTier: Stripe.Price
  currency: AvailableCurrency
  isLoading: boolean
  isAnyLoading: boolean
  setLoading: (loading: boolean) => void
}

export default function SponsorshipTier({
  sponsorshipTier,
  currency,
  isLoading,
  isAnyLoading,
  setLoading,
}: SponsorshipTierProps) {
  const currencyOptions = sponsorshipTier.currency_options || {}
  const tierDetails = SPONSORSHIP_TIERS.find(
    tier => tier.title === sponsorshipTier.nickname
  )

  const getAmount = () => {
    if (currency === 'USD') {
      return (sponsorshipTier.unit_amount || 0) / 100
    }

    const option = currencyOptions[currency.toLowerCase()]
    return option && 'unit_amount' in option
      ? (option.unit_amount as number) / 100
      : 0
  }

  const handleSelectPlan = async () => {
    setLoading(true)
    try {
      await handleStripeCheckoutSession({
        type: 'sponsorship',
        priceId: sponsorshipTier.id,
        currency,
        tierName: sponsorshipTier.nickname,
      })
    } finally {
      setLoading(false)
    }
  }

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
          <CardTitle>{sponsorshipTier.nickname}</CardTitle>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                {formatAmount(getAmount(), currency, { hideDecimals: true })}
              </span>
              <span className="text-muted-foreground">/year</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4 mb-6">
            {tierDetails?.benefits.map((benefit, index) => (
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
        <div className="p-6 pt-0">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSelectPlan}
            disabled={isAnyLoading}
          >
            {isLoading ? 'Processing...' : 'Select Plan'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
