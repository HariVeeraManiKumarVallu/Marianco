import TitleSection from '@/components/title-section'
import stripe from '@/services/stripe'
import { Metadata } from 'next'
import AdditionalOptions from './components/additional-options'
import CTASection from './components/cta-section'
import Heading from './components/heading'
import SponsorshipTiersSection from './components/sponsorship-tiers-section'

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
    expand: ['data.currency_options'],
  })

  if (!prices.data) {
    return null
  }

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
          url: '/titleImg.png',
          altText: 'Marianco Logo',
        }}
      />
      <Heading />
      <SponsorshipTiersSection prices={prices.data} />
      <AdditionalOptions />
      <CTASection />
    </div>
  )
}
