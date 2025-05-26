<template>
    <div class="shopping-cart">
      <h2>Il tuo carrello</h2>
      
      <!-- Debug: mostra struttura del carrello -->
      <div v-if="debugMode" class="debug-info">
        <h4>Debug - Contenuto carrello:</h4>
        <pre>{{ JSON.stringify(items, null, 2) }}</pre>
      </div>
      
      <div v-if="items.length === 0" class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-cart-icon">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Il tuo carrello è vuoto</p>
        <p class="empty-cart-subtitle">Scopri i nostri prodotti sostenibili e aggiungi qualcosa al carrello</p>
      </div>
      
      <div v-else>
        <div class="cart-items">
          <div v-for="item in items" :key="item.product.id" class="cart-item">
            <div class="item-image">
              <img :src="item.product.image" :alt="item.product.name" />
            </div>
            
            <div class="item-details">
              <h3>{{ item.product.name }}</h3>
              <p class="item-price">€{{ item.product.price.toFixed(2) }}</p>
              <!-- Debug: mostra ID del prodotto -->
              <small v-if="debugMode" class="debug-id">ID: {{ item.product.id }}</small>
            </div>
            
            <div class="item-quantity">
              <button @click="updateQuantity(item.product.id, item.quantity - 1)" class="quantity-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.product.id, item.quantity + 1)" class="quantity-btn">+</button>
            </div>
            
            <div class="item-total">
              €{{ (item.product.price * item.quantity).toFixed(2) }}
            </div>
            
            <button class="remove-item" @click="removeItem(item.product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="cart-totals">
          <div class="subtotal">
            <span>Subtotale:</span>
            <span>€{{ subtotal.toFixed(2) }}</span>
          </div>
          
          <div v-if="discount > 0" class="discount">
            <span>Sconto (10%):</span>
            <span>-€{{ discount.toFixed(2) }}</span>
          </div>
          
          <div class="total">
            <span>Totale:</span>
            <span>€{{ total.toFixed(2) }}</span>
          </div>
        </div>
        
        <div v-if="discountMessage" class="discount-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="discount-icon">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>{{ discountMessage }}</span>
        </div>
        
        <!-- Pulsante per toggle debug -->
        <button @click="debugMode = !debugMode" class="debug-toggle">
          {{ debugMode ? 'Nascondi Debug' : 'Mostra Debug' }}
        </button>
        
        <button class="checkout-btn">Procedi al checkout</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  
  // Definizione delle interfacce
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
  
  // Debug mode
  const debugMode = ref(false);
  
  // Props
  const props = defineProps<{
    items: CartItem[];
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'remove-item', productId: number): void;
    (e: 'update-quantity', productId: number, quantity: number): void;
  }>();
  
  // Computed properties
  const subtotal = computed(() => {
    return props.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });
  
  const discount = computed(() => {
    // Calcola lo sconto del 10% se ci sono più di 3 prodotti
    const totalItems = props.items.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems > 3 ? subtotal.value * 0.1 : 0;
  });
  
  const total = computed(() => {
    return subtotal.value - discount.value;
  });
  
  const discountMessage = computed(() => {
    const totalItems = props.items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (discount.value > 0) {
      return "Sconto del 10% applicato! Hai più di 3 prodotti nel carrello.";
    } else if (totalItems > 0) {
      const itemsNeeded = 4 - totalItems;
      return `Aggiungi altri ${itemsNeeded} prodott${itemsNeeded === 1 ? 'o' : 'i'} per ottenere uno sconto del 10%!`;
    }
    
    return null;
  });
  
  // Methods
  const removeItem = (productId: number) => {
    emit('remove-item', productId);
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    emit('update-quantity', productId, quantity);
  };
  </script>
  
  <style scoped>
  .shopping-cart {
    padding: 1rem 0;
  }
  
  h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
  
  .debug-info {
    background: #f0f0f0;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }
  
  .debug-id {
    color: #666;
    font-size: 0.7rem;
  }
  
  .debug-toggle {
    background: #666;
    color: white;
    font-size: 0.8rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .empty-cart {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .empty-cart-icon {
    color: #ccc;
    margin-bottom: 1rem;
  }
  
  .empty-cart p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .empty-cart-subtitle {
    font-size: 0.9rem;
    color: #888;
  }
  
  .cart-items {
    margin-bottom: 2rem;
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 80px 1fr auto auto auto;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: 1rem;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-details h3 {
    margin: 0 0 0.25rem;
    font-size: 1rem;
  }
  
  .item-price {
    color: #666;
    font-size: 0.9rem;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .quantity-btn {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0;
    font-size: 1rem;
  }
  
  .item-total {
    font-weight: bold;
    text-align: right;
    min-width: 70px;
  }
  
  .remove-item {
    background: transparent;
    color: #666;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
  }
  
  .remove-item:hover {
    color: #f44336;
    background: transparent;
  }
  
  .cart-totals {
    background-color: #f9f9f9;
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .subtotal, .discount, .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .total {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #ddd;
  }
  
  .discount {
    color: var(--primary-color);
  }
  
  .discount-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #e8f5e9;
    color: var(--primary-color);
    padding: 0.75rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
  }
  
  .discount-icon {
    color: var(--secondary-color);
  }
  
  .checkout-btn {
    background-color: var(--primary-color);
    color: white;
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .checkout-btn:hover {
    background-color: #3d8b40;
  }
  
  @media (max-width: 600px) {
    .cart-item {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .item-image {
      width: 100%;
      height: 150px;
    }
    
    .item-quantity, .item-details, .item-total {
      text-align: center;
      justify-content: center;
    }
    
    .remove-item {
      margin-top: 0.5rem;
    }
  }
  </style>