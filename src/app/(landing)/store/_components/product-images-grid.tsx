'use client'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { selectedVariantAtom } from '@/store/variant-atom'
import { Product } from '@/types/product'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProductImagesGrid({
  images,
  altText,
}: {
  images: Product['images']
  altText: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const selectedVariant = useAtomValue(selectedVariantAtom)

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const selectedImages = images.filter(image =>
    image.variantIds.includes(selectedVariant!)
  )
  return (
    <>
      <Carousel
        setApi={setApi}
        className="md:hidden relative"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {selectedImages.map(image => (
            <CarouselItem key={image.src}>
              <Image
                src={image.src}
                height={1200}
                width={1200}
                alt={altText}
                quality={80}
                className=" object-cover "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <span className="absolute bottom-4 right-4 text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">
          {current} / {count}
        </span>
        {/* <CarouselPrevious />
            <CarouselNext /> */}
      </Carousel>
      <div className="hidden md:grid md:grid-cols-2 gap-4 overflow-clip min-w-full lg:min-w-[616px]">
        {selectedImages.map(image => (
          <Image
            key={image.src}
            src={image.src}
            height={1200}
            width={1200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            alt={altText}
            quality={80}
            className=" object-cover border border-stone-200 rounded-sm "
          />
        ))}
      </div>
    </>
  )
}
