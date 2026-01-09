<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container" v-if="heroSlides.length > 0">
        <div class="hero-wrapper">
          <transition name="hero-fade" mode="out-in" appear>
            <div :key="currentSlide" class="hero-slide-content">
              <div class="hero-text">
                <h1>{{ heroSlides[currentSlide].title }}</h1>
                <p>{{ heroSlides[currentSlide].subtitle }}</p>
                <div class="btn-group">
                  <router-link to="/services" class="btn btn-primary">{{ heroSlides[currentSlide].btnPrimary }}</router-link>
                  <router-link to="/about" class="btn btn-outline">{{ heroSlides[currentSlide].btnOutline }}</router-link>
                </div>
              </div>
              <div class="hero-image">
                <img src="../assets/LZ-001.png" alt="Dexterous Hand" />
              </div>
            </div>
          </transition>
        </div>
        
        <!-- 幻灯片指示器 -->
        <div class="hero-indicators">
          <button 
            v-for="(_, index) in heroSlides" 
            :key="index" 
            :class="['indicator-dot', { active: currentSlide === index }]"
            @click="goToSlide(index)"
            :aria-label="'Go to slide ' + (index + 1)"
          ></button>
        </div>
      </div>
    </section>
    
    <!-- 服务亮点区域 -->
    <section class="services-highlights">
      <div class="container">
        <h2 class="text-center section-header">{{ $t('home.services.title') }}</h2>
        <div class="services-grid">
          <div class="service-card" v-for="service in servicesList" :key="service.id">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <router-link to="/services" class="service-link">{{ $t('home.services.learnMore') }} &rarr;</router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品展示区域 -->
    <section class="product-showcase">
      <div class="container">
        <div class="product-content">
          <div class="product-text">
            <h2 class="section-header">{{ $t('home.product.title') }}</h2>
            <p>{{ $t('home.product.description') }}</p>
            <div class="btn-group">
              <router-link to="/services" class="btn btn-primary">{{ $t('home.product.button') }}</router-link>
            </div>
          </div>
          <div class="product-image">
            <div class="image-placeholder">
              <div class="tech-animation">
                <div class="tech-circle"></div>
                <div class="tech-circle"></div>
                <div class="tech-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 成功案例区域 -->
    <section class="success-stories">
      <div class="container">
        <h2 class="text-center section-header">{{ $t('home.cases.title') }}</h2>
        <div class="cases-grid">
          <div class="case-card" v-for="caseItem in casesList" :key="caseItem.id">
            <div class="case-industry">{{ caseItem.industry }}</div>
            <h3>{{ caseItem.title }}</h3>
            <p class="case-client">{{ $t('home.cases.clientPrefix') }}{{ caseItem.client }}</p>
            <p>{{ caseItem.description }}</p>
            <div class="case-metrics">
              <div class="metric" v-for="(value, key) in caseItem.metrics" :key="key">
                <span class="metric-value">{{ value }}</span>
                <span class="metric-label">{{ key }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 联系我们区域 -->
    <section class="contact-section">
      <div class="container reveal">
        <div class="contact-content">
          <h2 class="section-header">{{ $t('home.contact.title') }}</h2>
          <p>{{ $t('home.contact.description') }}</p>
          <div class="btn-group">
            <router-link to="/contact" class="btn btn-primary">{{ $t('home.contact.button') }}</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const scrollObserver = ref<IntersectionObserver | null>(null)
const currentSlide = ref(0)
const slideInterval = ref<any>(null)

// Hero 幻灯片数据
const heroSlides = computed(() => {
  const slides = tm('hero.slides')
  return Array.isArray(slides) ? slides : []
})

const nextSlide = () => {
  if (heroSlides.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetSlideTimer()
}

const resetSlideTimer = () => {
  if (slideInterval.value) clearInterval(slideInterval.value)
  slideInterval.value = setInterval(nextSlide, 5000)
}

// 服务数据
const servicesList = computed(() => {
  const data = tm('home.services.items') as any[]
  const icons = ['🤖', '📊', '⚙️', '👁️']
  return data.map((item, index) => ({
    ...item,
    id: index,
    icon: icons[index]
  }))
})

// 案例数据
const casesList = computed(() => {
  return tm('home.cases.items') as any[]
})

// 页面加载时的动画效果
onMounted(async () => {
  await nextTick()
  resetSlideTimer()
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px' // 增加底部边距，确保元素进入更多时才触发
  }

  scrollObserver.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
      }
    })
  }, observerOptions)

  // 观察元素
  const elementsToWatch = document.querySelectorAll('.reveal, .service-card, .case-card, .product-content, .section-header')
  elementsToWatch.forEach(el => {
    scrollObserver.value?.observe(el)
  })
})

onUnmounted(() => {
  if (scrollObserver.value) {
    scrollObserver.value.disconnect()
  }
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
})
</script>

<style scoped lang="scss">
.home {
  /* 恢复标准滚动，确保 IntersectionObserver 正常检测主体滚动 */
  height: auto;
  min-height: 100vh;
  overflow-y: visible;
  overflow-x: hidden; /* 防止大尺寸偏移图片造成水平溢出 */
  scroll-behavior: smooth;
}

