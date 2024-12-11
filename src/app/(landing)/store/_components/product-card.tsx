import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ product, isRelatedProduct = false }) => {
  return (
    <article>
      <Link href={`/store/${product.documentId}`} className="group space-y-3 ">
        <div className="relative min-h-40  overflow-clip rounded-sm bg-stone-100 ">
          <Image
            src={'/logo.png'}
            fill
            alt={product.title}
            className="aspect-square object-cover  group-hover:scale-110"
          />
        </div>
        <h6 className={isRelatedProduct ? 'text-sm' : ''}>{product.title}</h6>
        <div>
          <p className=" line-clamp-2  text-sm text-secondary-foreground">
            {product.description}
          </p>
          <span className="text-sm">{product.price}</span>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
