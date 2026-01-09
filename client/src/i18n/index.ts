import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

const messages = {
  zh,
  en
}

// 获取保存的语言或根据语言偏好/IP自动识别
const getInitialLocale = () => {
  const saved = localStorage.getItem('user-language')
  if (saved) return saved

  // 默认返回中文，稍后在全局设置中通过分析自动切换
  return 'zh'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages,
})

// 自动判断并切换语言的逻辑
export const autoDetectLanguage = async () => {
  if (localStorage.getItem('user-language')) return // 如果用户手动选择过，则不自动切换

  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    // 如果不在中国（CN, HK, TW），则切换到英文
    const isChineseRegion = ['CN', 'HK', 'TW'].includes(data.country_code)
    const targetLocale = isChineseRegion ? 'zh' : 'en'
    
    if (i18n.global.locale.value !== targetLocale) {
      i18n.global.locale.value = targetLocale
    }
  } catch (error) {
    console.error('Language detection failed:', error)
  }
}

export default i18n
