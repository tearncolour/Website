<template>
  <div class="contact">
    <section class="contact-hero">
      <div class="container">
        <h1>联系我们</h1>
        <p>如有任何疑问或需求，欢迎与我们联系</p>
      </div>
    </section>
    
    <section class="contact-info">
      <div class="container">
        <div class="contact-content">
          <div class="contact-details">
            <h2>联系方式</h2>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-text">
                <h3>邮箱</h3>
                <p>contact@lingzhang.ai</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-text">
                <h3>电话</h3>
                <p>+86 400-888-8888</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div class="contact-text">
                <h3>地址</h3>
                <p>中国·深圳</p>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>发送消息</h2>
            <t-form @submit.prevent="handleSubmit">
              <t-form-item label="姓名" required>
                <t-input v-model="formData.name" placeholder="请输入您的姓名" />
              </t-form-item>
              <t-form-item label="邮箱" required>
                <t-input v-model="formData.email" type="email" placeholder="请输入您的邮箱" />
              </t-form-item>
              <t-form-item label="电话（可选）">
                <t-input v-model="formData.phone" type="tel" placeholder="请输入您的电话" />
              </t-form-item>
              <t-form-item label="公司（可选）">
                <t-input v-model="formData.company" placeholder="请输入您的公司名称" />
              </t-form-item>
              <t-form-item label="消息" required>
                <t-textarea v-model="formData.message" rows="5" placeholder="请输入您的消息" />
              </t-form-item>
              <t-button type="primary" html-type="submit" :loading="isSubmitting" block>
                {{ isSubmitting ? '发送中...' : '发送消息' }}
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
.contact-hero {
  padding: var(--spacing-xxl) 0;
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.contact-hero h1 {
  margin-bottom: var(--spacing-sm);
}

.contact-hero p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.contact-info {
  padding: var(--spacing-xxl) 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
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

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color var(--transition-fast);
  font-family: var(--font-primary);
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-message {
  margin-top: var(--spacing-md);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.submit-message.success {
  background-color: rgba(52, 199, 89, 0.1);
  color: #30d158;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.submit-message.error {
  background-color: rgba(255, 59, 48, 0.1);
  color: #ff453a;
  border: 1px solid rgba(255, 59, 48, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>