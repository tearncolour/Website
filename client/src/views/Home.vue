<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container" v-if="heroSlides.length > 0">
        <div class="hero-wrapper">
          <div class="hero-slide-content">
            <div class="hero-text">
              <h1>{{ heroSlides[0].title }}</h1>
              <p>{{ heroSlides[0].subtitle }}</p>
              <div class="btn-group">
                <router-link to="/products" class="btn btn-primary">{{ heroSlides[0].btnPrimary }}</router-link>
                <router-link to="/about" class="btn btn-outline">{{ heroSlides[0].btnOutline }}</router-link>
              </div>
            </div>
            <div class="hero-image">
              <img src="../assets/LZ-001.png" alt="Dexterous Hand" />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 客户案例区域 -->
    <section class="success-stories">
      <div class="container">
        <p class="text-center cases-subtitle">{{ $t('home.cases.title') }}</p>
        
        <div class="scroller-container">
          <!-- 第一排：向左滚动 -->
          <div class="logo-scroller scroll-left">
            <div class="logo-track">
              <div class="logo-item" v-for="n in 8" :key="'r1-' + n">
                <div class="logo-placeholder">Partner {{ n }}</div>
              </div>
              <div class="logo-item" v-for="n in 8" :key="'r1-dup-' + n">
                <div class="logo-placeholder">Partner {{ n }}</div>
              </div>
            </div>
          </div>

          <!-- 第二排：向右滚动 (对向) -->
          <div class="logo-scroller scroll-right">
            <div class="logo-track">
              <div class="logo-item" v-for="n in 8" :key="'r2-' + n">
                <div class="logo-placeholder">Partner {{ n + 8 }}</div>
              </div>
              <div class="logo-item" v-for="n in 8" :key="'r2-dup-' + n">
                <div class="logo-placeholder">Partner {{ n + 8 }}</div>
              </div>
            </div>
          </div>

          <!-- 第三排：向左滚动 (错位) -->
          <div class="logo-scroller scroll-left offset">
            <div class="logo-track">
              <div class="logo-item" v-for="n in 8" :key="'r3-' + n">
                <div class="logo-placeholder">Partner {{ n + 16 }}</div>
              </div>
              <div class="logo-item" v-for="n in 8" :key="'r3-dup-' + n">
                <div class="logo-placeholder">Partner {{ n + 16 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新闻中心区域 -->
    <section class="news-section">
      <div class="container">
        <h2 class="section-header">新闻中心</h2>
        <div class="news-horizontal-container">
          <div class="news-track">
            <a v-for="news in newsList" :key="news.id" :href="news.link" target="_blank" class="news-card">
              <div class="news-image">
                <img :src="news.image" alt="news thumbnail" />
                <div class="news-date">{{ news.date }}</div>
              </div>
              <div class="news-content">
                <h3>{{ news.title }}</h3>
                <span class="news-source">{{ news.source }}</span>
              </div>
            </a>
          </div>
        </div>
        <!-- 底部横向滚动条指示 -->
        <div class="scrollbar-hint">
          <div class="scroll-instruction">← 滑动查看更多 →</div>
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
            <router-link to="/about" class="btn btn-primary">{{ $t('home.contact.button') }}</router-link>
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
const newsList = ref<any[]>([])

// 异步获取新闻
const fetchNewsData = async () => {
  try {
    const response = await fetch('/api/news')
    const result = await response.json()
    if (result.success) {
      newsList.value = result.data
    }
  } catch (err) {
    console.error('Failed to fetch news:', err)
    // 降级处理：手动填入抓取到的主要新闻
    newsList.value = [
      { id: 1, title: '行业首个！凯龙高科灵巧手全操作力动态检测平台发布', date: '2025-12-23', source: '新浪财经', link: 'https://finance.sina.com.cn/', image: 'https://img1.baidu.com/it/u=2238382717,1030097123&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333' },
      { id: 2, title: '凯龙机器人布局落地双提速 展会彰显硬实力', date: '2025-11-28', source: '东方财富网', link: 'https://caifu.eastmoney.com/', image: 'https://img2.baidu.com/it/u=3070497551,3323049071&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500' },
      { id: 3, title: '无锡造具身智能机器人,硬核出道!', date: '2025-11-27', source: '无锡观察', link: 'https://www.wuxi.gov.cn/', image: 'https://img.pconline.com.cn/images/upload/upc/tx/itbd/1406/11/c3/35165158_1402473636734.jpg' }
    ]
  }
}

// Hero 幻灯片数据
const heroSlides = computed(() => {
  const slides = tm('hero.slides')
  return Array.isArray(slides) ? slides : []
})

// 页面加载时的动画效果
onMounted(async () => {
  fetchNewsData()
  await nextTick()
  
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
  const elementsToWatch = document.querySelectorAll('.reveal, .case-card, .news-card, .product-content, .section-header')
  elementsToWatch.forEach(el => {
    scrollObserver.value?.observe(el)
  })
})

onUnmounted(() => {
  if (scrollObserver.value) {
    scrollObserver.value.disconnect()
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

/* 导航与内容显示 */

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

/* 客户案例 */
.success-stories {
  background-color: var(--color-background);
  padding: var(--spacing-xxl) 0;
  overflow: hidden;
}

.cases-subtitle {
  font-size: 1.25rem;
  color: var(--color-secondary);
  font-weight: 500;
  margin-bottom: 30px;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

.scroller-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.logo-scroller {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
  
  &::before, &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 2;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, var(--color-background), transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, var(--color-background), transparent);
  }
}

.logo-track {
  display: flex;
  width: max-content;
  gap: 30px;
}

.scroll-left .logo-track {
  animation: scroll-left 30s linear infinite;
}

.scroll-right .logo-track {
  animation: scroll-right 30s linear infinite;
}

.scroll-left.offset .logo-track {
  animation-duration: 35s; /* 不同的速度产生错位感 */
}

.logo-scroller:hover .logo-track {
  animation-play-state: paused;
}

.logo-item {
  width: 180px;
  flex-shrink: 0;
}

.logo-placeholder {
  width: 100%;
  height: 90px;
  background-color: var(--color-white);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #adb5bd;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    border-color: var(--color-accent);
    color: var(--color-accent);
    background-color: var(--color-white);
  }
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-210px * 8)); } /* width 180px + gap 30px */
}

@keyframes scroll-right {
  0% { transform: translateX(calc(-210px * 8)); }
  100% { transform: translateX(0); }
}

/* 新闻中心 */
.news-section {
  padding: var(--spacing-xxl) 0;
  background-color: var(--color-white);
}

.news-horizontal-container {
  overflow-x: auto;
  padding: 20px 0;
  margin: 0 -20px;
  -webkit-overflow-scrolling: touch;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent);
  }
}

.news-track {
  display: flex;
  gap: 30px;
  padding: 0 40px;
  width: max-content;
}

.news-card {
  width: 320px;
  background: var(--color-white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  text-decoration: none;
  color: inherit;
  display: block;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    
    .news-image img {
      transform: scale(1.1);
    }
  }
}

.news-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
}

.news-date {
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border-top-right-radius: 8px;
}

.news-content {
  padding: 20px;
  
  h3 {
    font-size: 1.1rem;
    line-height: 1.4;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 3rem;
  }
}

.news-source {
  font-size: 0.85rem;
  color: var(--color-secondary);
  opacity: 0.7;
}

.scrollbar-hint {
  text-align: center;
  margin-top: 20px;
  color: var(--color-secondary);
  font-size: 0.9rem;
  opacity: 0.6;
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