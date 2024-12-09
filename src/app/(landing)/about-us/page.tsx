import { getTeamMembers } from '@/lib/queries/strapi/team-members'
import { Metadata } from 'next'
import AboutUsContent from './about-us-content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Marianco's mission, vision, and commitment to protecting children from exploitation. Discover our impact, team, and how we work to create lasting change.",
  openGraph: {
    title: 'About Us | Marianco',
    description:
      "Learn about Marianco's mission, vision, and commitment to protecting children from exploitation. Discover our impact, team, and how we work to create lasting change.",
  },
}

export default async function AboutPage() {
  const data = await getTeamMembers()

  return <AboutUsContent teamMembers={data.data} />
}
