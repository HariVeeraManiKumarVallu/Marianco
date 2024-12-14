import TitleSection from '@/components/title-section'
import { ROUTES } from '@/config/routes'
import stripe from '@/services/stripe'
import { Metadata } from 'next'
import CtaSection from '../../../components/cta-section'
import AdditionalOptions from './components/additional-options'
import Heading from './components/heading'
import SponsorshipTiersSection from './components/sponsorship-tiers-section'
import SponsorsList from '@/components/sponsors-list'

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
          url: 'https://marianco-images.s3.eu-north-1.amazonaws.com/title_Img_e79cd2fe95.png',
          altText: 'altText',
        }}
      />
      <Heading />
      <SponsorsList />
      <SponsorshipTiersSection prices={prices.data} />
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
