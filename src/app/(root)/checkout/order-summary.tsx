"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { OrderSummaryItem } from "@/types/product"
import { formatAmount } from "@/lib/formatters"
import { AVAILABLE_CURRENCIES } from "@/constants/currency"

export default function OrderSummary({ items, subtotal, shippingCost }: { items: OrderSummaryItem[], subtotal: number, shippingCost: number | null }) {

  const totalAmount = subtotal + (shippingCost ?? 0)

  return (
    <Card className="flex-1 border-slate-200 min-w-0">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex  gap-4 ">
            <div className={items.length === 1 ? "w-32 h-32" : "w-20 h-20"}>
              <Image
                src={item.imageSrc || "/placeholder.svg"}
                alt={''}
                width={items.length === 1 ? 128 : 80}
                height={items.length === 1 ? 128 : 80}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h5 className="font-medium mt-auto truncate">{item.title}</h5>
              <div className="flex gap-1 mt-auto justify-between  ">
                <p className="text-sm text-gray-500">{`Quantity: ${item.quantity}`}</p>
                <p className="text-base">{formatAmount(item.price, AVAILABLE_CURRENCIES.USD.title)}</p>
              </div>
            </div>

          </div>
        ))}
        <Separator className='bg-slate-300' />
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatAmount(subtotal, AVAILABLE_CURRENCIES.USD.title)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{!shippingCost ? 'Calculated at next step' : `${formatAmount(shippingCost, AVAILABLE_CURRENCIES.USD.title)}`}</span>
        </div>
        <Separator className='bg-slate-300' />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatAmount(totalAmount, AVAILABLE_CURRENCIES.USD.title)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

