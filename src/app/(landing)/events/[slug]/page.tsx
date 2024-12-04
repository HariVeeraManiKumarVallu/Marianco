import { EventData, EventResponse } from '@/types/event'
import { notFound } from 'next/navigation'

async function getEvent(slug: string): Promise<EventData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch article')
  }

  const data: EventResponse = await res.json()
  return data.data[0]
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  })

  const events: EventResponse = await res.json()

  return events.data.map(event => ({
    slug: event.slug,
  }))
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const event = await getEvent(slug)

  if (!event) notFound()

  return (
    <article className="my-section">
      <div className="prose mx-auto prose-lg "></div>
    </article>
  )
}
