import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findVariantImageSrc(
  images: {
    src: string
    variantIds: number[]
    isDefault: boolean
  }[],
  variantId: number) {
  return images.find(
    image => image.variantIds.includes(variantId) && image.isDefault
  )?.src
}
