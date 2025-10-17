'use client';
import { useEffect, useRef, useState } from 'react';
import './donation-square.css';
import { createOneTimeDonation } from '@/lib/donations';

export default function DonationSquare() {
  const [card, setCard] = useState<any>(null);
  const [amount, setAmount] = useState('10');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const initRef = useRef(false);
  const [recurring, setRecurring] = useState(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    const init = async () => {
      const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
      if (!appId || !locId) { setMsg('Square env missing'); setLoading(false); return; }
      if (!(window as any).Square) {
        const s = document.createElement('script');
        s.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
        s.onload = init;
        s.onerror = () => { setMsg('Square load failed'); setLoading(false); };
        document.head.appendChild(s);
        return;
      }
      try {
        const payments = (window as any).Square.payments(appId, locId);
        const cardEl = await payments.card();
        await cardEl.attach('#card-container');
        setCard(cardEl);
        setLoading(false);
      } catch (e: any) {
        setMsg(e?.message || 'Init error'); setLoading(false);
      }
    };
    init();
  }, []);

  async function tokenize() {
    if (!card) return null;
    const r = await card.tokenize();
    if (r?.status !== 'OK' || !r.token) { setMsg('Tokenization failed'); return null; }
    return r.token;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    if (!email) { setMsg('Email required'); return; }
    setLoading(true);
    try {
      const nonce = await tokenize();
      if (!nonce) return;
      const cents = Math.round(parseFloat(amount || '0') * 100);
      await createOneTimeDonation({ email, amount: cents, nonce });
      setMsg('Thank you!');
    } catch (e: any) {
      setMsg(e?.message || 'Donation failed');
    } finally {
      setLoading(false);
    }
  }

  async function handlePayment(result: any) {
    // result should include cardId or source id if you vault card first
    const payload = {
      email,
      amount, // cents
      currency: 'USD',
      planId: process.env.NEXT_PUBLIC_SQUARE_PLAN_ID,
      cardId: result.cardId,
    };

    // align with createOneTimeDonation/createRecurringDonation base
    const API = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '');
    const url = recurring ? `${API}/donations/recurring` : `${API}/donations`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Donation failed');
    // ...existing success handling...
  }

  return (
    <>
      <form onSubmit={submit} className="donation-card-root">
        <label className="donation-label" htmlFor="d-email">Email</label>
        <input id="d-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="border px-3 py-2 rounded text-sm" />
        <label className="donation-label" htmlFor="d-amount">Amount (USD)</label>
        <input id="d-amount" type="number" min="1" value={amount} onChange={e=>setAmount(e.target.value)} className="border px-3 py-2 rounded text-sm" />
        <div id="card-container" className="donation-card-container" />
        <button disabled={loading} type="submit" className="donation-button">
          {loading ? 'Loading…' : 'Donate'}
        </button>
        {msg && <p className="donation-message">{msg}</p>}
      </form>
      <label style={{ display: 'block', marginTop: 8 }}>
        <input type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)} />
        {' '}Make this a monthly donation
      </label>
    </>
  );
}