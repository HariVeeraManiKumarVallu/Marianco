'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { findVariantImageSrc } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { selectedVariantAtom } from '@/store/variant-atom'
import { Product } from '@/types/product'
import { useAtomValue } from 'jotai'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AddToCart from './add-to-cart'

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCartStore()
  const selectedVariant = useAtomValue(selectedVariantAtom)

  function handleAddToCart() {
    if (!selectedVariant) return
    addItem({
      productId: product.productId,
      title: product.title,
      price: selectedVariant.price,
      variantId: selectedVariant.variantId,
      imageSrc: findVariantImageSrc(product.images, Number(selectedVariant.variantId)) || '',
      quantity: 1
    })
  }
  return (
    <Card className="bg-card rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-xl flex flex-col">
      <Link href={`/store/${product.documentId}`} className=" space-y-3 h-full">
        <CardHeader className="p-0">
          <Image
            src={product.images[0].src}
            alt={product.title}
            width={300}
            height={300}
            className="object-cover w-full h-full "
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.title}</CardTitle>
          {/* <p className="line-clamp-3">{product.description}</p> */}
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between mt-auto">
        <span className="text-lg font-bold">${product.basePrice / 100}</span>
        { /* <AddToCart productDetails={title:product.title, productId: }/> */}

      </CardFooter>
    </Card>
    // <article>
    //   <Link href={`/store/${product.documentId}`} className="group space-y-3 ">
    //     <div className="relative min-h-40  overflow-clip rounded-sm bg-stone-100 ">
    //       <Image
    //         src={'/logo.png'}
    //         fill
    //         alt={product.title}
    //         className="aspect-square object-cover  group-hover:scale-110"
    //       />
    //     </div>
    //     <h6 className={isRelatedProduct ? 'text-sm' : ''}>{product.title}</h6>
    //     <div>
    //       <p className=" line-clamp-2  text-sm text-secondary-foreground">
    //         {product.description}
    //       </p>
    //       <span className="text-sm">{product.price}</span>
    //     </div>
    //   </Link>
    // </article>
  )
}

export default ProductCard
