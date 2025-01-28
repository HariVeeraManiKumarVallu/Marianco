import { Metadata } from 'next'
import ContactPageContent from './_components/contact-page-content'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Marianco. Whether you have questions about our work, need support, or want to collaborate, we\'re here to help.',
  openGraph: {
    title: 'Contact Us | Marianco',
    description:
      'Get in touch with Marianco. Whether you have questions about our work, need support, or want to collaborate, we\'re here to help.',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
