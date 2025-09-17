export async function subscribeToNewsletter(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newsletter/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    throw new Error('Failed to subscribe to newsletter');
  }

  return res.json();
}