'use client'
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { selectedVariantAtom } from "@/store/variant-atom";
import { ProductImage } from "@/types/product";
import { useAtomValue } from "jotai";
import { ShoppingCart } from "lucide-react";
import { findVariantImageSrc } from "../_utils/helpers";
import { useParams } from "next/navigation";

export default function AddToCart({ productId, title, images, showIcon = false }: { productId: string, title: string, images: ProductImage[], showIcon?: boolean }) {
  const { addItem } = useCartStore()
  const selectedVariant = useAtomValue(selectedVariantAtom)
  const documentId = useParams().slug as string

  function handleAddToCart() {
    if (!selectedVariant) return
    addItem({
      documentId,
      productId,
      title,
      price: selectedVariant.price,
      variantId: selectedVariant.variantId,
      skuId: selectedVariant.skus[0].skuId,
      imageSrc: findVariantImageSrc(images, selectedVariant.variantId) || "",
      quantity: 1
    })
  }
  return (
    <Button size={'sm'} onClick={handleAddToCart} disabled={!selectedVariant}>
      {showIcon && <ShoppingCart className="size-3" />}
      Add to Cart
    </Button>
  )
}
