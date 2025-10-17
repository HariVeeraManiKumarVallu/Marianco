'use client';
import { useEffect, useRef, useState } from 'react';
import { createOneTimeDonation, createRecurringDonation } from '@/lib/donations';
import './donation-square.css';

// Allows overriding plan ID from parent if needed
interface DonationsCombinedProps { planVariationId?: string; }

export default function DonationsCombined({ planVariationId }: DonationsCombinedProps) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [amount, setAmount] = useState(2500); // cents
  const [email, setEmail] = useState('');
  const [nonce, setNonce] = useState<string | null>(null);
  const cardRef = useRef<any>(null);

  const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID!;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
  const env = (process.env.NEXT_PUBLIC_SQUARE_ENV || 'sandbox').toLowerCase();
  const planId = planVariationId || process.env.NEXT_PUBLIC_SQUARE_PLAN_ID;

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        if (!appId || !locationId) {
          setMsg('Square configuration missing'); return;
        }
        const payments = (window as any).Square?.payments?.(appId, locationId);
        if (!payments) { setMsg('Square SDK not available'); return; }
        const card = await payments.card();
        await card.attach('#square-card-container');
        if (mounted) cardRef.current = card;
      } catch (e: any) {
        setMsg(e?.message || 'Failed to initialize Square');
      }
    }

    if (!(window as any).Square) {
      const s = document.createElement('script');
      s.src = env === 'production' ? 'https://web.squarecdn.com/v1/square.js' : 'https://sandbox.web.squarecdn.com/v1/square.js';
      s.async = true;
      s.onload = init;
      s.onerror = () => setMsg('Failed to load Square SDK');
      document.body.appendChild(s);
    } else {
      init();
    }

    return () => { mounted = false; };
  }, [appId, locationId, env]);

  async function tokenize() {
    if (!cardRef.current) return null;
    const result = await cardRef.current.tokenize();
    if (result?.status === 'OK' && result.token) {
      setNonce(result.token);
      return result.token;
    }
    setMsg('Card tokenization failed');
    return null;
  }

  async function handleOneTime() {
    setMsg(null); setLoading(true);
    try {
      if (!email) { setMsg('Email is required'); return; }
      const tok = await tokenize();
      if (!tok) return;
      const r = await createOneTimeDonation({ email, amount, nonce: tok, currency: 'USD' });
      setMsg(r?.success ? 'Thank you! Your donation was successful.' : (r?.error || 'Donation failed'));
    } catch (e: any) {
      setMsg(e?.message || 'Donation failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleRecurring() {
    setMsg(null); setLoading(true);
    try {
      if (!planId) { setMsg('Plan ID not configured'); return; }
      if (!email) { setMsg('Email is required'); return; }
      const tok = nonce || await tokenize();
      if (!tok) return;
      const r = await createRecurringDonation({ email, nonce: tok, planId });
      setMsg(r?.success ? 'Your monthly subscription is active. Thank you!' : (r?.error || 'Subscription failed'));
    } catch (e: any) {
      setMsg(e?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="donation-card-root">
      <div className="flex flex-col gap-2">
        <label className="donation-label" htmlFor="email">Email</label>
        <input id="email" type="email" className="border px-3 py-2 rounded text-sm" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="donation-label" htmlFor="amount">Amount (USD)</label>
        <input id="amount" type="number" min={1} className="border px-3 py-2 rounded text-sm" value={amount / 100} onChange={e => setAmount(Math.round(Number(e.target.value || 0) * 100))} />
      </div>

      <div id="square-card-container" className="donation-card-container" />

      <div className="flex gap-3">
        <button type="button" className="donation-button" onClick={handleOneTime} disabled={loading}>
          {loading ? 'Processing...' : 'Donate Once'}
        </button>
        <button type="button" className="donation-button" onClick={handleRecurring} disabled={loading || !planId}>
          {loading ? 'Starting...' : 'Start Monthly'}
        </button>
      </div>

      {msg && <p className="donation-message">{msg}</p>}
      {!planId && <p className="donation-message">Monthly plan ID missing</p>}
    </section>
  );
}