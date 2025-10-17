import {
  getCategories,
  getLowestPrice,
  getHighestPrice,
} from '@/lib/queries/strapi/product'
import qs from 'qs'
import ProductFiltering from './product-filtering'

export default async function PoductFilters({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const query = qs.stringify(
    {
      filters: {
        product_category: {
          title: {
            $eq: searchParams?.category?.split(','),
          },
        },
        tags: {
          in: searchParams?.search?.split(','),
        },
      },
      pagination: {
        limit: 1,
      },
      fields: ['basePrice'],
    },
    {
      encodeValuesOnly: true,
    }
  )
  const [categories, low, high] = await Promise.all([
    getCategories(),
    getLowestPrice(),
    getHighestPrice(),
  ])

  const hasData = categories.length > 0 && low !== null && high !== null

  if (!hasData) {
    return (
      <aside className="p-4 border rounded">
        <p className="text-sm text-muted-foreground">
          Store catalog not available yet.
        </p>
      </aside>
    )
  }

  return (
    <ProductFiltering
      categories={categories.data}
      minPrice={low / 100}
      maxPrice={high / 100}
    />
  )
}
