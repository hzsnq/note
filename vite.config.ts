import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('meting-js')
        }
      }
    }),
    AutoImport({
      dts: 'types/auto/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly' // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      dts: 'types/auto/components.d.ts',
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  esbuild: {
    pure: ['console.log', 'debugger']
  },
  // 开发环境服务器配置
  server: {
    // 是否监听所有地址
    host: true,
    // 端口号
    port: 3333,
    // 端口被占用时，是否直接退出
    strictPort: false,
    // 是否自动打开浏览器
    open: true
    // 反向代理
    // proxy: {
    //   '/api/v1': {
    //     target: 'https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212',
    //     // 是否为 WebSocket
    //     ws: false,
    //     // 是否允许跨域
    //     changeOrigin: true
    //   }
    // },
    // // 是否允许跨域
    // cors: true,
    // // 预热常用文件，提高初始页面加载速度
    // warmup: {
    //   clientFiles: ['./src/layouts/**/*.*', './src/pinia/**/*.*', './src/router/**/*.*']
    // }
  },
  build: {
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        /**
         * @name 分块策略
         * @description 1. 注意这些包名必须存在，否则打包会报错
         * @description 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
         */
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          element: ['element-plus', '@element-plus/icons-vue']
        }
      }
    },
    // 是否开启 gzip 压缩大小报告，禁用时能略微提高构建性能
    reportCompressedSize: false,
    // 单个 chunk 文件的大小超过 2048kB 时发出警告
    chunkSizeWarningLimit: 2048,
    // 设置打包文件的输出目录
    outDir: './chrome_desktop/dist'
  }
})
