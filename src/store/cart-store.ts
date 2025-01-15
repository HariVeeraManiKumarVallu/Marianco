import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calculateCartTotals, } from './utils/cart'

export type CartItem = {
  documentId: string
  productId: string
  price: number
  variantId: number
  skuId: string
  imageSrc: string
  quantity: number
}
type CartStore = {
  items: CartItem[]
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
      items: [],
      totalCartPrice: 0,
      totalItems: 0,
      addItem: item =>
        set(state => {
          const existingItem = state.items.find(cartItem => cartItem.skuId === item.skuId)
          if (existingItem) {
            const updatedItems = state.items.map(i =>
              i.skuId === item.skuId ? { ...i, quantity: i.quantity + item.quantity } : i
            )
            const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)
            return {
              items: updatedItems,
              totalCartPrice,
              totalItems,
            }
          }
          const updatedItems = [...state.items, item]
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)
          return {
            items: updatedItems,
            totalCartPrice,
            totalItems,
          }
        }),
      increaseQuantity: (skuId, quantity = 1) => set(state => {
        const exisitingItem = state.items.find(i => i.skuId === skuId)
        if (!exisitingItem) return {}
        const updatedItems = state.items.map(i =>
          i.skuId === skuId ? { ...i, quantity: i.quantity + quantity } : i
        )
        const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

        return {
          items: updatedItems,
          totalCartPrice,
          totalItems
        }
      }),
      decreaseQuantity: (skuId, quantity = 1) => set(state => {
        const exisitingItem = state.items.find(i => i.skuId === skuId)
        if (!exisitingItem || exisitingItem.quantity === 1) return {}

        const updatedItems = state.items.map(i => i.skuId === skuId ? { ...i, quantity: i.quantity - quantity } : i)
        const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

        return {
          items: updatedItems,
          totalCartPrice,
          totalItems
        }
      }),
      removeItem: skuId => {
        set(state => {
          const removedItem = state.items.find(i => i.skuId === skuId)
          if (!removedItem) return {}

          const updatedItems = state.items.filter(i => i.skuId !== skuId)
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

          return {
            items: updatedItems,
            totalCartPrice,
            totalItems
          }
        })
      },
      updateQuantity: (skuId, quantity) =>
        set(state => {
          if (typeof (quantity) !== 'number') return {}
          if (quantity < 1) return {}

          const updatedItems = state.items.map(i => (i.skuId === skuId ? { ...i, quantity } : i))
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

          return {
            items: updatedItems,
            totalCartPrice,
            totalItems
          }
        }),
      clearCart: () => set({ items: [], totalCartPrice: 0, totalItems: 0 }),
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
)
