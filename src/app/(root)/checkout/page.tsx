'use client'
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/services/load-stripe';
import { useEffect, useState } from 'react';
import CheckoutForm from '@/components/forms/checkout-form';
import { useCartStore } from '@/store/cart-store';
import { useAtomValue } from 'jotai';
import { selectedCurrencyAtom } from '@/store/currency-atom';
import OrderSummary from './order-summary';
import { OrderSummaryItem } from '@/types/product';

const stripePromise = getStripe()

export default function CheckoutPage() {

  const [clientSecret, setClientSecret] = useState("");
  const [orderItems, setOrderItems] = useState<OrderSummaryItem[] | null>(null)
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false);

  console.log(shippingCost)

  const { cartItems } = useCartStore()
  const currency = useAtomValue(selectedCurrencyAtom)

  useEffect(() => {
    setConfirmed(new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    ));
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) return
    async function fetchClientSecret() {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency, items: cartItems.map(({ price, imageSrc, title, ...item }) => item) }),
      })
      const data: {
        clientSecret: string
        items: OrderSummaryItem[]
        totalAmount: number
      } = await res.json()
      setClientSecret(data.clientSecret)
      setOrderItems(data.items.map(item => ({ ...item, price: item.price / 100 })))
      setSubtotal(data.totalAmount / 100)
    }

    fetchClientSecret()
  }, [cartItems])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  } as any

  if (!clientSecret || !orderItems) return null

  return (
    <section className="py-32 lg:py-section">
      <div className="container ">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
        <div className='flex items-start gap-8 py-12 px-4 sm:px-6 lg:px-8'>
          <OrderSummary items={orderItems} subtotal={subtotal} shippingCost={shippingCost} />
          <Elements stripe={stripePromise} options={options} >
            <CheckoutForm lineItems={orderItems.map(item => ({ sku: item.sku, quantity: item.quantity }))} setShippingCost={setShippingCost} />
          </Elements>
        </div>
      </div>
    </section>
  )
}

