import { CurrencyCodes } from "@/types/currency";

export async function createOrderItem(currency: CurrencyCodes, { quantity, price, skuDocumentId }: { quantity: number; price: number; skuDocumentId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/order-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        currency,
        quantity,
        price,
        sku: {
          connect: skuDocumentId
        }
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Error while creating order! Status: ${response.status}`);
  }

  const data = await response.json()
  return data.data.documentId
}


export async function createOrder(totalPrice: number, currency: CurrencyCodes, items: { quantity: number; price: number; skuDocumentId: string }[]) {
  const orderItems = await Promise.all(items.map(item => createOrderItem(currency, item)))
  console.log(orderItems)

  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        totalPrice,
        currency,
        orderItems: {
          connect: orderItems
        }
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Error while creating order! Status: ${response.status}`);
  }

  const data = await response.json()
  return data.data
}

export async function getShippingCost(lineItems: { sku: string, quantity: number }[], address: {
  country: string
  region: string
  adress1: string
  adress2: string
  city: string
  zip: string
}) {
  const response = await fetch(`https://api.printify.com/v1/shops/19604657/orders/shipping.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      line_items: lineItems,
      address_to: address
    })
  })

  if (!response.ok) {
    throw new Error(`Error while creating order! Status: ${response.status}`);
  }

  const data = await response.json()
  return data.data

}
