'use server'

import stripe from "@/services/stripe"
import { createOrder, getShippingCost } from "@/lib/queries/strapi/order";
import { Address, LineItem } from "@/types/checkout";
import { CurrencyCodes } from "@/types/currency";


export async function updateShippingCostAction(intentId: string, address: Address,) {
	try {
		const paymentIntent = await stripe.paymentIntents.retrieve(intentId)

		const lineItems = JSON.parse(paymentIntent.metadata.lineItems) as LineItem[]

		const shippingCost: number = await getShippingCost(lineItems.map(item => ({ sku: item.skuId, quantity: item.quantity })), address)

		const totalAmount = paymentIntent.amount + shippingCost

		const order = await createOrder(totalAmount, paymentIntent.currency.toUpperCase() as CurrencyCodes, lineItems.map(item => ({
			skuDocumentId: item.skuDocumentId,
			price: item.price,
			quantity: item.quantity
		})))

		await stripe.paymentIntents.update(intentId, {
			amount: totalAmount,
			metadata: {
				orderId: order.orderId
			}
		})

		return {
			success: true, data: shippingCost
		}
	} catch (error) {
		console.error('Shipping calculation error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to calculate shipping'
		}
	}
}

