import ContentRenderer from '@/components/content-renderer'
import { EventActions } from '@/components/event-actions'
import { Icons } from '@/components/icons'
import { formatTime } from '@/lib/formatters'
import { EventData, EventResponse } from '@/types/event'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { testConfig } from '@/app/config'

// Destructure config values
export const { dynamic, revalidate } = testConfig

async function getEvent(slug: string): Promise<EventData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch event')
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
      <div className="prose mx-auto prose-lg prose-img:rounded-lg">
        <h1>{event?.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground -mt-4">
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

        <EventActions event={event} variant="detail" className="my-8" />

        {event?.image && (
          <div className="relative h-[400px] rounded-lg overflow-clip mb-8">
            <Image
              src={event.image.formats?.large?.url || event.image.url}
              alt={event.image.alternativeText || event.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {event.content && <ContentRenderer content={event.content} />}
      </div>
    </article>
  )
}
