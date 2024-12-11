import { Button } from '@/components/ui/button'
import { STATIC_CONFIG } from '@/config/cache'
import Image from 'next/image'

export default async function ProductPage({
  params,
}: {
  params: { [key: string]: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${params.slug}?populate=*`,
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

  if (!res.ok) {
    throw new Error('Failed to fetch product')
  }

  const resData = await res.json()
  const product = resData.data
  console.log(product)
  if (!product) return null

  // const relatedProducts = await fetchRelatedProducts(
  //   product.categoryId,
  //   product.id
  // )

  // const formattedProduct = {
  //   ...product,
  //   price: parseFloat(String(product?.price)),
  // }

  return (
    <section className="mt-8">
      <div className="container space-y-24">
        <article className="grid gap-12 md:grid-cols-2 lg:gap-20 ">
          <div className="relative min-h-[400px] rounded-sm bg-stone-100 overflow-clip">
            <Image
              src={product.images[0].url}
              fill
              alt={product.title}
              className="aspect-square object-cover "
            />
          </div>
          <div className="flex flex-col py-4 ">
            <div className="space-y-2 ">
              <h4 className="font-bold">{product.title}</h4>
              {/* <small className="inline-block">{product.category.title}</small> */}
              <p className="text-sm">
                {/* {formatter.format(Number(product.price))} */}
                {product.price}
              </p>
            </div>
            <div className="mb-4 mt-8 flex-1 space-y-1">
              <h6>Description</h6>
              <p className="text-secondary-foreground">{product.description}</p>
            </div>
            <Button>Add to Cart</Button>
            {/* <AddToCart product={product} /> */}
          </div>
        </article>
        <div>
          <h5>Related Products</h5>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            {/* {relatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isRelatedProduct
              />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  )
}
