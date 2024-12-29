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
  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom)

  const selectedOptions = Object.fromEntries([...options.keys()].map(k => ([
    [k], searchParams.get(k) || options.get(k)?.[0].title
  ])))

  //const selectedColor = searchParams.get('color') || options.get('color')?.[0].title
  //const selectedSize = searchParams.get('size') || options.get('size')?.[0].title
  //const selectedPaper = searchParams.get('paper') || options.get('paper')?.[0].title

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
    //setSelectedVariant(findVariant( [selectedPaper, selectedSize])!.id)
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

  console.log(options)
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
      ) : null}

      {
        options.has('size') && options.get('size')!.length > 0 ?

          <div className="mt-8">
            <h6 className="mb-4">Choose Size</h6>
            <div className="flex gap-2 flex-wrap items-center">
              {options.get('size')!.map(size => {
                const isAvailable = findVariant([
                  selectedOptions.color,
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
              const isAvailable = findVariant([
                paper,
                paper.name,
              ])?.isAvailable

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
                  onClick={handleVariantSelection('page', paper.name)}
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
