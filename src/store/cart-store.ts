import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { calculateCartTotals, } from './utils/cart'

export type CartItem = {
  supplierProductId: string
  title: string
  price: number
  variantId: string
  imageSrc: string
  quantity: number
}
type CartStore = {
  items: CartItem[]
  totalCartPrice: number
  totalItems: number
  addItem: (item: CartItem) => void
  increaseQuantity: (id: string, quantity?: number) => void
  decreaseQuantity: (id: string, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
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
          const existingItem = state.items.find(i => i.variantId === item.variantId)
          if (existingItem) {
            const updatedItems = state.items.map(i =>
              i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
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
      increaseQuantity: (id, quantity = 1) => set(state => {
        const exisitingItem = state.items.find(i => i.variantId === id)
        if (!exisitingItem) return {}
        const updatedItems = state.items.map(i =>
          i.variantId === id ? { ...i, quantity: i.quantity + quantity } : i
        )
        const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

        return {
          items: updatedItems,
          totalCartPrice,
          totalItems
        }
      }),
      decreaseQuantity: (id, quantity = 1) => set(state => {
        const exisitingItem = state.items.find(i => i.variantId === id)
        if (!exisitingItem || exisitingItem.quantity === 1) return {}

        const updatedItems = state.items.map(i => i.variantId === id ? { ...i, quantity: i.quantity - quantity } : i)
        const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

        return {
          items: updatedItems,
          totalCartPrice,
          totalItems
        }
      }),
      removeItem: id => {
        set(state => {
          const removedItem = state.items.find(i => i.variantId === id)
          if (!removedItem) return {}

          const updatedItems = state.items.filter(i => i.variantId !== id)
          const { totalCartPrice, totalItems } = calculateCartTotals(updatedItems)

          return {
            items: updatedItems,
            totalCartPrice,
            totalItems
          }
        })
      },
      updateQuantity: (id, quantity) =>
        set(state => {
          console.log(typeof (quantity))
          if (typeof (quantity) !== 'number') return {}
          if (quantity < 1) return {}

          const updatedItems = state.items.map(i => (i.variantId === id ? { ...i, quantity } : i))
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
