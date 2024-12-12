import { getProducts } from '@/lib/queries/strapi/product'
import qs from 'qs'
import ProductCard from './product-card'
import ProductPagination from './product-pagination'

type ProductsListProp = {
  searchParams: { [key: string]: string | undefined }
}

export default async function ProductsList({ searchParams }: ProductsListProp) {
  const query = qs.stringify(
    {
      filters: {
        product_category: {
          title: {
            $eq: searchParams?.category?.split(','),
          },
        },
        price: {
          $gte: searchParams?.price?.split('-')?.[0],
          $lte: searchParams?.price?.split('-')?.[1],
        },
        search: searchParams?.search,
      },
      pagination: {
        page: searchParams?.page || 1,
        pageSize: 10,
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  )
  const { data: products, meta } = await getProducts(query)

  return (
    <div className="flex flex-1 flex-col space-y-16">
      {products?.data?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p>No products found</p>
        </div>
      ) : (
        <>
          <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <ProductPagination
            searchParams={searchParams}
            currentPage={meta.pagination.page}
            totalPaginationButtons={5}
            totalPages={meta.pagination.pageCount}
          />
        </>
      )}
    </div>
  )
}
