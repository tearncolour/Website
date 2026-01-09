<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-top: 44px; /* 与导航栏高度一致 */
}
</style>
