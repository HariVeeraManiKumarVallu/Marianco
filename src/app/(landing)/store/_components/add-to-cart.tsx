'use client'
import { Button } from "@/components/ui/button";
import { CartItem, useCart } from "@/hooks/use-cart";
import { findVariantImageSrc } from "@/lib/utils";
import { selectedVariantAtom } from "@/store/variant-atom";
import { ProductImage } from "@/types/product";
import { useAtomValue } from "jotai";
import { ShoppingCart } from "lucide-react";

export default function AddToCart({ productDetails, images, showIcon = false }: { productDetails: { supplierProductId: string, title: string }, images: ProductImage[], showIcon?: boolean }) {


  const { addItem } = useCart()
  const selectedVariant = useAtomValue(selectedVariantAtom)

  console.log(selectedVariant)
  function handleAddToCart() {
    if (!selectedVariant) return
    addItem({
      ...productDetails,
      price: selectedVariant.price,
      variantId: selectedVariant.variantId,
      imageSrc: findVariantImageSrc(images, Number(selectedVariant.variantId)) || "",
      quantity: 1
    })
  }
  return (
    <Button size={'sm'} onClick={handleAddToCart}>
      {showIcon && <ShoppingCart className="size-3" />}
      Add to Cart
    </Button>
  )
}
