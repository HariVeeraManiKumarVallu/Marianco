import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Read Marianco's privacy policy to understand how we protect your personal information and maintain transparency in our data practices.",
  openGraph: {
    title: 'Privacy Policy | Marianco',
    description:
      "Read Marianco's privacy policy to understand how we protect your personal information and maintain transparency in our data practices.",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="container mt-20 pb-section ">
      <h1>Privacy Policy</h1>
      <p className="mt-2">
        At Marianco your privacy is important to us. This policy outlines how we
        collect, use, and protect your personal information.
      </p>
      <ul className="space-y-6 mt-8">
        <li>
          <h4>Information Collection</h4>
          <p>
            We collect personal data you provide when you make a donation, sign
            up for our newsletter, or become a member. This may include your
            name, email, phone number, and payment information.
          </p>
        </li>
        <li>
          <h4>Use of Information</h4>
          <p>
            We use your information to process donations, send newsletters, and
            provide information about upcoming events and initiatives. We may
            also use your data to improve our services.
          </p>
        </li>
        <li>
          <h4>Third-Party Sharing</h4>
          <p>
            We do not sell or share your information with third-party
            organizations unless required by law or for payment processing.
          </p>
        </li>
        <li>
          <h4>Data Protection</h4>
          <p>
            We use secure encryption technology to protect your payment
            information and other personal data. We follow industry best
            practices to ensure your data is safe.
          </p>
        </li>
        <li>
          <h4>Your Rights</h4>
          <p>
            You have the right to access, modify, or delete your personal
            information at any time. Please contact us at
            [info@marianco.org](mailto:info@marianco.org) if you have any
            questions or concerns.
          </p>
        </li>
      </ul>
    </section>
  )
}
