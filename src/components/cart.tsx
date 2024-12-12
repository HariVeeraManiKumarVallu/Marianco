'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ROUTES } from '@/config/routes'
import { useCart } from '@/hooks/use-cart'
import { handleStripeCheckoutSession } from '@/lib/queries/stripe/checkout'
import { ShoppingCart } from 'lucide-react'
import { usePathname } from 'next/navigation'
import CartItem from './cart-item'

export default function Cart({
  variant = 'icon',
}: {
  variant?: 'icon' | 'full'
}) {
  const { items, total, removeItem, updateQuantity, totalItems } = useCart()
  // const { handleCheckout } = useCheckout()
  const pathname = usePathname()

  if (pathname !== ROUTES.STORE && totalItems === 0) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
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
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <>
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={async () =>
                    await handleStripeCheckoutSession({ items })
                  }
                >
                  Checkout with Stripe
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
