"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getShippingCost } from "@/actions/shipping";
import { useToast } from "@/hooks/use-toast";

type CheckoutFormProps = {
  lineItems: {
    sku: string
    quantity: number
  }[]
  setShippingCost: Dispatch<SetStateAction<number | null>>
}

export default function CheckoutForm({ lineItems, setShippingCost }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const { toast } = useToast()

  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShippingAddressComplete, setIsShippingAddressComplete] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return null
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: {
      type: 'tabs'
    },
    readOnly: !!isShippingAddressComplete,
  } satisfies StripePaymentElementOptions

  async function handleShippingAddress() {
    const addressElement = elements?.getElement('address', { mode: 'shipping' });
    if (!addressElement) return

    const { complete, value } = await addressElement.getValue();

    if (complete) {
      const response = await getShippingCost(lineItems, {
        country: value.address.country,
        city: value.address.city,
        adress1: value.address.line1,
        adress2: value.address.line2,
        region: value.address.state,
        zip: value.address.postal_code,
      })

      if (response.error) {
        return toast({
          title: 'Error',
          description: 'Unable to fetch shipping cost, please try again!',
          variant: 'destructive'
        })
      }

      setShippingCost(response.data / 100)
      setIsShippingAddressComplete(complete)
    }
  }

  return (
    <div className='w-96 space-y-12'>
      <Card className={cn('relative', {
        'opacity-60  border-slate-200': isShippingAddressComplete
      })}>
        {isShippingAddressComplete ? <div className='absolute inset-0 opacity-0 z-[1000] rounded-lg' /> : null}
        <CardHeader>
          <CardTitle >
            <h3 >Shipping Address</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddressElement options={{ mode: 'shipping' }} />
        </CardContent>
        <CardFooter>
          <Button type='button' disabled={isShippingAddressComplete || !stripe || !elements} className="w-full " onClick={handleShippingAddress}>Procceed to Payment</Button>
        </CardFooter>
      </Card>

      <Card className={cn('relative', {
        'opacity-60 border-slate-200': !isShippingAddressComplete
      })}>
        {!isShippingAddressComplete ? <div className='absolute inset-0 opacity-0 z-[1000] rounded-lg' /> : null}
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>
              <h3 >Payment Details</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentElement options={paymentElementOptions} />
            <AddressElement options={{ mode: 'billing' }} />
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading || !stripe || !elements || !isShippingAddressComplete} className="w-full " id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </Button>
          </CardFooter>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </Card>
    </ div >
  );


}
