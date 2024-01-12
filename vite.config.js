import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/assets/style/mixin.scss";'
      }
    }
  },
  server: {
    proxy: {
      // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
      '/api': {
        // 目标地址 --> 服务器地址
        // target: loadEnv("",process.cwd().VITE_API_URL), // import.meta.env.VITE_API_URL,
        target: 'http://192.168.118.129:5000',
        // 允许跨域
        changeOrigin: true,
        // 允许websocket代理
        ws: true,
        // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
})
