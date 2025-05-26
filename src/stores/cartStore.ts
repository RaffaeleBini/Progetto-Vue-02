import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types/Product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const notification = ref<string | null>(null)

  // Getters
  const cartItemsCount = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  )

  // Actions
  const addToCart = (product: Product) => {
    console.log('Aggiungendo prodotto al carrello:', product) // Debug
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ product, quantity: 1 })
    }
    
    console.log('Carrello aggiornato:', items.value) // Debug
    
    // Mostra notifica
    showNotification(`${product.name} aggiunto al carrello!`)
  }

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const showNotification = (message: string) => {
    notification.value = message
    setTimeout(() => {
      notification.value = null
    }, 3000)
  }

  return {
    // State
    items,
    notification,
    // Getters
    cartItemsCount,
    cartTotal,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    showNotification
  }
})