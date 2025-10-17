import { STATIC_CONFIG } from '@/constants/cache'

const API = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '');
const fallback = [
  { id: 1, attributes: { name: 'Placeholder Member', role: 'Role', bio: 'Replace with real data', hierarchy: 999 } }
];

export async function getTeamMembers() {
  try {
    const res = await fetch(`${API}/team-members?sort=hierarchy&populate=image`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    const json = await res.json();
    return Array.isArray(json?.data) && json.data.length ? json.data : fallback;
  } catch {
    return fallback;
  }
}
