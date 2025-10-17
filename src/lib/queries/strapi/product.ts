import { findVariantImageSrc } from '@/app/(root)/store/_utils/helpers'
import { STATIC_CONFIG } from '@/constants/cache'
import { CartItem } from '@/store/cart-store'
import { Product } from '@/types/product'
import { StrapiData, StrapiResponse } from '@/types/strapi'
import { notFound } from 'next/navigation'
import qs from 'qs'

const API_BASE = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api').replace(/\/$/, '');

async function safeJson(url: string) {
  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      next: { revalidate: 300 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Categories
export async function getCategories() {
  const data = await safeJson(`${API_BASE}/product-categories?fields=title`);
  return data?.data || []; // return [] if 404/err
}

// Lowest price (optional)
export async function getLowestPrice() {
  const data = await safeJson(`${API_BASE}/products?pagination[limit]=1&fields[0]=basePrice&sort=basePrice:asc`);
  const first = data?.data?.[0];
  return first?.attributes?.basePrice ?? null;
}

// Highest price
export async function getHighestPrice() {
  const data = await safeJson(`${API_BASE}/products?pagination[limit]=1&fields[0]=basePrice&sort=basePrice:desc`);
  const first = data?.data?.[0];
  return first?.attributes?.basePrice ?? null;
}

// Product list
export async function getProducts(page = 1, pageSize = 10) {
  const url = `${API_BASE}/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;
  const data = await safeJson(url);
  return {
    items: data?.data || [],
    meta: data?.meta || { pagination: { page, pageSize, total: 0, pageCount: 0 } }
  };
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

export async function getProductSku(item: Omit<CartItem, 'price'>) {
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
            $eq: item.skuId
          },
        },
        populate: {
          variant: {
            fields: ['variantId', 'price'],
            filters: {
              variantId: {
                $eq: item.variantId
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
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${item.documentId}?${query}`,
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
    sku: {
      documentId: string
      skuId: string
    }
    quantity: number
    documentId: string
  } = {
    documentId: item.documentId,
    title,
    imageSrc: findVariantImageSrc(images, sku.variant.variantId) ?? '',
    price: sku.variant.price,
    sku: { documentId: sku.documentId, skuId: sku.skuId, },
    quantity: item.quantity
  }

  return formattedData
}
