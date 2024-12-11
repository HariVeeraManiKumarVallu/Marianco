'use client'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'

type CartItemProps = {
  item: any
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-24">
        <Image
          src={'/logo.png'}
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
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity === 1}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRemove(item.id)}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  )
}
