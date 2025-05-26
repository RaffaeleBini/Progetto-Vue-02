<template>
  <div class="app-container">
    <!-- Notifica -->
    <div v-if="cartStore.notification" class="notification">
      {{ cartStore.notification }}
    </div>

    <AppHeader 
      :cartItemsCount="cartStore.cartItemsCount" 
      @toggle-cart="showCart = !showCart"
      @show-products="showCart = false" 
    />
    
    <main>
      <!-- Mostra il carrello quando showCart è true -->
      <ShoppingCart 
        v-if="showCart" 
        :items="cartStore.items" 
        @remove-item="cartStore.removeFromCart" 
        @update-quantity="cartStore.updateQuantity"
      />
      
      <!-- Altrimenti mostra o la lista prodotti o il dettaglio prodotto -->
      <template v-else>
        <ProductDetail 
          v-if="selectedProduct" 
          :product="selectedProduct" 
          @add-to-cart="cartStore.addToCart" 
          @back="selectedProduct = null" 
        />
        <ProductList 
          v-else 
          :products="products" 
          @select-product="selectProduct" 
          @add-to-cart="cartStore.addToCart" 
        />
      </template>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from './stores/cartStore'
import AppHeader from './components/AppHeader.vue'
import ProductList from './components/ProductList.vue'
import ProductDetail from './components/ProductDetail.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import AppFooter from './components/AppFooter.vue'
import type { Product } from './types/Product'

// Store
const cartStore = useCartStore()

// Stato dell'applicazione
const products = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)
const showCart = ref(false)

// Carica i dati dei prodotti dall'API
onMounted(async () => {
  try {
    const response = await fetch('https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json')
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Errore nel caricamento dei prodotti:', error)
  }
})

// Seleziona un prodotto per visualizzarne i dettagli
const selectProduct = (product: Product) => {
  selectedProduct.value = product
  window.scrollTo(0, 0)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #4caf50;
  --secondary-color: #ff9800;
  --text-color: #333;
  --background-color: #f9f9f9;
  --card-background: #fff;
  --border-radius: 8px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Stili per la notifica */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

button {
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: all 0.2s;
}

button:hover {
  background-color: #3d8b40;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.btn-secondary {
  background-color: var(--secondary-color);
}

.btn-secondary:hover {
  background-color: #e68900;
}

/* Responsive utility classes */
@media (min-width: 768px) {
  .desktop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .desktop-flex {
    display: flex;
  }
}
</style>