<template>
  <div class="services">
    <section class="services-hero">
      <div class="container">
        <h1>我们的服务</h1>
        <p>为企业提供全方位的灵巧手自动化解决方案</p>
      </div>
    </section>
    
    <section class="services-detail">
      <div class="container">
        <div class="services-list">
          <div class="service-item" v-for="service in services" :key="service.id">
            <div class="service-info">
              <h2>{{ service.name }}</h2>
              <p>{{ service.description }}</p>
              <div class="service-features">
                <div class="feature-item" v-for="(feature, index) in service.features" :key="index">
                  <span class="feature-check">✓</span>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 服务数据（从API获取，这里先使用模拟数据）
const services = [
  { id: 'dexterous-hand',
      name: '灵巧手产品',
      icon: '🤖',
      description: '高精度、高灵活性的灵巧手产品，适用于多种工业自动化场景',
      features: ['多自由度', '力觉反馈', '高精度控制', '模块化设计'],
    },
  {
    id: 'data-analytics',
    name: '数据分析',
    icon: '📊',
    description: '智能数据分析平台，洞察业务价值',
    features: ['实时数据处理', '可视化报表', '预测分析', '异常检测'],
  },
  {
    id: 'automation',
    name: '流程自动化',
    icon: '⚙️',
    description: '灵巧手驱动的智能自动化方案',
    features: ['流程挖掘', '智能编排', '无代码配置', '监控告警'],
  },
  {
    id: 'computer-vision',
    name: '视觉识别',
    icon: '👁️',
    description: '领先的计算机视觉技术，赋能各行业应用',
    features: ['图像识别', '目标检测', '人脸识别', '质检分析'],
  },
]
</script>

<style scoped lang="scss">
.services-hero {
  padding: var(--spacing-xxl) 0;
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.services-hero h1 {
  margin-bottom: var(--spacing-sm);
}

.services-hero p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.services-detail {
  padding: var(--spacing-xxl) 0;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.service-item {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  padding: var(--spacing-lg);
  background-color: var(--color-background);
  border-radius: 12px;
}

.service-info h2 {
  margin-bottom: var(--spacing-sm);
}

.service-features {
  margin-top: var(--spacing-md);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background-color: var(--color-white);
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.feature-check {
  color: var(--color-accent);
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .service-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .service-features {
    justify-content: center;
  }
}
</style>