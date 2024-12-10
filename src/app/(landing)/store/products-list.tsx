import ProductCard from './product-card'

type ProductsListProp = {
  query: { [key: string]: string | string[] | undefined }
  currentPage: number
  products: any
}

const ProductsList = async ({ query, currentPage }: ProductsListProp) => {
  // const products = filteredCategories
  //   ? await fetchFilteredProducts(filteredCategories)
  //   : await fetchProducts();
  const skipItems = (currentPage - 1) * 10
  const products = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skipItems}`
  ).then(res => res.json())

  // const productCount = await getProductCount(filteredCategories);
  return (
    <div className="flex flex-1 flex-col space-y-4">
      {/* <Pagination
        currentPage={currentPage}
        itemsPerPage={10}
        totalItems={30}
        title={'Product'}
        queryParamKey={'page'}
      > */}
      {/* {productCount === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p>No products found</p>
          </div>
        ) : ( */}
      <div className="grid flex-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {products.products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {/* )} */}
      {/* </Pagination> */}
    </div>
  )
}

export default ProductsList
