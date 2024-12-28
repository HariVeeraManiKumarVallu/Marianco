'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { selectedVariantAtom } from '@/store/variant-atom'

import { Option, Product } from '@/types/product'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function VariantSelection({
  variants,
  options,
  images,
}: {
  variants: Product['variants']
  options: Map<
    Option['type'],
    (Pick<Option, 'optionId' | 'title' | 'name'> & { src?: string })[]
  >
  images: Product['images']
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  // const colors = new Map()
  // const sizes = new Map()
  // const paper = new Map()
  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom)

  // variants.forEach(variant => {
  //   variant.options.forEach(option => {
  //     if (option.type === 'color' && !colors.has(option.name)) {
  //       colors.set(option.name, {
  //         src: images.find(
  //           image => image.variantIds.includes(variant.id) && image.is_default
  //         )?.src,
  //         ...option,
  //       })
  //     } else if (option.type === 'size' && !sizes.has(option.name)) {
  //       sizes.set(option.name, option)
  //     } else if (option.type === 'paper' && !paper.has(option.name)) {
  //       paper.set(option.name, option)
  //     }
  //   })
  // })

  console.log({ options })
  const selectedColor = searchParams.get('color') || options.get('color')?.[0]
  const selectedSize = searchParams.get('size') || options.get('size')?.[0]
  const selectedPaper = searchParams.get('paper') || options.get('paper')?.[0]

  console.log(variants)

  const isAvailable = true
  const findVariant = useCallback(
    (
      selectedOptions: string[]
    ) => {
      return variants.find(variant =>
        selectedOptions.every(selectedOption =>
          variant.options.some(option => option.title === selectedOption)
        )
      )
    },
    [variants]
  )

  useEffect(() => {
    console.log({ selectedColor, selectedSize, selectedPaper })
    // setSelectedVariant(findVariant('name', [selectedPaper, selectedSize])!.id)
  }, [
  ])

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
      {options.has('color') && (
        <div className="flex gap-4 mt-8 flex-wrap items-center">
          {options.get('color')?.map(color => (
            <div
              key={color.optionId}
              className="text-center tracking-wide space-y-2"
            >
              <p
                className={
                  selectedColor === color.title ? 'visible' : 'invisible'
                }
              >
                {color.title}
              </p>
              <Button
                variant={'icon'}
                size="none"
                className={cn(
                  {
                    'outline-brand-blue-900 outline-2':
                      color.title === selectedColor,
                    'outline-muted-foreground outline-1':
                      color.title !== selectedColor,
                  },
                  'size-24 rounded-sm overflow-clip outline'
                )}
                onClick={handleVariantSelection('color', color.title)}
              >
                <Image
                  src={color.src ?? '/placeholder.png'}
                  alt=""
                  width={96}
                  height={96}
                  className="object-cover"
                />
                <span className="sr-only">{color.title}</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <h6 className="mb-4">Choose Size</h6>
        <div className="flex gap-2 flex-wrap items-center">
          {options.get('size').map(size => {
            const isAvailable = findVariant([
              selectedColor,
              size.title,
            ])?.isAvailable
            return (
              <Button
                key={size.optionId
                }
                variant={'outline'}
                size={'sm'}
                disabled={!isAvailable}
                className={cn(
                  {
                    'border-brand-blue-900 text-brand-blue-900':
                      isAvailable && size.title === selectedSize,
                    'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900':
                      size.title !== selectedSize,
                    'line-through border-muted-foreground': !isAvailable,
                  },
                  'text-lg'
                )}
                aria-label="size"
                onClick={handleVariantSelection('size', size.title)}
              >
                {size.title}
              </Button>
            )
          })}
        </div>
      </div>

      {/* <div className="mt-6">
        <h6 className="mb-4">Choose Paper Type</h6>
        <div className="flex gap-2 flex-wrap items-center">
          {[...paper.values()].map(paper => {
            const isAvailable = findVariant('name', [
              selectedSize,
              paper.name,
            ])?.isAvailable

            return (
              <Button
                key={paper.id}
                variant={'outline'}
                size={'sm'}
                disabled={!isAvailable}
                className={cn(
                  {
                    'border-brand-blue-900 text-brand-blue-900':
                      isAvailable && paper.name === selectedPaper,
                    'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900':
                      paper.name !== selectedPaper,
                    'line-through border-muted-foreground': !isAvailable,
                  },
                  'text-lg'
                )}
                aria-label="size"
                onClick={handleVariantSelection('page', paper.name)}
              >
                {paper.value}
              </Button>
            )
          })}
        </div>
      </div> */}
    </div>
  )
}
