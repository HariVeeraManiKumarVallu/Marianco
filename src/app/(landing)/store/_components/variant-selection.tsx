'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { selectedVariantAtom } from '@/store/variant-atom'

import { Product } from '@/types/product'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function VariantSelection({
  variants,
  images,
}: {
  variants: Product['variants']
  images: Product['images']
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const colors = new Map()
  const sizes = new Map()
  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom)

  variants.forEach(variant => {
    variant.options.forEach(option => {
      if (option.type === 'color' && !colors.has(option.name)) {
        colors.set(option.name, {
          src: images.find(
            image => image.variantIds.includes(variant.id) && image.is_default
          )?.src,
          ...option,
        })
      } else if (option.type === 'size' && !sizes.has(option.name)) {
        sizes.set(option.name, option)
      }
    })
  })

  const selectedColor = searchParams.get('color') || [...colors.keys()][0]
  const selectedSize = searchParams.get('size') || [...sizes.keys()][0]

  function findVariant(
    optionKey: keyof Product['variants'][0]['options'][0],
    values: string[]
  ) {
    return variants.find(variant =>
      values.every(value =>
        variant.options.some(option => option[optionKey] === value)
      )
    )
  }

  useEffect(() => {
    setSelectedVariant(findVariant('name', [selectedColor, selectedSize])!.id)
  }, [findVariant, selectedColor, selectedSize, setSelectedVariant])

  // const selectedVariant = findVariant('name', [selectedColor, selectedSize])

  function handleVariantSelection(variant: string, value: string) {
    return () => {
      const params = new URLSearchParams(searchParams)
      params.set(variant, value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div>
      <span className="inline-block mt-4 text-xl font-semibold">
        {selectedVariant?.price ? selectedVariant?.price / 100 : null}
      </span>
      <div className="flex gap-4 mt-8 flex-wrap items-center">
        {[...colors.values()].map(color => (
          <div key={color.id} className="text-center tracking-wide space-y-2">
            <p
              className={selectedColor === color.name ? 'visible' : 'invisible'}
            >
              {color.name}
            </p>
            <Button
              variant={'icon'}
              size="none"
              className={cn(
                {
                  'outline-brand-blue-900 outline-2':
                    color.name === selectedColor,
                  'outline-muted-foreground outline-1':
                    color.name !== selectedColor,
                },
                'size-24 rounded-sm overflow-clip outline'
              )}
              onClick={handleVariantSelection('color', color.name)}
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

      <div className="mt-6">
        <h6 className="mb-4">Choose Size</h6>
        <div className="flex gap-2 flex-wrap items-center">
          {[...sizes.values()].map(size => {
            const isDisabled = !findVariant('name', [selectedColor, size.name])
              ?.isAvailable
            return (
              <Button
                key={size.id}
                variant={'outline'}
                size={'icon'}
                disabled={
                  !findVariant('name', [selectedColor, size.name])?.isAvailable
                }
                className={cn(
                  {
                    'border-brand-blue-900 text-brand-blue-900':
                      !isDisabled && size.name === selectedSize,
                    'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900':
                      size.name !== selectedSize,
                    'line-through border-muted-foreground': isDisabled,
                  },
                  'text-lg'
                )}
                aria-label="size"
                onClick={handleVariantSelection('size', size.name)}
              >
                {size.value}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
