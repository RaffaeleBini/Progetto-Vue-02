<template>
    <div class="product-list-container">
      <h2>I nostri prodotti sostenibili</h2>
      <p class="intro-text">Scopri la nostra selezione di prodotti creati con ingredienti recuperati, per un futuro più sostenibile.</p>
      
      <div v-if="products.length === 0" class="loading">
        <p>Caricamento prodotti in corso...</p>
      </div>
      
      <div v-else class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-image" @click="$emit('select-product', product)">
            <img :src="product.image" :alt="product.name" />
          </div>
          
          <div class="product-info">
            <h3 @click="$emit('select-product', product)">{{ product.name }}</h3>
            <p class="product-price">€{{ product.price.toFixed(2) }}</p>
            
            <div class="product-actions">
              <button 
                class="btn-details" 
                @click="$emit('select-product', product)"
              >
                Dettagli
              </button>
              <button 
                class="btn-add-cart" 
                @click="$emit('add-to-cart', product)"
              >
                + Aggiungi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
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
  defineProps<{
    products: Product[];
  }>();
  
  // Eventi
  defineEmits<{
    (e: 'select-product', product: Product): void;
    (e: 'add-to-cart', product: Product): void;
  }>();
  </script>
  
  <style scoped>
  .product-list-container {
    padding: 1rem 0;
  }
  
  h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  .intro-text {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .product-card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .product-image {
    height: 180px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .product-image img:hover {
    transform: scale(1.05);
  }
  
  .product-info {
    padding: 1rem;
  }
  
  .product-info h3 {
    margin: 0 0 0.5rem 0;
    cursor: pointer;
    color: var(--text-color);
  }
  
  .product-info h3:hover {
    color: var(--primary-color);
  }
  
  .product-price {
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  .product-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-details {
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid #ddd;
    flex: 1;
    margin-right: 0.5rem;
  }
  
  .btn-details:hover {
    background-color: #f0f0f0;
  }
  
  .btn-add-cart {
    background-color: var(--primary-color);
    color: white;
    flex: 1;
  }
  
  @media (min-width: 600px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 992px) {
    .product-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1200px) {
    .product-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  </style>