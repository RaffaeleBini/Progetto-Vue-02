<template>
    <div class="product-detail">
      <button class="back-button" @click="$emit('back')">
        &larr; Indietro
      </button>
      
      <div class="product-content">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <div class="product-category">{{ product.category }}</div>
          
          <div class="product-price">€{{ product.price.toFixed(2) }}</div>
          
          <p class="product-description">{{ product.description }}</p>
          
          <div class="sustainability-info">
            <h4>Impatto ambientale positivo</h4>
            <ul>
              <li>Riduzione dei rifiuti alimentari</li>
              <li>Minore impronta di carbonio</li>
              <li>Supporto ai produttori locali</li>
            </ul>
          </div>
          
          <div class="quantity-selector">
            <button class="quantity-btn" @click="updateQuantity(-1)">-</button>
            <span class="quantity">{{ quantity }}</span>
            <button class="quantity-btn" @click="updateQuantity(1)">+</button>
          </div>
          
          <button class="add-to-cart-btn" @click="addToCart">
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Definizione dell'interfaccia Product
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }
  
  // Props
  const props = defineProps<{
    product: Product;
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'back'): void;
    (e: 'add-to-cart', product: Product): void;
  }>();
  
  // Stato
  const quantity = ref(1);
  
  // Metodi
  const updateQuantity = (change: number) => {
    const newQuantity = quantity.value + change;
    if (newQuantity >= 1) {
      quantity.value = newQuantity;
    }
  };
  
  const addToCart = () => {
    // Aggiungi il prodotto al carrello tante volte quante indicate dalla quantità
    for (let i = 0; i < quantity.value; i++) {
      emit('add-to-cart', props.product);
    }
    // Reset della quantità dopo l'aggiunta
    quantity.value = 1;
  };
  </script>
  
  <style scoped>
  .product-detail {
    padding: 1rem 0;
  }
  
  .back-button {
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid #ddd;
    margin-bottom: 1.5rem;
    display: inline-flex;
    align-items: center;
  }
  
  .back-button:hover {
    background-color: #f0f0f0;
  }
  
  .product-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .product-image-container {
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  
  .product-image {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  
  .product-info {
    flex: 1;
  }
  
  .product-info h2 {
    margin: 0 0 0.5rem;
    color: var(--text-color);
  }
  
  .product-category {
    display: inline-block;
    background-color: #e8f5e9;
    color: var(--primary-color);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
  
  .product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  .product-description {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .sustainability-info {
    background-color: #f1f8e9;
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
  }
  
  .sustainability-info h4 {
    color: var(--primary-color);
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .sustainability-info ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .sustainability-info li {
    margin-bottom: 0.25rem;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .quantity-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .quantity {
    margin: 0 1rem;
    font-weight: bold;
  }
  
  .add-to-cart-btn {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    width: 100%;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .add-to-cart-btn:hover {
    background-color: #3d8b40;
  }
  
  @media (min-width: 768px) {
    .product-content {
      flex-direction: row;
    }
    
    .product-image-container {
      width: 50%;
    }
    
    .product-info {
      width: 50%;
      padding-left: 2rem;
    }
  }
  </style>