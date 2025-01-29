"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "../ui/separator";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stripe, StripePaymentElementOptions } from "@stripe/stripe-js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShippingAddressComplete, setIsShippingAddressComplete] = useState(false)

  const handleSubmit = async (e) => {
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
    business: { name: 'test' },
  } satisfies StripePaymentElementOptions

  async function handleShippingAddress() {
    const addressElement = elements.getElement('address', { mode: 'shipping' });

    const { complete, value } = await addressElement.getValue();
    console.log({ complete, value })

    if (complete) {
      setIsShippingAddressComplete(complete)
      // Allow user to proceed to the next step
      // Optionally, use value to store the address details
    }
  }

  return (
    <Card className='w-96 border-slate-200'>
      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <h3 className="">Shipping Address</h3>
            <Check strokeWidth="2.5" className={cn('text-green-500', { hidden: !isShippingAddressComplete })} />
          </CardTitle>
        </CardHeader>
        <CardContent className={`transition-all duration-500 ${!isShippingAddressComplete ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <AddressElement options={{ mode: 'shipping' }} />
        </CardContent>
        <CardFooter>
          <Button type='button' className="w-full " onClick={handleShippingAddress}>Procceed to Payment</Button>
        </CardFooter>
      </Card>

      <div className="px-6 mt-4">
        <Separator className='bg-stone-200' />
      </div>

      <Card className='border-none shadow-none'>
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>
              <h3 className="">Payment Details</h3>
            </CardTitle>
          </CardHeader>
          <div className={`transition-all duration-700  ${isShippingAddressComplete ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}>
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
          </div>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </Card>
    </ Card >
  );


}
