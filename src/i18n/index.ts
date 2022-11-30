// index.ts 文件内容

import { createI18n } from 'vue-i18n'

import ZH from '@/i18n/zh'
import EN from '@/i18n/en'
import { getI18n } from '@/utils/LocalStore'

const message = {
  cn: {
    ...ZH,
  },
  en: {
    ...EN,
  },
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getI18n() || 'cn',
  messages: message,
})

export default i18n
