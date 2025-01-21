import { AvailableCurrency } from '@/types/currency'
import { z } from 'zod'

type AmountConfig = {
  [key in AvailableCurrency]: {
    symbol: string
    amounts: number[]
  }
}

const fixedOneTimeAmounts: AmountConfig = {
  USD: {
    symbol: '$',
    amounts: [5, 10, 25, 50],
  },
  EUR: {
    symbol: '€',
    amounts: [5, 10, 25, 50],
  },
  SEK: {
    symbol: 'SEK',
    amounts: [50, 100, 250, 500],
  },
}

export const donationsConfig = {
  oneTime: {
    schema: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Please enter a valid amount',
    }),
    title: 'One-Time Donation',
    description: 'Make a one-time contribution to support our mission.',
    buttonText: 'Donate Now',
    fixedOneTimeAmounts,
  },
  monthly: {
    schema: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Please enter a valid amount',
    }),
    title: 'Monthly Giving',
    description:
      'Become a sustaining donor, contributing each month to ensure our programs remain strong and consistent.',
    buttonText: 'Subscribe Monthly',
  },
  sponsor: {
    schema: z.enum(['50', '100', '200', '500', '1000', '2000'], {
      errorMap: () => ({ message: 'Please select a sponsorship level' }),
    }),
    title: 'Support a Child',
    description:
      'Contribute to the complete care and rehabilitation of a child rescued from exploitation.',
    tiers: {
      USD: {
        symbol: '$',
        amounts: [50, 100, 200],
      },
      EUR: {
        symbol: '€',
        amounts: [50, 100, 200],
      },
      SEK: {
        symbol: 'SEK',
        amounts: [500, 1000, 2000],
      },
    },
    sponsorshipTiers: {
      USD: [
        { label: 'Basic Care ($50/month)', value: '50' },
        { label: 'Standard Care ($100/month)', value: '100' },
        { label: 'Comprehensive Care ($200/month)', value: '200' },
      ],
      EUR: [
        { label: 'Basic Care (€50/month)', value: '50' },
        { label: 'Standard Care (€100/month)', value: '100' },
        { label: 'Comprehensive Care (€200/month)', value: '200' },
      ],
      SEK: [
        { label: 'Basic Care (SEK500/month)', value: '500' },
        { label: 'Standard Care (SEK1000/month)', value: '1000' },
        { label: 'Comprehensive Care (SEK2000/month)', value: '2000' },
      ],
    },
    buttonText: 'Sponsor Now',
  },
  project: {
    schema: z.enum(['education', 'healthcare', 'environment', 'community'], {
      errorMap: () => ({ message: 'Please select a project type' }),
    }),
    title: 'Fund a Project',
    description:
      "Support a specific project, whether it's is a rescue mission,an educational campaign, or a safe home for victims of              trafficking.",
    projects: [
      { label: 'Education', value: 'education' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Environment', value: 'environment' },
      { label: 'Community', value: 'community' },
    ],
    buttonText: 'Fund Project',
  },
} as const

export type DonationType = keyof typeof donationsConfig
