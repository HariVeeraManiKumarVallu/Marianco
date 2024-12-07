import { staticConfig } from '@/app/config'
import { EventResponse } from '@/types/event'

export async function getUpcomingEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[isPastEvent][$eq]=false&sort=date:asc&pagination[limit]=3&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: staticConfig.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  const data: EventResponse = await res.json()
  return data
}
