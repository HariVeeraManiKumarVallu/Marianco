const rawBase = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const apiBase = rawBase.replace(/\/$/, ''); // strip trailing slash if any
const build = (path: string) => `${apiBase}/${path.replace(/^\/+/, '')}`;

export async function getSponsors() {
  try {
    const res = await fetch(build('sponsors'), { cache: 'no-store' });
    if (res.status === 401 || res.status === 403) return [];
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}
