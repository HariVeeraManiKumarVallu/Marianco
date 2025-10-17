const API = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '');

export async function createOneTimeDonation(input: { email: string; amount: number; nonce: string; currency?: string }) {
  const res = await fetch(`${API}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Donation failed: ${res.status}`);
  return res.json();
}

export async function createRecurringDonation(input: { email: string; nonce: string; planId?: string }) {
  const res = await fetch(`${API}/donations/recurring`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Subscription failed: ${res.status}`);
  return res.json();
}