import TitleSection from '@/components/title-section'
import stripe from '@/services/stripe'
import AdditionalOptions from './components/additional-options'
import CTASection from './components/cta-section'
import Heading from './components/heading'
import SponsorshipTiersSection from './components/sponsorship-tiers-section'

export default async function Sponsors() {
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
