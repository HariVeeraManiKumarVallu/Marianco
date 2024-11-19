import { Metadata } from 'next'
import HomeContent from './_components/home-content'

export const metadata: Metadata = {
  title: 'Marianco | Working to Protect Children',
  description:
    'Marianco is dedicated to protecting children from exploitation. Join our mission to create a safer world for every child.',
  openGraph: {
    title: 'Marianco | Working to Protect Children',
    description:
      'Marianco is dedicated to protecting children from exploitation. Join our mission to create a safer world for every child.',
  },
}

export default function Home() {
  return <HomeContent />
}
