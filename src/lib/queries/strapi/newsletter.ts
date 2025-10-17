export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return res.json();
}