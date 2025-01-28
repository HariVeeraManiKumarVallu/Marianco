import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calculateCartTotals, } from './utils/cart'

export type CartItem = {
  documentId: string
  productId: string
  title: string
  price: number
  variantId: number
  skuId: string
  imageSrc: string
  quantity: number
}
type CartStore = {
  cartItems: CartItem[]
  totalCartPrice: number
  totalItems: number
  addItem: (item: CartItem) => void
  increaseQuantity: (skuId: string, quantity?: number) => void
  decreaseQuantity: (skuId: string, quantity?: number) => void
  removeItem: (skuId: string) => void
  updateQuantity: (skuId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalCartPrice: 0,
      totalItems: 0,
      addItem: item =>
        set(state => {
          const existingItem = state.cartItems.find(cartItem => cartItem.skuId === item.skuId)
          if (existingItem) {
            const updatedItems = state.cartItems.map(i =>
              i.skuId === item.skuId ? { ...i, quantity: i.quantity + item.quantity } : i
            )
            const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)
            return {
              cartItems: updatedItems,
              totalCartPrice,
              totalItems,
            }
          }
          const updatedItems = [...state.cartItems, item]
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)
          return {
            cartItems: updatedItems,
            totalCartPrice,
            totalItems,
          }
        }),
      increaseQuantity: (skuId, quantity = 1) => set(state => {
        const exisitingItem = state.cartItems.find(i => i.skuId === skuId)
        if (!exisitingItem) return {}
        const updatedItems = state.cartItems.map(i =>
          i.skuId === skuId ? { ...i, quantity: i.quantity + quantity } : i
        )
        const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

        return {
          cartItems: updatedItems,
          totalCartPrice,
          totalItems
        }
      }),
      decreaseQuantity: (skuId, quantity = 1) => set(state => {
        const exisitingItem = state.cartItems.find(i => i.skuId === skuId)
        if (!exisitingItem || exisitingItem.quantity === 1) return {}

        const updatedItems = state.cartItems.map(i => i.skuId === skuId ? { ...i, quantity: i.quantity - quantity } : i)
        const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

        return {
          cartItems: updatedItems,
          totalCartPrice,
          totalItems
        }
      }),
      removeItem: skuId => {
        set(state => {
          const removedItem = state.cartItems.find(i => i.skuId === skuId)
          if (!removedItem) return {}

          const updatedItems = state.cartItems.filter(i => i.skuId !== skuId)
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

          return {
            cartItems: updatedItems,
            totalCartPrice,
            totalItems
          }
        })
      },
      updateQuantity: (skuId, quantity) =>
        set(state => {
          if (typeof (quantity) !== 'number') return {}
          if (quantity < 1) return {}

          const updatedItems = state.cartItems.map(i => (i.skuId === skuId ? { ...i, quantity } : i))
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

          return {
            cartItems: updatedItems,
            totalCartPrice,
            totalItems
          }
        }),
      clearCart: () => set({ cartItems: [], totalCartPrice: 0, totalItems: 0 }),
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
)
