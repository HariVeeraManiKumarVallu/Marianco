'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RangeSlider from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function ProductFiltering({ categories }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const handleFiltering = useCallback(
    (name: string, value: string | string[] | number[]) => {
      const params = new URLSearchParams(searchParams)

      if (!value) {
        params.delete(name)
        return router.replace(`${pathName}?${params.toString()}`)
      }

      if (name === 'category' && Array.isArray(value)) {
        params.delete(name)
        value.forEach(value => {
          params.append(name, value as string)
        })
      }

      if (name === 'price' && Array.isArray(value)) {
        params.set(name, value[0] + '-' + value[1])
      }

      if (name === 'search') {
        params.set(name, value as string)
      }

      router.replace(`${pathName}?${params.toString()}`)
    },
    [pathName, router, searchParams]
  )

  const hasActiveFilters = !!searchParams.get('category')?.toString()
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
              onClick={() => handleFiltering('category', '')}
            >
              <X className="size-4" />
              Clear All
            </Button>
          )}
        </div>
        <ToggleGroup
          className="flex-wrap justify-start"
          variant={'outline'}
          value={searchParams.getAll('category') ?? []}
          onValueChange={categories => {
            handleFiltering('category', categories.length ? categories : '')
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
              .map(v => Number(v)) ?? [0, 100]
          }
          min={0}
          max={100}
          step={1}
          minStepsBetweenThumbs={10}
          onValueCommit={value => {
            handleFiltering('price', value)
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          placeholder="Search products..."
          defaultValue={searchParams.get('search') ?? ''}
          onChange={e => {
            handleFiltering('search', e.target.value)
          }}
        />
      </div>
    </div>
  )
}
