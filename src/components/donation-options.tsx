'use client'

import CurrencySelector from '@/components/currency-selector'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { donationsConfig, DonationType } from '@/config/donations-options'
import { handleStripeCheckoutSession } from '@/lib/queries/stripe/checkout'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { CHECKOUT_TYPES } from '@/config/checkout'
import { useAtomValue, useSetAtom } from 'jotai'
import { localCurrencyAtom, selectedCurrencyAtom } from '@/store/currency-atom'

const initialErrorState = {
  oneTime: '',
  monthly: '',
  sponsorship: '',
  project: '',
}

export default function DonationOptionsCards() {
  const [oneTimeAmount, setOneTimeAmount] = useState('')
  const [customAmountInput, setCustomAmountInput] = useState('')
  const [monthlyAmount, setMonthlyAmount] = useState('')
  const [selectedSponsorship, setSelectedSponsorship] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const currency = useAtomValue(selectedCurrencyAtom)
  const [loadingStates, setLoadingStates] = useState<
    Record<DonationType, boolean>
  >({
    oneTime: false,
    monthly: false,
    sponsor: false,
    project: false,
  })

  const [errors, setErrors] = useState(initialErrorState)

  function clearError(type: DonationType) {
    setErrors(prev => ({
      ...prev,
      [type]: '',
    }))
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      console.log(
        'Donation successful! You will receive an email confirmation.'
      )
    }

    if (query.get('canceled')) {
      console.log(
        'Donation canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
  }, [])

  async function handleCheckout(type: DonationType, amount: string) {
    clearError(type)
    if (type === 'project') return
    const validatedValue = donationsConfig[type].schema.safeParse(amount)
    if (!validatedValue.success) {
      setErrors(prev => ({
        ...prev,
        [type]: validatedValue.error.errors[0].message,
      }))
      return
    }

    setLoadingStates(prev => ({ ...prev, [type]: true }))
    try {
      await handleStripeCheckoutSession({
        checkoutType: CHECKOUT_TYPES.DONATION,
        donationType: type,
        amount: validatedValue.data,
        currency,
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, [type]: false }))
    }
  }

  if (!currency) return null

  return (
    <article className="w-full">
      <div className="flex justify-end mb-6">
        <CurrencySelector />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* One-time Donation */}
        <Card className="flex flex-col h-full hover:border-brand-blue-500 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl">
              {donationsConfig.oneTime.title}
            </CardTitle>
            <CardDescription>
              {donationsConfig.oneTime.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {donationsConfig.oneTime.fixedOneTimeAmounts[currency].amounts.map(amount => (
                <Button
                  key={amount}
                  variant={
                    oneTimeAmount === amount.toString() ? 'default' : 'outline'
                  }
                  onClick={() => {
                    setOneTimeAmount(amount.toString())
                    if (customAmountInput) setCustomAmountInput('')
                  }}
                  className={cn(
                    {
                      'hover:bg-brand-blue-900':
                        oneTimeAmount === amount.toString(),
                      'hover:bg-brand-blue-300/30':
                        oneTimeAmount !== amount.toString(),
                    },
                    'w-full text-base border-brand-blue-300/50'
                  )}
                >
                  <div>
                    <span className="mr-px">
                      {donationsConfig.oneTime.fixedOneTimeAmounts[currency].symbol}
                    </span>
                    <span>{amount}</span>
                  </div>
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-amount">Custom Amount</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmountInput}
                onChange={e => {
                  setCustomAmountInput(e.target.value)
                  if (oneTimeAmount) setOneTimeAmount('')
                }}
              />
            </div>
            {errors.oneTime && (
              <p className="text-sm text-red-500">{errors.oneTime}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() =>
                handleCheckout('oneTime', oneTimeAmount || customAmountInput)
              }
              disabled={Object.values(loadingStates).some(Boolean)}
            >
              {loadingStates.oneTime
                ? 'Processing...'
                : donationsConfig.oneTime.buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* Monthly Giving */}
        <Card className="flex flex-col h-full hover:border-brand-blue-500 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl">
              {donationsConfig.monthly.title}
            </CardTitle>
            <CardDescription>
              {donationsConfig.monthly.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="space-y-2">
              <Label htmlFor="monthly-amount">Monthly Amount</Label>
              <Input
                id="monthly-amount"
                type="number"
                placeholder="Enter monthly amount"
                value={monthlyAmount}
                onChange={e => setMonthlyAmount(e.target.value)}
              />
            </div>
            {errors.monthly && (
              <p className="text-sm text-red-500">{errors.monthly}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleCheckout('monthly', monthlyAmount)}
              disabled={Object.values(loadingStates).some(Boolean)}
            >
              {loadingStates.monthly
                ? 'Processing...'
                : donationsConfig.monthly.buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* Sponsorship */}
        <Card className="flex flex-col h-full hover:border-brand-blue-500 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl">
              {donationsConfig.sponsor.title}
            </CardTitle>
            <CardDescription>
              {donationsConfig.sponsor.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="space-y-2">
              <Label>Sponsorship Level</Label>
              <Select
                value={selectedSponsorship}
                onValueChange={setSelectedSponsorship}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sponsorship level" />
                </SelectTrigger>
                <SelectContent>
                  {donationsConfig.sponsor.sponsorshipTiers[currency].map(
                    tier => (
                      <SelectItem key={tier.value} value={tier.value}>
                        {tier.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            {errors.sponsorship && (
              <p className="text-sm text-red-500">{errors.sponsorship}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleCheckout('sponsor', selectedSponsorship)}
              disabled={Object.values(loadingStates).some(Boolean)}
            >
              {loadingStates.sponsor
                ? 'Processing...'
                : donationsConfig.sponsor.buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* Fund a Project */}
        <Card className="flex flex-col h-full hover:border-brand-blue-500 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl">
              {donationsConfig.project.title}
            </CardTitle>
            <CardDescription>
              {donationsConfig.project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select
                value={selectedProject}
                onValueChange={setSelectedProject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {donationsConfig.project.projects.map(project => (
                    <SelectItem key={project.value} value={project.value}>
                      {project.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project && (
                <p className="text-sm text-red-500">{errors.project}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleCheckout('project', selectedProject)}
              disabled={Object.values(loadingStates).some(Boolean)}
            >
              {loadingStates.project
                ? 'Processing...'
                : donationsConfig.project.buttonText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </article>
  )
}
