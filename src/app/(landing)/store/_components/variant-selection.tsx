'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { selectedVariantAtom } from '@/store/variant-atom'

import { OptionType, OptionValue, Product, Variant } from '@/types/product'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

type OptionTypesKey = OptionType['type']
type OptionTypesValue = Omit<OptionValue, 'optionType'>
type OptionValuesMap = Map<string, OptionValue>

export default function VariantSelection({
  optionTypes,
  optionValues,
  variantsMap
}: {
  optionTypes: Map<OptionTypesKey, OptionTypesValue[]>
  optionValues: OptionValuesMap
  variantsMap: Map<string, Variant>
}) {
  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const selectedOptions = useMemo(() =>
    new Map(
      optionTypes.keys().map(k => [k, optionValues.get(searchParams.get(k) as string)
        ?? optionTypes.get(k)?.[0]])
    ), [optionTypes, searchParams]
  )

  console.log(selectedOptions)
  useEffect(() => {
    const selectedOptionIds = [...selectedOptions.values()].map(v => v?.optionId).toSorted((a, b) => Number(a) - Number(b)).join('-')
    const selectedVariant = variantsMap.get(selectedOptionIds)
    console.log({ selectedOptionIds })
    if (!selectedVariant) return
    setSelectedVariant(selectedVariant)
  }, [selectedOptions, setSelectedVariant])

  function handleOptionSelection(optionType: string, value: string) {
    return () => {
      const params = new URLSearchParams(searchParams)
      params.set(optionType, value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div>
      <span className="inline-block mt-4 text-xl font-semibold">
        {selectedVariant?.price ? selectedVariant?.price / 100 : null}
      </span>

      {optionTypes.has('color') && optionTypes.get('color')!.length > 0 ? (
        <div className="flex gap-4 mt-8 flex-wrap items-center">
          {optionTypes.get('color')!.map(color => {
            const selectedColor = selectedOptions.get('color')
            if (!selectedColor) return null
            return (
              <div
                key={color.optionId}
                className="text-center tracking-wide space-y-2"
              >
                <p
                  className={
                    selectedOptions.get('color')?.title === color.title ? 'visible' : 'invisible'
                  }
                >
                  {color.title}
                </p>
                <Button
                  variant={'icon'}
                  size="none"
                  className={cn(
                    color.title === selectedColor.title ?
                      'outline-brand-blue-900 outline-2' :
                      'outline-muted-foreground outline-1'
                    ,
                    'size-24 rounded-sm overflow-clip outline'
                  )}
                  onClick={handleOptionSelection('color', color.title)}
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
            )
          })}
        </div>
      ) : null}

      {
        optionTypes.has('size') && optionTypes.get('size')!.length > 0 ?
          <div className="mt-8">
            <h6 className="mb-4">Choose Size</h6>
            <div className="flex gap-2 flex-wrap items-center">
              {optionTypes.get('size')!.map(size => {
                const selectedSize = selectedOptions.get('size')
                if (!selectedSize) return null

                const isAvailable = selectedVariant?.isAvailable
                return (
                  <Button
                    key={size.optionId
                    }
                    variant={'outline'}
                    size={'sm'}
                    disabled={!isAvailable}
                    className={cn(
                      isAvailable && size.title === selectedSize.title ?
                        'border-brand-blue-900 text-brand-blue-900' :
                        'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900',
                      {
                        'line-through border-muted-foreground': !isAvailable,
                      },
                      'text-lg'
                    )}
                    aria-label="size"
                    onClick={handleOptionSelection('size', size.title)}
                  >
                    {size.title}
                  </Button>
                )
              })}
            </div>
          </div> : null
      }

      {optionTypes.has('paper') && optionTypes.get('paper')!.length > 0 ?
        <div className="mt-6">
          <h6 className="mb-4">Choose Page Type</h6>
          <div className="flex gap-2 flex-wrap items-center">
            {optionTypes.get('paper')!.map(paper => {
              const selectedPaper = selectedOptions.get('paper')
              if (!selectedPaper) return null
              const isAvailable = selectedVariant?.isAvailable
              console.log(selectedVariant)

              return (
                <Button
                  key={paper.optionId}
                  variant={'outline'}
                  size={'sm'}
                  disabled={!isAvailable}
                  className={cn(
                    isAvailable && paper.title === selectedPaper.title ?
                      'border-brand-blue-900 text-brand-blue-900' :
                      'border-muted-foreground hover:border-brand-blue-900 hover:text-brand-blue-900',
                    {
                      'line-through border-muted-foreground': !isAvailable,
                    },
                    'text-lg'
                  )}
                  aria-label="size"
                  onClick={handleOptionSelection('paper', paper.title)}
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
