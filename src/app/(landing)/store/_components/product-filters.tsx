import {
  getCategories,
  getMaxPrice,
  getMinPrice,
} from '@/lib/queries/strapi/product'
import qs from 'qs'
import ProductFiltering from './product-filtering'

export default async function ProductFilters({
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
        search: searchParams?.search,
      },
      pagination: {
        limit: 1,
      },
      fields: ['price'],
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
      minPrice={minPrice.data[0].price}
      maxPrice={maxPrice.data[0].price}
    />
  )
}
