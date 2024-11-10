import DonationOptionsCards from '@/components/donation-options'

export default function Donations() {
  return (
    <>
      <section>
        <div className="container">
          <h1>Be a Hero for Vulnerable Children</h1>

          <p>
            Your generosity makes it possible for us to rescue and protect
            children who are at risk or have been affected by exploitation.
            Every dollar you give helps us provide safe homes, education,
            psychological support, and the means for children to start anew.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <DonationOptionsCards />
          <h2>Donation Perks:</h2>
          <ul>
            <li>
              <h4>$50+ Donations:</h4>
              <p>
                {' '}
                A thank-you card with a personalized message from a child in our
                care.
              </p>
            </li>
            <li>
              <h4>$100+ Donations:</h4>
              <p>
                {' '}
                Exclusive access to quarterly impact reports and video updates
                on our initiatives.
              </p>
            </li>
            <li>
              <h4>$500+ Donations:</h4>
              <p>
                {' '}
                Invitations to Marianco&apos;s donor-only webinars, events, and
                behind-the-scenes briefings with our leadership.
              </p>
            </li>
          </ul>
          <h2>Payment Options:</h2>
          <p>
            We We offer secure payment processing via credit card, PayPal, and
            bank transfers to ensure your donation is simple and safe.
          </p>
        </div>
      </section>
    </>
  )
}
