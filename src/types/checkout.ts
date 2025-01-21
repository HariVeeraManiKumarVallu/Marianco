import { CHECKOUT_TYPES } from "@/constants/checkout";

export type Checkout = typeof CHECKOUT_TYPES[keyof typeof CHECKOUT_TYPES] 
