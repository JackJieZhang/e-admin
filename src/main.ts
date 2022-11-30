import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import '@/styles/icons/iconfont.css'
import 'element-plus/dist/index.css'

import i18n from './i18n'

createApp(App)
  .use(ElementPlus)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .use(i18n)
  .mount('#app')
