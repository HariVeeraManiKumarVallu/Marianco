import { Metadata } from 'next'
import GetInvolvedContent from './_components/get-involved-content'

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Join Marianco in our mission to protect children. Discover various ways to contribute, from volunteering and advocacy to corporate partnerships and donations.',
  openGraph: {
    title: 'Get Involved | Marianco',
    description:
      'Join Marianco in our mission to protect children. Discover various ways to contribute, from volunteering and advocacy to corporate partnerships and donations.',
  },
}

export default function GetInvolvedPage() {
  return <GetInvolvedContent />
}
