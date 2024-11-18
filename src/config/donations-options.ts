import { z } from 'zod'

export const donationsConfig = {
  oneTime: {
    schema: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Please enter a valid amount',
    }),
    title: 'One-time Donation',
    description:
      'Make a single contribution to our cause. Choose any amount to contribute and make an immediate impact.',
    predefinedAmounts: ['25', '50', '100', '200'],
    buttonText: 'Donate Now',
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
    schema: z.enum(['50', '100', '200'], {
      errorMap: () => ({ message: 'Please select a sponsorship level' }),
    }),
    title: 'Support a Child',
    description:
      'Contribute to the complete care and rehabilitation of a child rescued from exploitation.',
    sponsorshipTiers: [
      { label: 'Basic Care ($50/month)', value: '50' },
      { label: 'Standard Care ($100/month)', value: '100' },
      { label: 'Comprehensive Care ($200/month)', value: '200' },
    ],
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
