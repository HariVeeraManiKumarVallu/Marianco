import { Suspense } from 'react'
import ProductFilters from './product-filters'
import ProductPagination from './product-pagination'
import ProductsList from './products-list'
import ProductsSkeleton from './products-skeleton'

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const products = await fetch('https://dummyjson.com/products?').then(res =>
    res.json()
  )

  const query = await searchParams

  const categories = await fetch(
    'https://dummyjson.com/products/category-list'
  ).then(res => res.json())

  const currentPage = Number(query?.page || 1)
  const filteredCategories = query?.filter || ''

  return (
    <>
      <header className="my-section">
        <div className="container">
          <h2>Store</h2>
          <p>Browse our selection of products</p>
        </div>
      </header>
      <div className="container grid grid-cols-[300px_1fr] gap-12">
        <ProductFilters categories={categories.slice(0, 6)} />
        <div>
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsList
              filteredCategories={filteredCategories}
              currentPage={currentPage}
            />
            <ProductPagination
              searchParams={query}
              currentPage={currentPage}
              totalPaginationButtons={3}
              totalProducts={products.total}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
