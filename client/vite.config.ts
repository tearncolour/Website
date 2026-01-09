import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 配置文档服务代理
      '/docs': {
        target: 'http://localhost:5175',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docs/, '')
      }
    }
  }
})
