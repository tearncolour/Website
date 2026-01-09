<template>
  <div class="downloads">
    <section class="downloads-hero">
      <div class="container">
        <h1>下载中心</h1>
        <p>获取产品手册、驱动程序及软件工具</p>
      </div>
    </section>
    
    <section class="downloads-content">
      <div class="container">
        <t-tabs v-model="activeTab">
          <t-tab-panel value="manuals" label="产品手册">
            <div class="download-grid">
              <div v-for="item in manuals" :key="item.id" class="download-item">
                <div class="file-icon">📄</div>
                <div class="file-info">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.size }} | {{ item.date }}</p>
                </div>
                <t-button theme="primary" variant="outline" :href="item.link" target="_blank">下载</t-button>
              </div>
            </div>
          </t-tab-panel>
          <t-tab-panel value="drivers" label="驱动程序">
            <div class="download-grid">
              <div v-for="item in drivers" :key="item.id" class="download-item">
                <div class="file-icon">💾</div>
                <div class="file-info">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.version }} | {{ item.size }} | {{ item.date }}</p>
                </div>
                <t-button theme="primary" variant="outline" :href="item.link" target="_blank">下载</t-button>
              </div>
            </div>
          </t-tab-panel>
          <t-tab-panel value="software" label="软件工具">
            <div class="download-grid">
              <div v-for="item in software" :key="item.id" class="download-item">
                <div class="file-icon">💻</div>
                <div class="file-info">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.version }} | {{ item.os }}</p>
                </div>
                <t-button theme="primary" variant="outline" :href="item.link" target="_blank">下载</t-button>
              </div>
            </div>
          </t-tab-panel>
        </t-tabs>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('manuals')

const manuals = [
  { id: 1, title: 'LZ-01 灵巧手用户手册', size: '5.2 MB', date: '2025-12-01', link: '#' },
  { id: 2, title: 'LZ-Silent静音版说明书', size: '3.8 MB', date: '2025-11-15', link: '#' }
]

const drivers = [
  { id: 1, title: 'ROS2 驱动包 (Humble)', version: 'v1.2.0', size: '15 MB', date: '2026-01-05', link: '#' },
  { id: 2, title: 'Windows 驱动程序', version: 'v2.0.1', size: '8.5 MB', date: '2025-10-20', link: '#' }
]

const software = [
  { id: 1, title: 'DexterousHand Control Center', version: 'v3.5.0', os: 'Windows 10/11', link: '#' },
  { id: 2, title: 'Calibration Tool', version: 'v1.1.2', os: 'Linux / Windows', link: '#' }
]
</script>

<style scoped lang="scss">
.downloads-hero {
  padding: var(--spacing-xxl) 0;
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.downloads-hero h1 {
  margin-bottom: var(--spacing-sm);
}

.downloads-hero p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.downloads-content {
  padding: var(--spacing-xxl) 0;
  min-height: 50vh;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.download-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-background);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.file-icon {
  font-size: 2.5rem;
}

.file-info {
  flex: 1;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 4px;
    color: var(--color-text);
  }

  p {
    font-size: 0.85rem;
    color: var(--color-secondary);
  }
}
</style>