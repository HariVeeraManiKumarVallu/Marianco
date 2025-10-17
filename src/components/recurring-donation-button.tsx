'use client';
import { useState } from 'react';
import { createRecurringDonation } from '@/lib/donations';

export default function RecurringDonationButton({ email, nonce }: { email: string; nonce: string | null }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const planId = process.env.NEXT_PUBLIC_SQUARE_PLAN_ID;
  const disabled = loading || !planId || !nonce || !email;

  async function start() {
    if (disabled) return;
    setMsg('');
    setLoading(true);
    try {
      const r = await createRecurringDonation({ email, nonce: nonce!, planId });
      setMsg(r.subscriptionId || r.subscription?.id || r.mock ? 'Subscription started!' : 'Failed');
    } catch (e: any) {
      setMsg(e?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button type="button" disabled={disabled} onClick={start} className="donation-button">
        {loading ? 'Starting…' : 'Start Monthly Donation'}
      </button>
      {!planId && <p className="donation-message">Plan ID missing</p>}
      {msg && <p className="donation-message">{msg}</p>}
    </div>
  );
}