<template>
  <div class="products">
    <section class="products-hero">
      <div class="container">
        <h1>{{ $t('productsPage.title') }}</h1>
        <p>{{ $t('productsPage.subtitle') }}</p>
      </div>
    </section>
    
    <section class="products-detail">
      <div class="container">
        <div class="products-grid">
          <div class="product-item" v-for="product in products" :key="product.id">
            <div class="product-info">
              <h2>{{ product.name }}</h2>
              <p>{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

// 产品数据
const products = computed(() => {
  const data = tm('productsPage.list')
  return Array.isArray(data) ? data : []
})
</script>

<style scoped lang="scss">
.products-hero {
  padding: var(--spacing-xxl) 0;
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.products-hero h1 {
  margin-bottom: var(--spacing-sm);
}

.products-hero p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.products-detail {
  padding: var(--spacing-xxl) 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-md);
}

.product-item {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  aspect-ratio: 1 / 1;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: var(--color-white);
  }
}

.product-info h2 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
}

.product-info p {
  font-size: 0.85rem;
  color: var(--color-secondary);
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>