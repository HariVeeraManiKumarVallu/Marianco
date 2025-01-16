import { CHECKOUT_TYPES } from "@/config/checkout";

export type Checkout = typeof CHECKOUT_TYPES[keyof typeof CHECKOUT_TYPES] 
