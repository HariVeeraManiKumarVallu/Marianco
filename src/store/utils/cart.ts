import { CartItem } from "../cart-store";

function calculateTotalQuantity(items: CartItem[]) {
  return items.reduce((acc, item) => item.quantity + acc, 0)
}

function calculateTotalCartPrice(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0)
}

export function calculateCartTotals(items: CartItem[]) {
  return {
    totalItems: calculateTotalQuantity(items),
    totalCartPrice: calculateTotalCartPrice(items)
  }
}
