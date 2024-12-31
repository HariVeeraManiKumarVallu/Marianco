'use client'
import { Button } from '@/components/ui/button'
import { useCartStore, type CartItem, } from '@/store/cart-store'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

type CartItemProps = {
  item: CartItem
}

export default function CartItem({
  item,
}: CartItemProps) {
  const { updateQuantity, increaseQuantity, decreaseQuantity, removeItem } = useCartStore()
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-24">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3>{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          ${item.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => decreaseQuantity(item.variantId)}
            disabled={item.quantity === 1}
          >
            -
          </Button>
          <Input className='w-16 text-center' value={item.quantity} onChange={(e) => updateQuantity(id, e.target.value)} />

          <Button
            variant="outline"
            size="icon"
            onClick={() => increaseQuantity(item.variantId)}
          >
            +
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeItem(item.variantId)}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  )
}
