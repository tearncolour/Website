import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Custom logo
      'nav-bar-title-before': () => h('img', {
        src: '/LOGO_new.png',
        alt: 'Logo',
        class: 'vp-logo'
      }),
      // Custom footer for all pages
      'layout-bottom': () => h('div', { class: 'footer-copyright' }, [
        '苏ICP备XXXXXXXXX | Copyright © 2025-present 无锡灵掌机器人科技有限公司'
      ])
    })
  }
}
