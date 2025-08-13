'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RangeSlider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useDebounce } from '@/hooks/use-debounce'
import { Category } from '@/types/product'
import { StrapiData } from '@/types/strapi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function ProductFiltering({
  categories,
  minPrice,
  maxPrice,
}: {
  categories: StrapiData<Category>[]
  minPrice: number
  maxPrice: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [productSearch, setProductSearch] = useState('')

  const debouncedValue = useDebounce(productSearch)

  const handleFiltering = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (!value) {
        params.delete(name)
        return router.replace(`${pathName}?${params.toString()}`)
      }

      params.set(name, value)
      if (Number(params.get('page')) > 1) params.set('page', '1')

      router.replace(`${pathName}?${params.toString()}`)
    },
    [pathName, router, searchParams]
  )

  useEffect(() => {
    handleFiltering('search', debouncedValue)
  }, [debouncedValue, handleFiltering])

  return (
    <div className="space-y-6 ">
      <div className="space-y-2">
        <Label className="text-base">Search</Label>
        <Input
          id='search-product'
          placeholder="Search products..."
          defaultValue={productSearch}
          className="max-w-lg"
          onChange={e => {
            setProductSearch(e.target.value)
          }}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base">Categories</Label>
        <ToggleGroup
          className="flex-wrap justify-start"
          variant={'outline'}
          value={searchParams.get('category')?.split(',') ?? []}
          onValueChange={categories => {
            if (categories.length === 0 || categories.includes('reset')) {
              handleFiltering('category', '')
              return
            }

            handleFiltering('category', categories.join(','))
          }}
          type="multiple"
        >
          <ToggleGroupItem
            value="reset"
            size={'sm'}
            data-state={searchParams.get('category') ? 'off' : 'on'}
            className="capitalize data-[state=on]:bg-brand-blue-300/90  hover:bg-brand-blue-100/50"
          >
            All
          </ToggleGroupItem>
          {categories.map(category => (
            <ToggleGroupItem
              key={category.id}
              value={category.title}
              size={'sm'}
              className="capitalize data-[state=on]:bg-brand-blue-300/90  hover:bg-brand-blue-100/50"
            >
              {category.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Price Range</Label>
        <RangeSlider
          defaultValue={
            searchParams
              .get('price')
              ?.split('-')
              .map(v => Number(v)) ?? [minPrice, maxPrice]
          }
          min={minPrice}
          max={maxPrice}
          step={1}
          minStepsBetweenThumbs={1}
          onValueCommit={(value: number[]) => {
            if (value[0] === minPrice && value[1] === maxPrice) {
              handleFiltering('price', '')
              return
            }
            handleFiltering('price', value.join('-'))
          }}
        />
      </div>
    </div>
  )
}
