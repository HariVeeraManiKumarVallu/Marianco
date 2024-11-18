'use client'

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
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { handleStripeCheckoutSession } from '@/lib/requests'

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
      console.log('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
  }, [])

  async function handleCheckout(type: DonationType, value: string) {
    clearError(type)
    const validatedValue = donationsConfig[type].schema.safeParse(value)
    if (!validatedValue.success) {
      setErrors(prev => ({
        ...prev,
        [type]: validatedValue.error.errors[0].message,
      }))
      return
    }

    handleStripeCheckoutSession({
      type,
      value: validatedValue.data,
    })
  }

  return (
    <article className="w-full ">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* One-time Donation */}
        <Card className="flex flex-col h-full hover:border-brand-blue-500   transition-colors">
          <CardHeader>
            <CardTitle className="text-xl">
              {donationsConfig.oneTime.title}
            </CardTitle>
            <CardDescription>
              {donationsConfig.oneTime.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {donationsConfig.oneTime.predefinedAmounts.map(amount => (
                <Button
                  key={amount}
                  variant={oneTimeAmount === amount ? 'default' : 'outline'}
                  onClick={() => {
                    setOneTimeAmount(amount)
                    if (customAmountInput) setCustomAmountInput('')
                  }}
                  className={cn(
                    {
                      'hover:bg-brand-blue-900': oneTimeAmount === amount,
                      'hover:bg-brand-blue-300/30': oneTimeAmount !== amount,
                    },
                    'w-full text-base border-brand-blue-300/50 '
                  )}
                >
                  ${amount}
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
            >
              {donationsConfig.oneTime.buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* Monthly Giving */}
        <Card className="flex flex-col h-full hover:border-brand-blue-500   transition-colors">
          <CardHeader>
            <CardTitle className="text-xl">
              {donationsConfig.monthly.title}
            </CardTitle>
            <CardDescription className="h-12">
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
            >
              {donationsConfig.monthly.buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* Sponsor a Person */}
        <Card className="flex flex-col hover:border-brand-blue-500   transition-colors">
          <CardHeader>
            <CardTitle className="text-xl ">
              {donationsConfig.sponsor.title}
            </CardTitle>
            <CardDescription className="h-12">
              {donationsConfig.sponsor.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="space-y-2">
              <Label htmlFor="sponsorship-level">Sponsorship Level</Label>
              <Select onValueChange={value => setSelectedSponsorship(value)}>
                <SelectTrigger id="sponsorship-level">
                  <SelectValue placeholder="Select a sponsorship level" />
                </SelectTrigger>
                <SelectContent>
                  {donationsConfig.sponsor.sponsorshipTiers.map(tier => (
                    <SelectItem key={tier.value} value={tier.value}>
                      {tier.label}
                    </SelectItem>
                  ))}
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
            >
              {donationsConfig.sponsor.buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* Fund a Project */}
        <Card className="flex flex-col hover:border-brand-blue-500   transition-colors">
          <CardHeader>
            <CardTitle className="text-xl ">
              {donationsConfig.project.title}
            </CardTitle>
            <CardDescription className="h-12">
              {donationsConfig.project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="space-y-2">
              <Label htmlFor="project-select">Select Project</Label>
              <Select onValueChange={value => setSelectedProject(value)}>
                <SelectTrigger id="project-select">
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
            >
              {donationsConfig.project.buttonText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </article>
  )
}
