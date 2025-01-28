'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const sortOptions = [
  { value: 'popularity:desc', label: 'Most Popular' },
  { value: 'title:asc', label: 'Name (A-Z)' },
  { value: 'title:desc', label: 'Name (Z-A)' },
  { value: 'price:asc', label: 'Price (Low to High)' },
  { value: 'price:desc', label: 'Price (High to Low)' },
] as const

export default function ProductSort() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('sort', value)

    router.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <Select
      value={searchParams.get('sort') || sortOptions[0].value}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
