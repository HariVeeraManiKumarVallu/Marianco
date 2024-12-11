import { STATIC_CONFIG } from '@/config/cache'
import ProductCard from './product-card'
import ProductPagination from './product-pagination'

type ProductsListProp = {
  query: { [key: string]: string | string[] | undefined }
  currentPage: number
}

export default async function ProductsList({
  query,
  currentPage,
}: ProductsListProp) {
  const skipItems = (currentPage - 1) * 10
  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[product_category][title][$eq]=${query.category}&populate=*`,
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
  console.log(query)

  // const productCount = await getProductCount(filteredCategories);
  return (
    <div className="flex flex-1 flex-col space-y-16">
      {products.data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p>No products found</p>
        </div>
      ) : (
        <>
          <div className="grid flex-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {products.data.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <ProductPagination
            searchParams={query}
            currentPage={currentPage}
            totalPaginationButtons={3}
            totalProducts={products.total}
          />
        </>
      )}
    </div>
  )
}
