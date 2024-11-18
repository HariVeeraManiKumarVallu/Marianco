import { Metadata } from 'next'
import AboutUsContent from './_components/about-us-content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Marianco\'s mission, vision, and commitment to protecting children from exploitation. Discover our impact, team, and how we work to create lasting change.',
  openGraph: {
    title: 'About Us | Marianco',
    description:
      'Learn about Marianco\'s mission, vision, and commitment to protecting children from exploitation. Discover our impact, team, and how we work to create lasting change.',
  },
}

export default function About() {
  return <AboutUsContent />
}
