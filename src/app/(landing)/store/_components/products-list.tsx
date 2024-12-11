import { STATIC_CONFIG } from '@/config/cache'
import qs from 'qs'
import ProductCard from './product-card'
import ProductPagination from './product-pagination'

type ProductsListProp = {
  searchParams: { [key: string]: string | undefined }
  currentPage: number
}

export default async function ProductsList({
  searchParams,
  currentPage,
}: ProductsListProp) {
  const skipItems = (currentPage - 1) * 10

  const query = qs.stringify(
    {
      filters: {
        product_category: {
          title: {
            $eq: searchParams.category?.split(','),
          },
        },
        price: {
          $gte: searchParams.price?.split('-')?.[0] || 0,
          $lte: searchParams.price?.split('-')?.[1] || 100,
        },
        search: searchParams.search,
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  )

  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: STATIC_CONFIG.revalidate,
      },
    }
  )
  const products = await productsResponse.json()

  console.log(products)

  // const productCount = await getProductCount(filteredCategories);
  return (
    <div className="flex flex-1 flex-col space-y-16">
      {products?.data?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p>No products found</p>
        </div>
      ) : (
        <>
          <div className="grid flex-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {products.data?.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <ProductPagination
            searchParams={searchParams}
            currentPage={currentPage}
            totalPaginationButtons={3}
            totalProducts={products.total}
          />
        </>
      )}
    </div>
  )
}
