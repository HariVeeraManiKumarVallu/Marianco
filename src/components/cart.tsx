'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import CartItem from './cart-item'
import { useCartStore } from '@/store/cart-store'
import { useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { formatAmount } from '@/lib/formatters'
import { AVAILABLE_CURRENCIES } from '@/constants/currency'

export default function Cart({
  variant = 'icon',
}: {
  variant?: 'icon' | 'full'
}) {
  const { cartItems, totalCartPrice, totalItems } = useCartStore()

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild className={(
        totalItems === 0 ? 'invisible' : 'visible'
      )}>
        {variant === 'icon' ? (
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="size-5" />
            <span className="sr-only">Open cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full size-5 text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        ) : (
          <Button variant="default" className="w-full mb-4">
            <ShoppingCart className="size-5" />
            <span>View Cart</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem
                  key={item.variantId}
                  item={item}
                />
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{formatAmount(totalCartPrice / 100, AVAILABLE_CURRENCIES.USD.title)}</span>
                </div>
                <SheetClose asChild>
                  <Button className="w-full mt-4" asChild>
                    <Link href={ROUTES.CHECKOUT}>
                      Proceed to checkout
                    </Link>
                  </Button>
                </SheetClose>
                {/* <Button */}
                {/*   className="w-full mt-4" */}
                {/*   onClick={async () => */}
                {/*     await handleStripeCheckoutSession<StoreCheckout>({ */}
                {/*       currency: 'USD', */}
                {/*       checkoutType: 'purchase', */}
                {/*       items: cartItems.map(({ price, ...item }) => item) */}
                {/*     })} */}
                {/* > */}
                {/*   Proceed To Checkout */}
                {/* </Button> */}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
