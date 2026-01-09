<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('hero.title') }}</h1>
        <p>{{ $t('hero.subtitle') }}</p>
        <div class="btn-group">
          <router-link to="/services" class="btn btn-primary">{{ $t('hero.viewServices') }}</router-link>
          <router-link to="/about" class="btn btn-secondary">{{ $t('hero.aboutUs') }}</router-link>
        </div>
      </div>
    </section>
    
    <!-- 服务亮点区域 -->
    <section class="services-highlights">
      <div class="container">
        <h2 class="text-center">我们的服务</h2>
        <div class="services-grid">
          <div class="service-card" v-for="service in services" :key="service.id">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <router-link to="/services" class="service-link">了解更多 &rarr;</router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品展示区域 -->
    <section class="product-showcase">
      <div class="container">
        <div class="product-content">
          <div class="product-text">
            <h2>灵巧手驱动的自动化解决方案</h2>
            <p>我们的产品结合了最新的灵巧手技术，为企业提供高效、智能的自动化解决方案，帮助企业提升竞争力。</p>
            <div class="btn-group">
              <router-link to="/services" class="btn btn-primary">探索产品</router-link>
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
        <h2 class="text-center">成功案例</h2>
        <div class="cases-grid">
          <div class="case-card" v-for="caseItem in cases" :key="caseItem.id">
            <div class="case-industry">{{ caseItem.industry }}</div>
            <h3>{{ caseItem.title }}</h3>
            <p class="case-client">客户：{{ caseItem.client }}</p>
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
      <div class="container">
        <div class="contact-content">
          <h2>准备好开始了吗？</h2>
          <p>联系我们，了解如何利用灵巧手技术提升您的业务自动化水平。</p>
          <div class="btn-group">
            <router-link to="/contact" class="btn btn-primary">联系我们</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// 服务数据（从API获取，这里先使用模拟数据）
const services = ref([
  { id: 'dexterous-hand', name: '灵巧手产品', icon: '🤖', description: '高精度、高灵活性的灵巧手产品，适用于多种工业自动化场景' },
  { id: 'data-analytics', name: '数据分析', icon: '📊', description: '智能数据分析平台，洞察业务价值' },
  { id: 'automation', name: '自动化解决方案', icon: '⚙️', description: '灵巧手驱动的智能自动化方案' },
  { id: 'computer-vision', name: '视觉识别', icon: '👁️', description: '领先的计算机视觉技术，赋能各行业应用' },
])

// 案例数据（从API获取，这里先使用模拟数据）
const cases = ref([
  { id: 1, title: '金融科技智能风控', client: '某头部银行', industry: '金融', description: '部署智能风控系统，欺诈检测准确率提升40%', metrics: { accuracy: '99.2%', latency: '<50ms', cost: '-60%' } },
  { id: 2, title: '智能制造质检系统', client: '某汽车零部件企业', industry: '制造', description: '视觉质检方案，缺陷检测效率提升10倍', metrics: { accuracy: '99.8%', speed: '10x', roi: '300%' } },
  { id: 3, title: '智慧客服机器人', client: '某电商平台', industry: '零售', description: '7x24小时智能客服，日均处理10万+咨询', metrics: { satisfaction: '95%', resolution: '85%', cost: '-70%' } },
])

// 页面加载时的动画效果
onMounted(() => {
  // 添加滚动动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // 观察所有需要动画的元素
  document.querySelectorAll('.service-card, .case-card, .product-content').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped lang="scss">
/* 英雄区域 */
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('../assets/LZ-001.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 var(--spacing-md);
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.03em;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
  color: rgba(255, 255, 255, 0.9);
}

.hero .btn-secondary {
  border: 1px solid var(--color-white);
  background-color: transparent;
  color: var(--color-white);
  
  &:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
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
  padding: var(--spacing-xxl) 0;
  background-color: var(--color-white);
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-text h2 {
  margin-bottom: var(--spacing-md);
  font-size: 2.5rem;
}

.product-image {
  position: relative;
  height: 400px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.tech-animation {
  position: relative;
  width: 200px;
  height: 200px;
}

.tech-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
  
  &:nth-child(2) {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    animation-duration: 8s;
    animation-direction: reverse;
  }
  
  &:nth-child(3) {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 30%;
    animation-duration: 6s;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 成功案例 */
.success-stories {
  padding: var(--spacing-xxl) 0;
  background-color: var(--color-background);
}

.success-stories h2 {
  margin-bottom: var(--spacing-xl);
  font-size: 2.5rem;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.case-card {
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: 12px;
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

.case-industry {
  display: inline-block;
  background-color: var(--color-accent);
  color: var(--color-white);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.case-client {
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.case-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-weight: 600;
  color: var(--color-accent);
  font-size: 1.2rem;
}

.metric-label {
  display: block;
  font-size: 12px;
  color: var(--color-secondary);
}

/* 联系我们区域 */
.contact-section {
  padding: var(--spacing-xxl) 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: var(--color-white);
}

.contact-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.contact-content h2 {
  margin-bottom: var(--spacing-md);
  font-size: 2.5rem;
}

.contact-content p {
  margin-bottom: var(--spacing-xl);
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.2rem;
  }
  
  .services-grid,
  .cases-grid {
    grid-template-columns: 1fr;
  }
  
  .product-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .product-image {
    height: 300px;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
  }
}

/* 动画过渡 */
.service-card,
.case-card,
.product-content {
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}
</style>