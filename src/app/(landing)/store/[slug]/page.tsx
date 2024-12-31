import { Button } from '@/components/ui/button'
import { getProduct } from '@/lib/queries/strapi/product'
import { Option } from '@/types/product'
import ProductImagesGrid from '../_components/product-images-grid'
import VariantSelection from '../_components/variant-selection'
import AddToCart from '../_components/add-to-cart'
import { findVariantImageSrc } from '@/lib/utils'

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


  const options: Map<
    Option['type'],
    (Pick<Option, 'optionId' | 'title' | 'name'> & { src?: string })[]
  > = new Map()


  for (const variant of product.variants) {
    for (const { optionId, title, name, type } of variant.options) {
      if (options.has(type)) {
        const currentOptions = options.get(type)
        if (currentOptions?.some(option => option.optionId === optionId))
          continue
        if (type === 'color') {
          currentOptions?.push({
            optionId,
            title,
            name,
            src: findVariantImageSrc(product.images, Number(variant.variantId)),
          })
        } else {
          currentOptions?.push({ optionId, title, name })
        }
        continue
      }
      if (type === 'color') {
        options.set(type, [
          {
            optionId,
            title,
            name,
            src: findVariantImageSrc(product.images, Number(variant.variantId)),
          },
        ])
      } else {
        options.set(type, [{ optionId, title, name }])
      }
    }
  }

  options.forEach((v, k) => {
    if (k === 'size') { v.sort((a, b) => Number(a.optionId) - Number(b.optionId)) }
  }
  )

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
              options={options}
              variants={product.variants}
            />
            <div className="mb-4 mt-8 flex-1 space-y-1">
              <h6>Description</h6>
              <p className="text-secondary-foreground">{product.description}</p>
            </div>
            <AddToCart productDetails={{
              title: product.title,
              supplierProductId: product.supplierProductId
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
