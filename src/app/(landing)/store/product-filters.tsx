'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function ProductFilters({ categories }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [range, setRange] = useState<[number, number]>(() => {
    const start = parseInt(searchParams.get('start') ?? '0')
    const end = parseInt(searchParams.get('end') ?? '100')
    return [start, end]
  })

  const handleFiltering = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (!value) {
        params.delete(name)
        return router.replace(`${pathName}?${params.toString()}`)
      }

      // const currentValues = params.getAll(name)

      params.delete(name)
      value.split(',').forEach(value => {
        params.append(name, value)
      })

      // if (currentValues.includes(value)) {
      //   params.delete(name, value)
      // } else {
      //   params.append(name, value)
      // }
      router.replace(`${pathName}?${params.toString()}`)
    },
    [pathName, router, searchParams]
  )

  useEffect(() => {
    const start = parseInt(searchParams.get('start') ?? '0')
    const end = parseInt(searchParams.get('end') ?? '100')
    setRange([start, end])
  }, [searchParams])

  const handleRangeChange = useCallback(
    (newRange: number[]) => {
      const typedRange = newRange as [number, number]
      setRange(typedRange)

      const params = new URLSearchParams(searchParams)
      params.set('start', typedRange[0].toString())
      params.set('end', typedRange[1].toString())
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
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
            handleFiltering(
              'category',
              categories.length ? categories.join(',') : ''
            )
          }}
          type="multiple"
        >
          {categories.map(category => (
            <ToggleGroupItem
              key={category}
              value={category}
              size={'sm'}
              className="capitalize data-[state=on]:bg-brand-blue-300/90  hover:bg-brand-blue-100/50"
            >
              {category.toLowerCase()}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div>{range[0] + ' - ' + range[1]}</div>
        <Slider
          defaultValue={range}
          min={0}
          max={100}
          step={1}
          onValueChange={handleRangeChange}
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
