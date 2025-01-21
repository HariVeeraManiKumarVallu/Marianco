'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CHECKOUT_TYPES } from '@/constants/checkout'
import { formatAmount } from '@/lib/formatters'
import { handleStripeCheckoutSession } from '@/lib/queries/stripe/checkout'
import { CurrencyCodes } from '@/types/currency'
import { SponsorshipTier } from '@/types/donation'
import { motion } from 'motion/react'
import { Dispatch, SetStateAction } from 'react'

type SponsorshipTierProps = {
  sponsorshipTier: SponsorshipTier
  currency: CurrencyCodes
  selectedTier: string
  setSelectedTier: Dispatch<SetStateAction<string>>
}

export default function SponsorshipTierCard({
  sponsorshipTier,
  currency,
  selectedTier,
  setSelectedTier,
}: SponsorshipTierProps) {
  if (!sponsorshipTier.currencyOptions[currency.toLowerCase()]?.unit_amount) return null
  const formattedAmount = formatAmount(sponsorshipTier.currencyOptions[currency.toLowerCase()]?.unit_amount / 100, currency, { hideDecimals: true })

  async function handleSelectPlan() {
    try {
      setSelectedTier(sponsorshipTier.lookupKey)
      await handleStripeCheckoutSession({
        checkoutType: CHECKOUT_TYPES.SPONSORSHIP,
        currency,
        lookupKey: sponsorshipTier.lookupKey
      })
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setSelectedTier('')
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
          <CardTitle>{sponsorshipTier.title}</CardTitle>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                {formattedAmount}
              </span>
              <span className="text-muted-foreground">/year</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4 mb-6">
            {sponsorshipTier.benefits.map((benefit, index) => (
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
            disabled={!!selectedTier}
          >
            {selectedTier === sponsorshipTier.lookupKey ? 'Processing...' : 'Select Plan'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
