import { Suspense } from 'react'
import ProductFilters from './_components/product-filters'
import ProductsList from './_components/products-list'
import ProductsSkeleton from './_components/products-skeleton'

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const query = await searchParams

  // const currentPage = Number(query?.page || 1)
  // const filteredCategories = query?.filter || ''

  return (
    <>
      <header className="my-section">
        <div className="container">
          <h2>Store</h2>
          <p>Browse our selection of products</p>
        </div>
      </header>
      <div className="container grid grid-cols-[300px_1fr] gap-12">
        <ProductFilters searchParams={query} />
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList searchParams={query} />
        </Suspense>
      </div>
    </>
  )
}
