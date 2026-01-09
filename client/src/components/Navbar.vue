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
          <li class="navbar-item lang-switcher" @mouseenter="isLangMenuOpen = true" @mouseleave="isLangMenuOpen = false">
            <a class="navbar-link lang-btn">
              {{ currentLocaleLabel }}
              <span class="dropdown-arrow"></span>
            </a>
            <transition name="fade">
              <div class="lang-dropdown" v-if="isLangMenuOpen">
                <div 
                  v-for="lang in languages" 
                  :key="lang.code" 
                  class="lang-option" 
                  :class="{ active: locale === lang.code }"
                  @click="changeLocale(lang.code)"
                >
                  <span class="lang-flag">{{ lang.flag }}</span>
                  <span class="lang-name">{{ lang.name }}</span>
                </div>
              </div>
            </transition>
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
        <li class="mobile-menu-item lang-divider"></li>
        <li v-for="lang in languages" :key="lang.code" class="mobile-menu-item">
          <a class="mobile-menu-link lang-item" @click="changeLocale(lang.code); toggleMenu()">
            <span class="lang-flag">{{ lang.flag }}</span>
            <span class="lang-name">{{ lang.name }}</span>
            <span class="check-mark" v-if="locale === lang.code">✓</span>
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
const isLangMenuOpen = ref(false)

const languages = [
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

const currentLocaleLabel = computed(() => {
  const current = languages.find(l => l.code === locale.value)
  return current ? `${current.flag} ${current.name}` : '🌐 Language'
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const changeLocale = (langCode: string) => {
  locale.value = langCode
  localStorage.setItem('user-language', langCode)
  isLangMenuOpen.value = false
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
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.03);
  margin-left: 10px;
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(0, 0, 0, 0.06);
    border-color: var(--color-accent);
  }

  .dropdown-arrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid currentColor;
    opacity: 0.5;
  }
}

.lang-dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px;
  min-width: 140px;
  z-index: 1001;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background var(--transition-fast);
  color: var(--color-primary);
  font-size: 14px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  &.active {
    color: var(--color-accent);
    background: rgba(6, 108, 255, 0.05);
    font-weight: 600;
  }

  .lang-flag {
    font-size: 18px;
  }
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
  position: fixed;
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

  &.lang-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    opacity: 0.9;

    .check-mark {
      margin-left: auto;
      color: var(--color-accent);
      font-weight: bold;
    }
  }
}

.lang-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
  margin: 5px var(--spacing-md) !important;
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