'use client'
import { Button } from '@/components/ui/button'
import { useCartStore, type CartItem, } from '@/store/cart-store'
import { Minus, Plus, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { formatAmount } from '@/lib/formatters'
import { AVAILABLE_CURRENCIES } from '@/constants/currency'

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
          {formatAmount(item.price / 100, AVAILABLE_CURRENCIES.USD)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="border-2 border-stone-200 flex items-center rounded-md gap-2">
            <Button
              variant="ghost"
              className='rounded-none'
              size="icon"
              onClick={() => decreaseQuantity(item.skuId)}
              disabled={item.quantity === 1}
            >
              <Minus />
            </Button>
            <Input id='number' className='w-12 text-center border-none rounded-none' type="number" value={item.quantity} onChange={(e) => updateQuantity(item.skuId, Number(e.target.value))} />
            <Button
              className='rounded-none'
              variant="ghost"
              size="icon"
              onClick={() => increaseQuantity(item.skuId)}
            >
              <Plus />
            </Button>
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeItem(item.skuId)}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  )
}
