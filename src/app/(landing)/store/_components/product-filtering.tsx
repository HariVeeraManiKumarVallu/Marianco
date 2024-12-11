'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RangeSlider from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useDebounce } from '@/hooks/use-debounce'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function ProductFiltering({
  categories,
  minPrice,
  maxPrice,
}: {
  categories: { id: string; title: string }[]
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

      if (name === 'search') {
        params.set(name, value as string)
      }

      router.replace(`${pathName}?${params.toString()}`)
    },
    [pathName, router, searchParams]
  )

  useEffect(() => {
    handleFiltering('search', debouncedValue)
  }, [debouncedValue, handleFiltering])

  function resetFilters() {
    router.replace(pathName)
  }

  const hasActiveFilters = !!searchParams.size
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center h-9">
          <h5>Categories</h5>
          {hasActiveFilters && (
            <Button
              className="text-sm"
              variant={'ghost'}
              size={'sm'}
              onClick={resetFilters}
            >
              <X className="size-4" />
              Clear All
            </Button>
          )}
        </div>
        <ToggleGroup
          className="flex-wrap justify-start"
          variant={'outline'}
          value={searchParams.get('category')?.split(',') ?? []}
          onValueChange={categories => {
            handleFiltering(
              'category',
              categories.length ? categories.join(',') : ''
            )
          }}
          type="multiple"
        >
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
        <Label>Price Range</Label>
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
          onValueCommit={value => {
            if (value[0] === minPrice && value[1] === maxPrice) {
              handleFiltering('price', '')
              return
            }
            handleFiltering('price', value.join('-'))
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          placeholder="Search products..."
          defaultValue={productSearch}
          onChange={e => {
            setProductSearch(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
