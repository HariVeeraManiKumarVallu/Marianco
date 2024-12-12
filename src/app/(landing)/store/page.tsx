import { Suspense } from 'react'
import ProductFilters from './_components/product-filters'
import ProductsList from './_components/products-list'
import ProductsSkeleton from './_components/products-skeleton'
import ProductSort from './_components/product-sort'

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const query = await searchParams

  return (
    <div className="py-32 lg:py-section">
      <header className="space-y-4 container">
        <h1>Store</h1>
        <p className="text-muted-foreground">
          Every purchase supports our mission to protect children from
          exploitation and abuse
        </p>
      </header>
      <div className="container">
        <div className="flex justify-between mt-16 mb-12">
          <ProductFilters searchParams={query} />
          <ProductSort />
        </div>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList searchParams={query} />
        </Suspense>
      </div>
    </div>
  )
}
