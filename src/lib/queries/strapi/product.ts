import { findVariantImageSrc } from '@/app/(landing)/store/_utils/helpers'
import { STATIC_CONFIG } from '@/config/cache'
import { Product } from '@/types/product'
import { StrapiData, StrapiResponse } from '@/types/strapi'
import qs from 'qs'

export async function getProducts(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?${query}`,
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
    throw new Error('Failed to fetch products')
  }

  const data = await res.json()
  return data as StrapiResponse<Product[]>
}

export async function getProduct(id: string) {
  const query = qs.stringify({
    populate: {
      optionTypes: {
        fields: ['type', 'name'],
        populate: {
          optionValues: {
            fields: ['optionId', 'title', 'previewUrl'],
            filters: {
              products: {
                documentId: {
                  $eq: id
                },
              },
            },
          },
        }
      },
      optionValues: {
        fields: ['optionId', 'title', 'previewUrl'],
        populate: {
          optionType: {
            fields: 'type'
          }
        },
        sort: 'optionId',
      },
      //skus: {
      //  fields: 'skuId',
      //  populate: {
      //    variant: {
      //      fields: 'variantId',
      //    }
      //  },
      //},
      variants: {
        populate: {
          options: {
            fields: 'optionId'
          },
          skus: {
            fields: 'skuId',
            filters: {
              product: {
                documentId: {
                  $eq: id
                },
              },
            },
          },
        }
      },
    }
  }, {
    encodeValuesOnly: true
  })
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${id}?${query}`,
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

  const data = await res.json()

  return data as StrapiResponse<StrapiData<Product>>
}

export async function getProductSku(documentId: string, variantId: number, skuId: string) {
  const query = qs.stringify({
    fields: ['title', 'images'],
    filters: {
      images: {
        isDefault: {
          $eq: true
        }
      }
    },
    populate: {
      skus: {
        fields: 'skuId',
        filters: {
          skuId: {
            $eq: skuId
          },
        },
        populate: {
          variant: {
            fields: ['variantId', 'price'],
            filters: {
              variantId: {
                $eq: variantId
              },
            },
          }
        },
      },
    }
  }, {
    encodeValuesOnly: true
  })
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${documentId}?${query}`,
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
    throw new Error('Failed to fetch product details')
  }

  const product = await res.json()
  const { title, images, skus } = product.data
  const sku = skus[0]
  const formattedData: {
    title: string
    imageSrc: string
    price: number
    skuId: string
  } = { title, imageSrc: findVariantImageSrc(images, sku.variant.variantId) ?? '', price: sku.variant.price, skuId: sku.skuId }

  return formattedData
}

export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/product-categories?fields=title`,
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
    throw new Error('Failed to fetch products')
  }

  const data = await res.json()
  return data
}

export async function getMaxPrice(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?${query}&sort=basePrice:desc`,
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
    throw new Error('Failed to fetch price range')
  }

  const data = await res.json()

  if (data.data.length === 0 || !data) {
    throw new Error('Failed to fetch price range')
  }

  return data.data[0].basePrice
}

export async function getMinPrice(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?${query}&sort=basePrice:asc`,
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
    throw new Error('Failed to fetch products')
  }

  const data = await res.json()

  if (data.data.length === 0 || !data) {
    throw new Error('Failed to fetch price range')
  }

  return data.data[0].basePrice
}
