import ProductFiltering from './product-filtering'

export default async function ProductFilters() {
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/product-categories`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'force-cache',
      next: {
        revalidate: 60,
      },
    }
  )
  const categories = await categoriesResponse.json()

  return <ProductFiltering categories={categories.data} />
}
