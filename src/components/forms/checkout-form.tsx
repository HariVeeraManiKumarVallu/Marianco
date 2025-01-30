"use client";

import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { updateShippingCost, updateShippingCostAction } from "@/actions/shipping";
import { LoaderCircle } from "lucide-react";

type CheckoutFormProps = {
  intentId: string
  lineItems: {
    sku: string
    quantity: number
  }[]
  setShippingCost: Dispatch<SetStateAction<number | null>>
}

export default function CheckoutForm({ lineItems, setShippingCost, intentId }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [isShippingAddressComplete, setIsShippingAddressComplete] = useState(false)

  const paymentContainerRef = useRef<null | HTMLDivElement>(null)

  const { toast } = useToast()

  const handlePayment = async () => {

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return null
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout",
      },
    });

    console.log(error)

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Error',
        description: 'An unexpected error occured.',
        variant: 'destructive'
      });
    }

    setIsLoading(false);
  };

  async function handleShippingAddress() {
    const addressElement = elements?.getElement('address', { mode: 'shipping' });
    const paymentElement = elements?.getElement('payment')
    if (!addressElement || !paymentElement) return

    setIsLoading(true);

    const { complete, value } = await addressElement.getValue();

    if (complete) {
      const response = await updateShippingCostAction(intentId, {
        country: value.address.country,
        city: value.address.city,
        adress1: value.address.line1,
        adress2: value.address.line2,
        region: value.address.state,
        zip: value.address.postal_code,
      })

      if (response.error) {
        toast({
          title: 'Error',
          description: 'Unable to fetch shipping cost, please try again!',
          variant: 'destructive'
        })
      }

      if (response.data) {
        setShippingCost(response.data / 100)
        setIsShippingAddressComplete(complete)
      }
    }
    setIsLoading(false)

    addressElement.blur()
    paymentElement.focus()
    paymentContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  const paymentElementOptions = {
    layout: {
      type: 'tabs'
    },
    readOnly: !isShippingAddressComplete,
  } satisfies StripePaymentElementOptions

  if (!stripe || !elements) return null

  return (
    <div className='w-96 space-y-12 '>
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
          <Button type='button' disabled={isShippingAddressComplete || !stripe || !elements} className="w-full " onClick={handleShippingAddress}> <span >
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Proceed to payment"}
          </span>
          </Button>
        </CardFooter>
      </Card>

      <Card ref={paymentContainerRef} className={cn('relative', {
        'opacity-60 border-slate-200': !isShippingAddressComplete
      })}>
        {!isShippingAddressComplete ? <div className='absolute inset-0 opacity-0 z-[1000] rounded-lg' /> : null}
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
          <Button type='button' onClick={handlePayment} disabled={isLoading || !stripe || !elements || !isShippingAddressComplete} className="w-full " id="submit">
            <span >
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Pay now"}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </ div >
  );


}
