import { EventData, EventResponse } from '@/types/event'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ContentRenderer from '@/components/content-renderer'
import { Icons } from '@/components/icons'
import { formatTime } from '@/lib/formatters'
import { EventActions } from '@/components/event-actions'

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
    <article className="prose mx-auto prose-lg max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      
      <div className="flex items-center gap-4 text-gray-600 mb-8">
        <div className="flex items-center gap-2">
          <Icons.calender className="size-4" />
          {new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center gap-2">
          <Icons.clock className="size-4" />
          {formatTime(event.time)}
        </div>
        <div className="flex items-center gap-2">
          <Icons.mapPin className="size-4" />
          {event.location}
        </div>
      </div>

      <EventActions event={event} variant="detail" className="mb-8" />
      
      {event.image?.url && (
        <div className="relative w-full aspect-video mb-8">
          <Image
            src={event.image.url}
            alt={event.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <ContentRenderer content={event.content} />
    </article>
  )
}
