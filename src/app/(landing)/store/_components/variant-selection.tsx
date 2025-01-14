'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { selectedVariantAtom } from '@/store/variant-atom'

import { OptionType, OptionValue, Product } from '@/types/product'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

export default function VariantSelection({
  variants,
  options,
}: {
  variants: Product['variants']
  options: Map<
    OptionType['type'],
    (Omit<OptionValue, 'optionType'>)[]
  >
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom)

  const selectedOptions = useMemo(() =>
    Object.fromEntries([...options.keys()].map(k => ([
      [k], searchParams.get(k) || options.get(k)?.[0].title
    ])))
    , [options, searchParams]
  )

  const findVariant = useCallback(
    (
      options: string[]
    ) => {
      return variants.find(variant =>
        options.every(option =>
          variant.options.some(variantOption => variantOption.title === option)
        )
      )
    },
    [variants]
  )

  useEffect(() => {
    const selectedVariant = findVariant(Object.values(selectedOptions))
    if (!selectedVariant) return
    setSelectedVariant(selectedVariant)
  }, [findVariant, selectedOptions, setSelectedVariant])

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

      {options.has('color') && options.get('color')!.length > 0 ? (
        <div className="flex gap-4 mt-8 flex-wrap items-center">
          {options.get('color')?.map(color => (
            <div
              key={color.optionId}
              className="text-center tracking-wide space-y-2"
            >
              <p
                className={
                  selectedOptions.color === color.title ? 'visible' : 'invisible'
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
                      color.title === selectedOptions.color,
                    'outline-muted-foreground outline-1':
                      color.title !== selectedOptions.color,
                  },
                  'size-24 rounded-sm overflow-clip outline'
                )}
                onClick={handleVariantSelection('color', color.title)}
              >
                <Image
                  src={color.previewUrl ?? '/placeholder.png'}
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
      ) : null}

      {
        options.has('size') && options.get('size')!.length > 0 ?
          <div className="mt-8">
            <h6 className="mb-4">Choose Size</h6>
            <div className="flex gap-2 flex-wrap items-center">
              {options.get('size')!.map(size => {
                const isAvailable = findVariant(
                  Object.values({ ...selectedOptions, size: size.title }
                  ))?.isAvailable
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
                          isAvailable && size.title === selectedOptions.size,
                        'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900':
                          size.title !== selectedOptions.size,
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
          </div> : null
      }

      {options.has('paper') && options.get('paper')!.length > 0 ?
        <div className="mt-6">
          <h6 className="mb-4">Choose Paper Type</h6>
          <div className="flex gap-2 flex-wrap items-center">
            {options.get('paper')!.map(paper => {
              const isAvailable = findVariant(
                Object.values({ ...selectedOptions, paper: paper.title }
                ))?.isAvailable

              return (
                <Button
                  key={paper.optionId}
                  variant={'outline'}
                  size={'sm'}
                  disabled={!isAvailable}
                  className={cn(
                    {
                      'border-brand-blue-900 text-brand-blue-900':
                        isAvailable && paper.name === selectedOptions.paper,
                      'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900':
                        paper.name !== selectedOptions.paper,
                      'line-through border-muted-foreground': !isAvailable,
                    },
                    'text-lg'
                  )}
                  aria-label="size"
                  onClick={handleVariantSelection('page', paper.title)}
                >
                  {paper.title}
                </Button>
              )
            })}
          </div>
        </div> : null}
    </div>
  )
}
