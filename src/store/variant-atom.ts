import { Variant } from '@/types/product'
import { atom } from 'jotai'

export const selectedVariantAtom = atom<Omit<Variant, 'StrapiData'> | null>(null)
