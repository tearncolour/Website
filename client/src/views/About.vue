<template>
  <div class="about">
    <section class="about-hero">
      <div class="container">
        <h2>关于我们</h2>
    <p>无锡灵掌机器人科技有限公司致力于提供先进的灵巧手解决方案</p>
      </div>
    </section>
    
    <section class="company-info">
      <div class="container">
        <div class="info-content">
          <div class="info-text">
            <h2>公司简介</h2>
            <p>无锡灵掌机器人科技有限公司成立于2020年，是一家专注于灵巧手技术研发和应用的创新型企业。我们拥有一支由顶尖科学家和工程师组成的团队，致力于为企业提供领先的灵巧手解决方案。</p>
            <p>我们的使命是利用灵巧手技术赋能企业自动化转型，帮助企业提升效率、降低成本、创造价值。</p>
          </div>
          <div class="info-stats">
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">专业团队</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100+</span>
              <span class="stat-label">服务客户</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5+</span>
              <span class="stat-label">核心技术</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">20+</span>
              <span class="stat-label">专利申请</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="company-culture">
      <div class="container">
        <h2 class="text-center">企业文化</h2>
        <div class="culture-grid">
          <div class="culture-item">
            <h3>创新</h3>
            <p>持续创新是我们发展的动力</p>
          </div>
          <div class="culture-item">
            <h3>专业</h3>
            <p>专业技术是我们服务的保障</p>
          </div>
          <div class="culture-item">
            <h3>合作</h3>
            <p>合作共赢是我们发展的理念</p>
          </div>
          <div class="culture-item">
            <h3>客户第一</h3>
            <p>客户需求是我们服务的导向</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.about-hero {
  padding: var(--spacing-xxl) 0;
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.about-hero h1 {
  margin-bottom: var(--spacing-sm);
}

.about-hero p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.company-info {
  padding: var(--spacing-xxl) 0;
}

.info-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.info-text h2 {
  margin-bottom: var(--spacing-md);
}

.info-text p {
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
}

.info-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.stat-item {
  background-color: var(--color-background);
  padding: var(--spacing-lg);
  border-radius: 12px;
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  display: block;
  font-size: 1rem;
  color: var(--color-secondary);
}

.company-culture {
  padding: var(--spacing-xxl) 0;
  background-color: var(--color-background);
}

.company-culture h2 {
  margin-bottom: var(--spacing-xl);
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.culture-item {
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: 12px;
  text-align: center;
  transition: transform var(--transition-normal);
  
  &:hover {
    transform: translateY(-10px);
  }
}

.culture-item h3 {
  margin-bottom: var(--spacing-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .info-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .culture-grid {
    grid-template-columns: 1fr;
  }
}
</style>