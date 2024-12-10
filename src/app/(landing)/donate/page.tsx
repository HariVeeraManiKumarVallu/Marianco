import DonationOptionsCards from '@/components/donation-options'
import TitleSection from '@/components/title-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    "Support Marianco's mission to protect children. Your donation helps fund rescue operations, rehabilitation programs, and prevention initiatives.",
  openGraph: {
    title: 'Donate | Marianco',
    description:
      "Support Marianco's mission to protect children. Your donation helps fund rescue operations, rehabilitation programs, and prevention initiatives.",
  },
}

export default function DonatePage() {
  return (
    <div className="space-y-20">
      <TitleSection
        title="Be a Hero for Vulnerable Children"
        description="Your generosity makes it possible for us to rescue and protect children who are at risk or have been affected by exploitation. Every donation helps us provide safe homes, education, psychological support, and the means for children to start anew."
        image={{
          url: 'https://marianco-images.s3.eu-north-1.amazonaws.com/title_Img_e79cd2fe95.png',
          altText: 'altText',
        }}
      />
      <section>
        <div className="container">
          <h2 className="text-center mb-12">Support Our Cause</h2>
          <DonationOptionsCards />
          <p className="pt-6 font-semibold">Payment Options</p>
          <p className="text-sm">
            We offer secure payment processing via credit card, PayPal, and bank
            transfers to ensure your donation is simple and safe.
          </p>
        </div>
      </section>
      <section className="bg-beige">
        <div className="container  py-section">
          <h2 className="mb-6">Donation Perks</h2>
          <ul className="space-y-4">
            <li>
              <h4>$50+ Donations</h4>
              <p>
                A thank-you card with a personalized message from a child in our
                care.
              </p>
            </li>
            <li>
              <h4>$100+ Donations</h4>
              <p>
                Exclusive access to quarterly impact reports and video updates
                on our initiatives.
              </p>
            </li>
            <li>
              <h4>$500+ Donations:</h4>
              <p>
                Invitations to Marianco&apos;s donor-only webinars, events, and
                behind-the-scenes briefings with our leadership.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
