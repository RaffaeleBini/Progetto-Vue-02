<template>
  <div class="app-container">
    <AppHeader 
      :cartItemsCount="cartItems.length" 
      @toggle-cart="showCart = !showCart"
      @show-products="showCart = false" 
    />
    
    <main>
      <!-- Mostra il carrello quando showCart è true -->
      <ShoppingCart 
        v-if="showCart" 
        :items="cartItems" 
        @remove-item="removeFromCart" 
        @update-quantity="updateCartItemQuantity"
      />
      
      <!-- Altrimenti mostra o la lista prodotti o il dettaglio prodotto -->
      <template v-else>
        <ProductDetail 
          v-if="selectedProduct" 
          :product="selectedProduct" 
          @add-to-cart="addToCart" 
          @back="selectedProduct = null" 
        />
        <ProductList 
          v-else 
          :products="products" 
          @select-product="selectProduct" 
          @add-to-cart="addToCart" 
        />
      </template>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetail.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import AppFooter from './components/AppFooter.vue';

// Definizione dei tipi
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Stato dell'applicazione
const products = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);
const cartItems = ref<CartItem[]>([]);
const showCart = ref(false);

// Carica i dati dei prodotti dall'API
onMounted(async () => {
  try {
    const response = await fetch('https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json');
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error('Errore nel caricamento dei prodotti:', error);
  }
});

// Seleziona un prodotto per visualizzarne i dettagli
const selectProduct = (product: Product) => {
  selectedProduct.value = product;
  window.scrollTo(0, 0);
};

// Aggiungi un prodotto al carrello
const addToCart = (product: Product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
  
  // Salva il carrello nel localStorage
  localStorage.setItem('refreshFoodCart', JSON.stringify(cartItems.value));
};

// Rimuovi un prodotto dal carrello
const removeFromCart = (productId: number) => {
  cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  localStorage.setItem('refreshFoodCart', JSON.stringify(cartItems.value));
};

// Aggiorna la quantità di un prodotto nel carrello
const updateCartItemQuantity = (productId: number, quantity: number) => {
  const item = cartItems.value.find(item => item.product.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem('refreshFoodCart', JSON.stringify(cartItems.value));
    }
  }
};

// Carica il carrello dal localStorage all'avvio dell'app
onMounted(() => {
  const savedCart = localStorage.getItem('refreshFoodCart');
  if (savedCart) {
    try {
      cartItems.value = JSON.parse(savedCart);
    } catch (e) {
      console.error('Errore nel parsing del carrello salvato:', e);
    }
  }
});

// Mostra notifica quando un prodotto viene aggiunto al carrello
watch(cartItems, () => {
  // Qui si potrebbe implementare una notifica
}, { deep: true });
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
}

main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

button {
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3d8b40;
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