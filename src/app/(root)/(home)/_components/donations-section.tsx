'use client';

import dynamic from 'next/dynamic';

const DonationsCombined = dynamic(() => import('@/components/donations-combined'), { ssr: false });

export default function DonationsSection() {
  return (
    <section className="py-12" suppressHydrationWarning>
      <DonationsCombined />
    </section>
  );
}
