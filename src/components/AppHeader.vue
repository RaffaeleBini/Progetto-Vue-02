<template>
    <header class="app-header">
      <div class="logo-container" @click="$emit('show-products')">
        <img src="../assets/RefreshFood_Logo.png" alt="ReFresh Food Logo" class="logo" />
        <h1>ReFresh Food</h1>
      </div>
      
      <div class="cart-button" @click="$emit('toggle-cart')">
        <div class="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartItemsCount > 0" class="cart-badge">{{ cartItemsCount }}</span>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    cartItemsCount: number;
  }>();
  
  defineEmits<{
    (e: 'toggle-cart'): void;
    (e: 'show-products'): void;
  }>();
  </script>
  
  <style scoped>
  .app-header {
    background-color: var(--primary-color);
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .logo {
    height: 2rem;
    margin-right: 0.5rem;
  }
  
  h1 {
    color: white;
    margin: 0;
    font-size: 1.2rem;
  }
  
  .cart-button {
    position: relative;
    cursor: pointer;
  }
  
  .cart-icon {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cart-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: var(--secondary-color);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
  }
  
  @media (min-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
    
    .logo {
      height: 2.5rem;
    }
  }
  </style>