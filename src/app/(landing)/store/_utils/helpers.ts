import { OptionType, OptionValue, Variant } from "@/types/product";

export function findVariantImageSrc(images: {
	src: string; variantIds: number[]; isDefault: boolean
}[],
	variantId: number) {
	return images.find(
		image => image.variantIds.includes(variantId) && image.isDefault
	)?.src
}

function sortByOptionId(options: Pick<OptionValue, 'optionId'>[]) {
	return options.toSorted((a, b) => Number(a.optionId) - Number(b.optionId))
}

export function getVariantsMap(variants: Variant[]) {
	const variantOptionsArray = variants.map(variant =>
		[
			sortByOptionId(variant.options).
				map(option => option.optionId).
				join('-'),
			variant
		] as const

	)

	return new Map(variantOptionsArray)
}

export function getOptionTypesMap(optionTypes: OptionType[]) {
	const optionTypesArray = optionTypes.map(optionType => [optionType.type, optionType.optionValues] as const)
	return new Map(optionTypesArray)
}

export function getOptionValuesMap(options: OptionValue[]) {
	const optionValuesArray = options.map(option => [option.title, option] as const)
	return new Map(optionValuesArray)
}
