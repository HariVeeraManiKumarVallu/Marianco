import { Metadata } from 'next'
import AboutUsContent from './_components/about-us-content'

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

export default async function About() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/team-members?populate=*`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  )
  const resData = await res.json()
  const sortedTeamMembers = resData.data.toSorted(
    (a: any, b: any) => a.heirarchy - b.heirarchy
  )
  return <AboutUsContent teamMembers={sortedTeamMembers} />
}
