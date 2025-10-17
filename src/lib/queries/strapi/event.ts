import { STATIC_CONFIG } from '@/constants/cache'
import { EventData, EventResponse } from '@/types/event'

const rawBase = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const apiBase = rawBase.replace(/\/$/, '');
const build = (p: string) => `${apiBase}/${p.replace(/^\/+/, '')}`;

export async function getEvent(slug?: string): Promise<EventData | undefined> {
  const base = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events`;
  const url = slug
    ? `${base}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    : `${base}?populate=*`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  });
  if (!res.ok) return undefined;

  const data: EventResponse = await res.json();
  return data.data?.[0];
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
  } as any);
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}
