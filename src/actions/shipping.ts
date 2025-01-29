'use server'

type LineItem = {
	sku: string
	quantity: number
}

type Address = {
	country: string
	region: string
	adress1: string
	adress2: string | null
	city: string
	zip: string
}

export async function getShippingCost(lineItems: LineItem[], address: Address) {
	try {
		const response = await fetch(`${process.env.PRINTIFY_BASE_URL}/shops/${process.env.PRINTIFY_SHOP_ID}/orders/shipping.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
			},
			body: JSON.stringify({
				line_items: lineItems,
				address_to: address
			})
		})

		if (!response.ok) {
			throw new Error(`Error while getting shipping cost! Status: ${response.status}`);
		}

		const shippingInfo = await response.json()

		return { success: true, data: shippingInfo.standard }
	} catch (error) {
		console.error('Shipping calculation error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to calculate shipping'
		}
	}

}
