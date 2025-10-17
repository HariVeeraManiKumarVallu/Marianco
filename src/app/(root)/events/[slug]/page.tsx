import React from 'react';
import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/queries/strapi/event';

export const revalidate = 60;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return []; // avoid CMS fetch during build
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug).catch(() => undefined);
  if (!event) notFound();
  return <div />; // TODO: render details
}
