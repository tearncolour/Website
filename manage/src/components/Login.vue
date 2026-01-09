<template>
  <div class="login-container">
    <t-card class="login-card">
      <div class="header">
        <img src="/logo.png" alt="Logo" class="logo" />
        <h2>后台管理登录</h2>
      </div>
      <t-form ref="form" :data="formData" :rules="rules" @submit="onSubmit" label-width="0">
        <t-form-item name="username">
          <t-input v-model="formData.username" placeholder="请输入用户名" clearable size="large">
            <template #prefix-icon>
              <user-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input v-model="formData.password" type="password" placeholder="请输入密码" clearable size="large">
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit" block :loading="loading" size="large">登录</t-button>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { UserIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const emit = defineEmits(['login-success']);

const loading = ref(false);
const formData = reactive({
  username: '',
  password: '',
});

const rules = {
  username: [{ required: true, message: '请输入用户名', type: 'error' }],
  password: [{ required: true, message: '请输入密码', type: 'error' }],
};

const onSubmit = async ({ validateResult, firstError }: any) => {
  if (validateResult === true) {
    loading.value = true;
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        MessagePlugin.success('登录成功');
        emit('login-success', data.user);
      } else {
        MessagePlugin.error(data.message || '登录失败');
      }
    } catch (error) {
      MessagePlugin.error('网络错误，请稍后重试');
      console.error(error);
    } finally {
      loading.value = false;
    }
  } else {
    MessagePlugin.warning(firstError);
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  background-image: url('https://tdesign.gtimg.com/site/base/login-bg.png');
  background-size: cover;
  background-position: center;
}

.login-card {
  width: 450px;
  padding: 20px 10px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: none;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  height: 64px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
  letter-spacing: 1px;
}

:deep(.t-form__item) {
  margin-bottom: 24px;
}

:deep(.t-input) {
  border-radius: 8px;
  background-color: #f8f9fa;
  border-color: #e9ecef;
}

:deep(.t-input:hover) {
  border-color: var(--td-brand-color);
}

:deep(.t-button) {
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
}
</style>
