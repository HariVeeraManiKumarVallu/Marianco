import TitleSection from '@/components/title-section'
import { ROUTES } from '@/constants/routes'
import stripe from '@/services/stripe'
import { Metadata } from 'next'
import CtaSection from '../../../components/cta-section'
import AdditionalOptions from './components/additional-options'
import Heading from './components/heading'
import SponsorshipTiersSection from './components/sponsorship-tiers-section'
import SponsorsList from '@/components/sponsors-list'
import { SPONSORSHIP_TIERS } from '@/constants/sponsorship-tiers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sponsors & Partners',
  description:
    'Partner with Marianco to make a lasting impact. Discover our sponsorship tiers and join our network of organizations committed to protecting children.',
  openGraph: {
    title: 'Sponsors & Partners | Marianco',
    description:
      'Partner with Marianco to make a lasting impact. Discover our sponsorship tiers and join our network of organizations committed to protecting children.',
  },
}

export default async function SponsorsPage() {
  const prices = await stripe.prices.list({
    active: true,
    lookup_keys: Object.keys(SPONSORSHIP_TIERS),
    expand: ['data.currency_options'],
  })

  if (!prices.data) {
    return null
  }

  const tiers = prices.data.filter(item => item.unit_amount).sort((a, b) => a.unit_amount! - b.unit_amount!).map(item => {
    const lookupKey = item.lookup_key as keyof typeof SPONSORSHIP_TIERS
    return {
      title: SPONSORSHIP_TIERS[lookupKey].title,
      lookupKey,
      currencyOptions: item.currency_options!,
      benefits: SPONSORSHIP_TIERS[lookupKey].benefits,
    }
  })

  return (
    <div>
      <TitleSection
        title={
          <>
            <span>Partner with Us,</span>
            <br />
            <span>
              for a Safer World <br /> for Children
            </span>
          </>
        }
        description="Join Marianco in our mission to protect vulnerable children and create lasting change through meaningful partnerships."
        image={{
          url: 'https://marianco-images.s3.eu-north-1.amazonaws.com/title_img_e7bc233513.jpg',
          altText: 'altText',
        }}
      />
      <Heading />
      <SponsorsList />
      {/* TODO: Add loading skeleton */}
      <Suspense>
        <SponsorshipTiersSection tiers={tiers} />
      </Suspense>
      <AdditionalOptions />
      <CtaSection
        heading="Ready to Make a Difference"
        description="Contact us to discuss partnership opportunities that align with your organization's values and goals."
        link={{
          text: 'Start the Conversation',
          href: ROUTES.GET_INVOLVED,
        }}
      />
    </div>
  )
}
