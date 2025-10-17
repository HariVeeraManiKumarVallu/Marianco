import { getProducts } from '@/lib/queries/strapi/product'
import qs from 'qs'
import ProductCard from './product-card'
import ProductPagination from './product-pagination'

type ProductsListProp = {
  searchParams: { [key: string]: string | undefined }
}

export default async function ProductsGrid({ searchParams }: ProductsListProp) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 10;

  const { items: products, meta } = await getProducts(page, pageSize);

  return (
    <div className="flex flex-1 flex-col space-y-16">
      {products?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p>No products found</p>
        </div>
      ) : (
        <>
          <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product: any) => (
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
