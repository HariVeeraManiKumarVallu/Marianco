'use client';

import dynamic from 'next/dynamic';

const DonationsCombinedSection = dynamic(
  () => import('@/components/donations-combined'),
  { ssr: false }
);

export default function DonatePage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-semibold mb-6">Support Us</h1>
      <DonationsCombinedSection />
    </main>
  );
}
