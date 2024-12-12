'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ product }) => {
  const cart = useCart()
  return (
    <Card className="bg-card rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-xl">
      <Link href={`/store/${product.documentId}`} className=" space-y-3 ">
        <CardHeader className="relative h-64">
          <Image
            src={'/logo.png'}
            alt={product.title}
            fill
            className="w-full h-full object-cover "
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.title}</CardTitle>
          <p className="line-clamp-3">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between">
        <span className="text-lg font-bold">${product.price}</span>
        <Button size={'sm'} onClick={() => cart.addItem(product)}>
          <ShoppingCart className="size-3" />
          Add to Cart
        </Button>
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
