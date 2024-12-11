import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartStore = {
  items: any[]
  total: number
  totalItems: number
  addItem: (item: any) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      totalItems: 0,
      addItem: item =>
        set(state => {
          const existingItem = state.items.find(i => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              total: state.total + item.price,
              totalItems: state.totalItems + 1,
            }
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            total: state.total + item.price,
            totalItems: state.totalItems + 1,
          }
        }),
      removeItem: id => {
        set(state => {
          const removedItem = state.items.find(i => i.id === id)
          return {
            items: state.items.filter(i => i.id !== id),
            total: state.total - removedItem?.price * removedItem?.quantity,
            totalItems: state.totalItems - removedItem?.quantity,
          }
        })
      },
      updateQuantity: (id, quantity) =>
        set(state => ({
          items: state.items.map(i => (i.id === id ? { ...i, quantity } : i)),
          total: state.items.reduce((acc, item) => {
            if (item.id === id) {
              return acc + item.price * quantity
            }
            return acc + item.price * item.quantity
          }, 0),
          totalItems: state.items.reduce((acc, item) => {
            if (item.id === id) {
              return acc + quantity
            }
            return acc + item.quantity
          }, 0),
        })),
      clearCart: () => set({ items: [], total: 0, totalItems: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
)
