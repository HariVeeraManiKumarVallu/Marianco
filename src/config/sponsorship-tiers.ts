export type SponsorshipTier = {
  title: string
  amount: string
  benefits: string[]
}

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    title: 'Bronze Partner',
    amount: '$5,000',
    benefits: [
      'Company logo on our website',
      'Recognition in promotional materials',
      'Two complimentary gala tickets',
      'Quarterly impact reports',
    ],
  },
  {
    title: 'Silver Partner',
    amount: '$10,000',
    benefits: [
      'Recognition at all Marianco events',
      'Prominent logo placement',
      'Four gala tickets',
      'Personal facility tour',
      'Monthly partnership highlights',
    ],
  },
  {
    title: 'Gold Partner',
    amount: '$25,000',
    benefits: [
      'All Silver Partner benefits',
      'Media campaign mentions',
      'Co-host opportunity',
      'Executive briefings',
      'Custom impact initiatives',
    ],
  },
]
