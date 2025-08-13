import { STATIC_CONFIG } from '@/constants/cache'
import { EventData, EventResponse } from '@/types/event'
import { notFound } from 'next/navigation'

export async function getEvent(slug: string): Promise<EventData | undefined> {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
    
  )

  if (!res.ok) {
    throw new Error('Failed to fetch event')
  }

  // Local override of EventResponse to ensure correct array shape from Strapi
type EventResponse = {
  data: EventData[]
}

// Guard against missing events (e.g., invalid slug)
  const data: EventResponse = await res.json()
  if (!data.data || data.data.length === 0) {
    notFound();
}
  console.log('Fetched event:', data.data.length)
  
  return data.data[0]; // Return unwrapped event list for direct component usage
}

export async function getUpcomingEvents(id?: string){
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[isPastEvent][$eq]=false&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  const data = await res.json()
  return data.data
}


export async function getAllActiveEvents() {
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events?filters[isPastEvent][$eq]=false&sort=date:asc&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  type EventResponse = {
  data: EventData[]
}
  const data: EventResponse = await res.json()
  return data.data
}
