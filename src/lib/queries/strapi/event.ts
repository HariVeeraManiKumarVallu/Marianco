import { STATIC_CONFIG } from '@/constants/cache'
import { EventData } from '@/types/event'
import { notFound } from 'next/navigation'

const rawBase = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const apiBase = rawBase.replace(/\/$/, '');
const build = (p: string) => `${apiBase}/${p.replace(/^\/+/, '')}`;

export async function getEvent(): Promise<EventData | undefined> {

  const res = await fetch(
    build('events'),
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

export async function getUpcomingEvents() {
  const base = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '');
  const url = new URL(`${base}/events`);
  // Temporarily remove isPastEvent filter until data seeded; re-add later
  // url.searchParams.set('filters[isPastEvent][$eq]', 'false');
  url.searchParams.set('populate', '*');
  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function getAllActiveEvents() {
  const base = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '');
  const res = await fetch(`${base}/events?populate=*`, {
    cache: 'force-cache',
    next: { revalidate: 300 }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}
