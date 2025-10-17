const API_BASE = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

export async function fetchSponsors() {
  const res = await fetch(`${API_BASE}/sponsors`);
  if (!res.ok) throw new Error('Failed sponsors');
  return res.json();
}