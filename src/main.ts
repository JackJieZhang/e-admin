import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import '@/styles/icons/iconfont.css'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import i18n from '@/i18n'
import { hasPermission } from '@/directives/BtnPrm'
import { btnHideFlag } from '@/config'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .use(ElementPlus)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .use(i18n)
  .use(hasPermission, { hide: btnHideFlag })
  .mount('#app')
