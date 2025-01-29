import stripe from "@/services/stripe";
import { NextResponse } from "next/server";
import { StoreCheckout } from "../checkout_sessions/types";
import { getProductSku } from "@/lib/queries/strapi/product";
import { createOrder, createOrderItem } from "@/lib/queries/strapi/order";

const calculateOrderAmount = (items: {
	title: string;
	imageSrc: string;
	price: number;
	sku: {
		documentId: string;
		skuId: string;
	};
	quantity: number;
	documentId: string;
}[]) => {
	return
};

export async function POST(req: Request) {
	const body: StoreCheckout = await req.json();
	const { currency, items } = body

	const updatedItems = await Promise.all(items.map(item => getProductSku(item)))

	const totalAmount = updatedItems.reduce((acc, item) => {
		return acc + (item.price * item.quantity)
	}, 0)

	// const order = await createOrder(totalPrice, currency, updatedItems.map(item => ({ quantity: item.quantity, price: item.price, skuDocumentId: item.sku.documentId })))

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalAmount,
		currency,
		payment_method_types: ['card'],
	});

	return NextResponse.json({
		clientSecret: paymentIntent.client_secret,
		items: updatedItems.map(item => ({
			id: item.documentId,
			sku: item.sku.skuId,
			title: item.title,
			imageSrc: item.imageSrc,
			price: item.price,
			quantity: item.quantity,
			totalPrice: item.price * item.quantity
		})),
		totalAmount
	});

};


//async function getLatestProductDetails(productId: string, variantId: number) {
//  const product = await getProduct(productId)
//  const { is_available, price } = product.variants.find(variant => variant.id === variantId)
//
//  const imgUrl = product.images.find(img => img.variant_ids.includes(variantId) && img.is_default)?.src
//
//  if (!is_available) return { error: { message: 'Out of stock' } }
//
//  return {
//    productId,
//    variantId,
//    title: product.title,
//    price,
//    imgUrl
//  }
//}

//async function getProduct(productId: string) {
//  const res = await fetch(`${process.env.PRINTIFY_API_BASE_URL}/shops/${process.env.PRINTIFY_SHOP_ID}/products/${productId}.json`,
//    {
//      headers: {
//        Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
//      }
//    }
//  )
//
//  const data = await res.json()
//  return data
//}
