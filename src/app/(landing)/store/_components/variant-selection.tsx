'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Product } from '@/types/product'
import Image from 'next/image'
import { useState } from 'react'

export default function VariantSelection({
  variants,
  images,
}: {
  variants: Product['variants']
  images: Product['images']
}) {
  const colors = new Map()
  const sizes = new Map()

  variants.forEach(variant => {
    variant.options.forEach(option => {
      if (option.type === 'color' && !colors.has(option.id)) {
        colors.set(option.id, {
          src: images.find(
            image => image.variantIds.includes(variant.id) && image.is_default
          )?.src,
          ...option,
        })
      } else if (option.type === 'size' && !sizes.has(option.id)) {
        sizes.set(option.id, option)
      }
    })
  })

  const [selectedColor, setSelectedColor] = useState<number>(
    [...colors.keys()][0]
  )
  const [selectedSize, setSelectedSize] = useState<number>([...sizes.keys()][0])

  console.log(selectedColor, selectedSize)

  const selectedVariant = variants.find(
    variant =>
      variant.options.some(option => option.id === selectedColor) &&
      variant.options.some(option => option.id === selectedSize)
  )

  console.log(images)

  const selectedImage = images.find(
    image => image.variantIds.includes(selectedVariant!.id) && image.is_default
  )

  return (
    <div>
      <div className="flex gap-8 items-center">
        {[...colors.values()].map(color => (
          <div
            key={color.id}
            className="my-8 text-center tracking-wide space-y-2"
          >
            <p className={selectedColor === color.id ? 'visible' : 'invisible'}>
              {color.name}
            </p>
            <Button
              variant={'ghost'}
              size="icon"
              className={cn(
                {
                  'outline-brand-blue-900 outline-4':
                    color.id === selectedColor,
                  'outline-muted-foreground outline-2':
                    color.id !== selectedColor,
                },
                'size-24 rounded-md  outline outline-offset-2'
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(color.id)}
            >
              <Image
                src={color.src}
                alt=""
                width={96}
                height={96}
                className="object-cover"
              />
              <span className="sr-only">{color.value}</span>
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {[...sizes.values()].map(size => (
          <Button
            key={size.id}
            variant={'ghost'}
            className="  outline-black outline-offset-2 outline-1 outline"
          >
            {size.value}
          </Button>
        ))}
      </div>
    </div>
  )
}
