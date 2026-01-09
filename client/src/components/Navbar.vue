<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- 品牌Logo -->
        <router-link to="/" class="navbar-brand">
          <img src="../assets/logo.png" alt="无锡灵掌机器人科技有限公司" class="logo" />
        </router-link>
        
        <!-- 桌面导航菜单 -->
        <ul class="navbar-menu">
          <li class="navbar-item">
            <router-link to="/" class="navbar-link">{{ $t('nav.home') }}</router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/services" class="navbar-link">{{ $t('nav.services') }}</router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/about" class="navbar-link">{{ $t('nav.about') }}</router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/contact" class="navbar-link">{{ $t('nav.contact') }}</router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/documentation" class="navbar-link">{{ $t('nav.docs') }}</router-link>
          </li>
          <!-- 语言选择 -->
          <li class="navbar-item lang-switcher">
            <a @click="toggleLocale" class="navbar-link lang-btn">
              {{ currentLocale === 'zh' ? 'EN' : '中文' }}
            </a>
          </li>
        </ul>
        
        <!-- 移动端菜单按钮 -->
        <button class="navbar-toggle" @click="toggleMenu">
          <span class="toggle-icon"></span>
        </button>
      </div>
    </div>
    
    <!-- 移动端导航菜单 -->
    <div class="mobile-menu" v-if="isMenuOpen">
      <ul class="mobile-menu-items">
        <li class="mobile-menu-item">
          <router-link to="/" class="mobile-menu-link" @click="toggleMenu">{{ $t('nav.home') }}</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/services" class="mobile-menu-link" @click="toggleMenu">{{ $t('nav.services') }}</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/about" class="mobile-menu-link" @click="toggleMenu">{{ $t('nav.about') }}</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/contact" class="mobile-menu-link" @click="toggleMenu">{{ $t('nav.contact') }}</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/documentation" class="mobile-menu-link" @click="toggleMenu">{{ $t('nav.docs') }}</router-link>
        </li>
        <li class="mobile-menu-item">
          <a class="mobile-menu-link" @click="toggleLocale(); toggleMenu()">
            {{ currentLocale === 'zh' ? 'Switch to English' : '切换至中文' }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isMenuOpen = ref(false)

const currentLocale = computed(() => locale.value)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleLocale = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  localStorage.setItem('user-language', newLocale)
}
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all var(--transition-fast);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
  
  .logo {
    height: 52px;
    width: auto;
    object-fit: contain;
  }
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-lg);
}

.navbar-item {
  position: relative;
}

.navbar-link {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
  opacity: 0.8;
  transition: opacity var(--transition-fast), color var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    opacity: 1;
    color: var(--color-accent);
    text-decoration: none;
  }
}

.lang-btn {
  padding: 4px 8px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  font-size: 12px !important;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.toggle-icon {
  display: block;
  width: 20px;
  height: 2px;
  background-color: var(--color-primary);
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: var(--color-primary);
    transition: all var(--transition-fast);
  }
  
  &::before {
    top: -6px;
  }
  
  &::after {
    bottom: -6px;
  }
}

.mobile-menu {
  posit60n: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: var(--spacing-sm) 0;
}

.mobile-menu-items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.mobile-menu-item {
  padding: 0 var(--spacing-md);
}

.mobile-menu-link {
  display: block;
  padding: 8px 0;
  font-size: 16px;
  color: var(--color-primary);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-accent);
    text-decoration: none;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }
  
  .navbar-toggle {
    display: block;
  }
}
</style>