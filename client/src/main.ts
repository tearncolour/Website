import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n, { autoDetectLanguage } from './i18n'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './styles/globals.scss'
import App from './App.vue'

const app = createApp(App)

// 使用i18n多语言
app.use(i18n)
autoDetectLanguage()

// 使用Pinia状态管理
const pinia = createPinia()
app.use(pinia)

// 使用路由
app.use(router)

// 使用T-Design组件库
app.use(TDesign)

app.mount('#app')
