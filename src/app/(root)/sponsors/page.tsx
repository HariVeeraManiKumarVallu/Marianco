import TitleSection from '@/components/title-section'
import { ROUTES } from '@/constants/routes'
import { Metadata } from 'next'
import CtaSection from '../../../components/cta-section'
import AdditionalOptions from './components/additional-options'
import { getStripeServer } from '@/services/stripe'

export const metadata: Metadata = {
  title: 'Sponsors',
}

export default async function SponsorsPage() {
  // Only access stripe if needed
  const stripe = getStripeServer()
  // (Use stripe safely or fallback)
  return (
    <>
      <TitleSection
        title="Sponsors"
        description="Support our mission by becoming a sponsor."
        image={{ url: "/images/sponsors-banner.png", altText: "Sponsors banner" }}
      />
      <AdditionalOptions />
      <CtaSection
        heading="Become a Sponsor"
        description="Help us continue our mission by sponsoring us today."
        link={{ text: "Sponsor Now", href: "/sponsor" }}
      />
    </>
  )
}
