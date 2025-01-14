import { Button } from '@/components/ui/button'
import { getProduct } from '@/lib/queries/strapi/product'
import ProductImagesGrid from '../_components/product-images-grid'
import VariantSelection from '../_components/variant-selection'
import AddToCart from '../_components/add-to-cart'
import { getOptionTypesMap, getOptionValuesMap, getVariantsMap } from '../_utils/helpers'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { data: product } = await getProduct(slug)

  if (!product) return null
  // const relatedProducts = await fetchRelatedProducts(
  //   product.categoryId,
  //   product.id
  // )

  // const formattedProduct = {
  //   ...product,
  //   price: parseFloat(String(product?.price)),
  // }

  console.log(product.variants)

  const optionTypesMap = getOptionTypesMap(product.optionTypes)
  const optionValuesMap = getOptionValuesMap(product.optionValues)
  const variantsMap = getVariantsMap(product.variants)

  return (
    <section className="my-section">
      <div className="container space-y-24">
        <article className="lg:flex lg:gap-20 items-start">
          <ProductImagesGrid images={product.images} altText={product.title} />

          <div className="flex flex-col py-4">
            <div className="space-y-2 ">
              <h4 className="font-bold">{product.title}</h4>
              {/* <small className="inline-block">{product.category.title}</small> */}
              {/* <p className="text-sm">
                {product.basePrice}
              </p> */}
            </div>

            <VariantSelection
              optionTypes={optionTypesMap}
              optionValues={optionValuesMap}
              variantsMap={variantsMap}
            />
            <div className="mb-4 mt-8 flex-1 space-y-1">
              <h6>Description</h6>
              <p className="text-secondary-foreground">{product.description}</p>
            </div>
            <AddToCart productDetails={{
              title: product.title,
              productId: product.productId
            }}
              images={product.images}
            />
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
