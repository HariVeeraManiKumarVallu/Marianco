import {
  getCategories,
  getMaxPrice,
  getMinPrice,
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
  const [categories, minPrice, maxPrice] = await Promise.all([
    getCategories(),
    getMinPrice(query),
    getMaxPrice(query),
  ])

  return (
    <ProductFiltering
      categories={categories.data}
      minPrice={minPrice.data[0].basePrice / 100}
      maxPrice={maxPrice.data[0].basePrice / 100}
    />
  )
}
