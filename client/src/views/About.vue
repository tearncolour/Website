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
            <p>无锡灵掌机器人科技有限公司成立于2024年，是一家专注于机器人灵巧手（Dexterous Hand）技术研发和具身智能应用的高新技术企业。我们致力于赋予机器人人类般的灵巧与触觉特性，使机械手在各种复杂任务中表现出极高的精确性与平稳性。</p>
            <p>公司专注于灵巧手空间移动轨迹设计、智能控制系统以及在工业自动化、排爆搜救等特种领域的机器人应用。我们的使命是利用先进的具身智能技术赋能产业升级，为全球客户提供最具竞争力的机器人终端感知与执行方案。</p>
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

    <!-- 联系我们板块 -->
    <section class="contact-info">
      <div class="container">
        <h2 class="text-center section-header">{{ $t('contactPage.title') }}</h2>
        <div class="contact-content">
          <div class="contact-details">
            <h2>{{ $t('contactPage.subtitle') }}</h2>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-text">
                <h3>{{ $t('contactPage.email') }}</h3>
                <p>contact@dextroushands.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-text">
                <h3>{{ $t('contactPage.phone') }}</h3>
                <p>+86-XXX-XXXXXX</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div class="contact-text">
                <h3>{{ $t('contactPage.address') }}</h3>
                <p>{{ $t('contactPage.addressDetail') }}</p>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>{{ $t('contactPage.form.send') }}</h2>
            <t-form @submit.prevent="handleSubmit">
              <t-form-item :label="$t('contactPage.form.name')" required>
                <t-input v-model="formData.name" :placeholder="$t('contactPage.form.namePlaceholder')" />
              </t-form-item>
              <t-form-item :label="$t('contactPage.form.email')" required>
                <t-input v-model="formData.email" type="email" :placeholder="$t('contactPage.form.emailPlaceholder')" />
              </t-form-item>
              <t-form-item :label="$t('contactPage.form.phone')">
                <t-input v-model="formData.phone" type="tel" :placeholder="$t('contactPage.form.phonePlaceholder')" />
              </t-form-item>
              <t-form-item :label="$t('contactPage.form.company')">
                <t-input v-model="formData.company" :placeholder="$t('contactPage.form.companyPlaceholder')" />
              </t-form-item>
              <t-form-item :label="$t('contactPage.form.message')" required>
                <t-textarea v-model="formData.message" rows="5" :placeholder="$t('contactPage.form.messagePlaceholder')" />
              </t-form-item>
              <t-button type="primary" html-type="submit" :loading="isSubmitting" block>
                {{ isSubmitting ? '...' : $t('contactPage.form.submit') }}
              </t-button>
              <div v-if="submitMessage" class="submit-message" :class="submitSuccess ? 'success' : 'error'">
                {{ submitMessage }}
              </div>
            </t-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    submitMessage.value = ''
    
    // 这里应该调用后端API发送表单数据
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitSuccess.value = true
    submitMessage.value = '感谢您的留言，我们会尽快与您联系！'
    
    // 重置表单
    formData.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    }
    
    // 5秒后清除消息
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = '发送失败，请稍后重试'
  } finally {
    isSubmitting.value = false
  }
}
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

/* Contact Styles */
.contact-info {
  padding: var(--spacing-xxl) 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.section-header {
  margin-bottom: var(--spacing-xl);
}

.contact-details h2 {
  margin-bottom: var(--spacing-xl);
}

.contact-item {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  align-items: flex-start;
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-text h3 {
  margin-bottom: var(--spacing-xs);
}

.contact-form h2 {
  margin-bottom: var(--spacing-xl);
}

.submit-message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: 4px;
  text-align: center;
  
  &.success {
    background-color: rgba(0, 200, 83, 0.1);
    color: #00c853;
  }
  
  &.error {
    background-color: rgba(255, 61, 0, 0.1);
    color: #ff3d00;
  }
}

@media (max-width: 768px) {
  .info-content,
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .info-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .culture-grid {
    grid-template-columns: 1fr;
  }
}
</style>