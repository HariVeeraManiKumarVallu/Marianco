'use client'
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/services/load-stripe';
import { useEffect, useState } from 'react';
import CheckoutForm from '@/components/forms/checkout-form';
import { useCartStore } from '@/store/cart-store';
import OrderSummary from './order-summary';
import { OrderSummaryItem } from '@/types/product';
import PaymentProcessing from './payment-processing';
import { AVAILABLE_CURRENCIES } from '@/constants/currency';

const stripePromise = getStripe()

export default function CheckoutPage() {

  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("")
  const [orderItems, setOrderItems] = useState<OrderSummaryItem[] | null>(null)
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [paymentIntentConfirmed, setPaymentIntentConfirmed] = useState(false);

  const { cartItems } = useCartStore()

  useEffect(() => {
    setPaymentIntentConfirmed(!!new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    ));
  });

  useEffect(() => {
    if (cartItems.length === 0) return
    async function fetchClientSecret() {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency: AVAILABLE_CURRENCIES.USD.title, items: cartItems.map(({ price, imageSrc, title, ...item }) => item) }),
      })
      const data: {
        clientSecret: string
        intentId: string
        items: OrderSummaryItem[]
        totalAmount: number
      } = await res.json()

      setClientSecret(data.clientSecret)
      setIntentId(data.intentId)
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
      <Elements stripe={stripePromise} options={options} >
        {paymentIntentConfirmed ? <PaymentProcessing /> :
          <div className="container ">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
            <div className='flex items-start gap-8 py-12 px-4 sm:px-6 lg:px-8'>
              <OrderSummary items={orderItems} subtotal={subtotal} shippingCost={shippingCost} />
              <CheckoutForm intentId={intentId} lineItems={orderItems.map(item => ({ sku: item.sku, quantity: item.quantity }))} setShippingCost={setShippingCost} />
            </div>
          </div>}
      </Elements>
    </section>
  )
}