/* 基础整屏样式 */
section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 120px 0;
  box-sizing: border-box;
}

/* 英雄区域背景优化 */
.hero {
  background-color: var(--color-white);
  color: var(--color-primary);
  text-align: left;
  padding: 0;
  overflow: hidden; /* 确保超大图片剪裁在区域内而不影响全局 */
}

.hero-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.hero-slide-content {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: var(--spacing-xl);
  align-items: center;
  min-height: 100vh;
  padding-bottom: 10vh;
  box-sizing: border-box;
}

/* 幻灯片指示器 */
.hero-indicators {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;

  .indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.15);
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0;

    &.active {
      background: var(--color-primary);
      width: 24px; /* 药丸型动态指示器 */
      border-radius: 3px;
    }
  }
}

/* 幻灯片切换动画 - 苹果风格：平滑、优雅 */
.hero-fade-enter-active {
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-fade-enter-from {
  opacity: 0;
  transform: scale(1.02) translateY(30px);
}

.hero-fade-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(-30px);
}

.hero-text {
  z-index: 2;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  
  img {
    width: 125%; /* 进一步缩小比例以提升整体协调性 */
    max-width: none;
    height: auto;
    max-height: 90vh; 
    object-fit: contain;
    filter: none;
    transform: translateX(-5%); /* 保持略微内移，避免贴边 */
    pointer-events: none;
  }
}

@keyframes heroReveal {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 通用动画类 */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  
  &.reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  margin-bottom: var(--spacing-xl);
  
  &.reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 按钮组平滑过渡 - 仅针对英雄区 */
.hero .btn-group {
  opacity: 0;
  transform: translateY(20px);
  animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.6s;
}

/* 修改原有组件动画 */
.service-card, 
.case-card, 
.product-content,
.reveal {
  opacity: 0;
  transform: translateY(50px) scale(0.98);
  transition: opacity 1.2s cubic-bezier(0.15, 0, 0.15, 1), 
              transform 1.2s cubic-bezier(0.15, 0, 0.15, 1);
  will-change: opacity, transform;
  
  &.reveal-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 逐个进入效果（瀑布式） */
@for $i from 1 through 10 {
  .services-grid .service-card:nth-child(#{$i}),
  .cases-grid .case-card:nth-child(#{$i}) {
    transition-delay: #{$i * 0.1}s;
  }
}

.hero h1 {
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.hero p {
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-xl);
}

.hero .btn-group {
  justify-content: flex-start;
}

.hero .btn {
  min-width: 160px;
}

.hero .btn-outline {
  border: 1px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
}

/* 服务亮点 */
.services-highlights {
  padding: var(--spacing-xxl) 0;
  background-color: var(--color-background);
}

.services-highlights h2 {
  margin-bottom: var(--spacing-xl);
  font-size: 2.5rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.service-card {
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: 12px;
  text-align: center;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  opacity: 0;
  transform: translateY(30px);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
}

.service-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.service-card h3 {
  margin-bottom: var(--spacing-sm);
}

.service-link {
  display: inline-block;
  margin-top: var(--spacing-md);
  font-weight: 500;
  
  &:hover {
    text-decoration: none;
  }
}

/* 产品展示 */
.product-showcase {
  background-color: var(--color-white);
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
}

.product-image {
  position: relative;
  height: 500px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1d1d1f 0%, #434345 100%);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

.tech-animation {
  position: relative;
  width: 260px;
  height: 260px;
}

.tech-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: rotate 15s linear infinite;
  
  &:nth-child(2) {
    width: 75%;
    height: 75%;
    top: 12.5%;
    left: 12.5%;
    border-color: rgba(255,255,255,0.4);
    animation-duration: 12s;
    animation-direction: reverse;
  }
  
  &:nth-child(3) {
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    border-color: var(--color-accent);
    border-width: 2px;
    animation-duration: 9s;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 成功案例 */
.success-stories {
  background-color: var(--color-background);
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

.case-card {
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  }
}

.case-industry {
  display: inline-block;
  background-color: #f1f1f3;
  color: var(--color-secondary);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: var(--spacing-md);
}

.case-client {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.case-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid #eee;
}

.metric-value {
  display: block;
  font-weight: 700;
  color: var(--color-accent);
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}

.metric-label {
  display: block;
  font-size: 12px;
  color: var(--color-secondary);
  margin-top: 4px;
}

/* 联系我们区域 */
.contact-section {
  background: var(--color-primary);
  color: var(--color-white);
}

.contact-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.contact-content h2 {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-lg);
}

.contact-content p {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
  color: rgba(255, 255, 255, 0.7);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero h1 { font-size: 2.8rem; }
  .hero p { font-size: 1.1rem; }
  .contact-content h2 { font-size: 2.5rem; }
  
  .hero-wrapper {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-xl);
    padding-top: var(--spacing-xl);
  }
  
  .hero .btn-group {
    justify-content: center;
  }
  
  .product-content {
    grid-template-columns: 1fr;
  }
  
  .product-image {
    height: 350px;
  }
  
  section {
    scroll-snap-align: none;
    height: auto;
    min-height: auto;
    padding: var(--spacing-xl) 0;
  }
  
  .home {
    scroll-snap-type: none;
    height: auto;
  }
}
</style>