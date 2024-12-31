import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalCartPrice: 0,
      totalItems: 0,
      addItem: item =>
        set(state => {
          const existingItem = state.items.find(i => i.supplierProductId === item.supplierProductId)
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.supplierProductId === item.supplierProductId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              totalCartPrice: state.totalCartPrice + item.price * item.quantity,
              totalItems: state.totalItems + item.quantity,
            }
          }
          return {
            items: [...state.items, item],
            totalCartPrice: state.totalCartPrice + item.price * item.quantity,
            totalItems: state.totalItems + item.quantity,
          }
        }),
      increaseQuantity: (id, quantity = 1) => set(state => {
        const exisitingItem = state.items.find(i => i.supplierProductId === id)
        if (!exisitingItem) return {}
        return {
          items: state.items.map(i => i.supplierProductId === id ? { ...i, quantity: i.quantity + quantity } : i)
        }
      }),
      decreaseQuantity: (id, quantity = 1) => set(state => {
        const exisitingItem = state.items.find(i => i.supplierProductId === id)
        if (!exisitingItem) return {}
        if (exisitingItem.quantity === 1) return {}
        return {
          items: state.items.map(i => i.supplierProductId === id ? { ...i, quantity: i.quantity - quantity } : i)
        }
      }),
      removeItem: id => {
        set(state => {
          const removedItem = state.items.find(i => i.supplierProductId === id)
          if (!removedItem) return {}

          return {
            items: state.items.filter(i => i.supplierProductId !== id),
            totalCartPrice: state.totalCartPrice - removedItem.price * removedItem.quantity,
            totalItems: state.totalItems - removedItem.quantity,
          }
        })
      },
      updateQuantity: (id, quantity) =>
        set(state => ({
          items: state.items.map(i => (i.supplierProductId === id ? { ...i, quantity } : i)),
          totalCartPrice: state.items.reduce((acc, item) => {
            if (item.supplierProductId === id) {
              return acc + item.price * quantity
            }
            return acc + item.price * item.quantity
          }, 0),
          totalItems: state.items.reduce((acc, item) => {
            if (item.supplierProductId === id) {
              return acc + quantity
            }
            return acc + item.quantity
          }, 0),
        })),
      clearCart: () => set({ items: [], totalCartPrice: 0, totalItems: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
)
