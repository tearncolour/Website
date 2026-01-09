import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'
import ja from './locales/ja'
import de from './locales/de'
import ko from './locales/ko'
import fr from './locales/fr'
import es from './locales/es'
import ar from './locales/ar'
import th from './locales/th'
import vi from './locales/vi'

const messages = {
  zh,
  en,
  ja,
  de,
  ko,
  fr,
  es,
  ar,
  th,
  vi
}

// 获取保存的语言或根据语言偏好/IP自动识别
const getInitialLocale = () => {
  const saved = localStorage.getItem('user-language')
  if (saved) return saved

  // 检查浏览器语言
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) return 'zh'
  if (browserLang.startsWith('ja')) return 'ja'
  if (browserLang.startsWith('ko')) return 'ko'
  if (browserLang.startsWith('fr')) return 'fr'
  if (browserLang.startsWith('es')) return 'es'
  if (browserLang.startsWith('ar')) return 'ar'
  if (browserLang.startsWith('th')) return 'th'
  if (browserLang.startsWith('vi')) return 'vi'
  if (browserLang.startsWith('de')) return 'de'
  if (browserLang.startsWith('en')) return 'en'

  // 默认返回中文
  return 'zh'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages,
})

// 监听语言变化，处理 RTL (阿拉伯语)
import { watch } from 'vue'
if (typeof window !== 'undefined') {
  watch(() => i18n.global.locale.value, (newLocale) => {
    const isRTL = newLocale === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
  }, { immediate: true })
}

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
