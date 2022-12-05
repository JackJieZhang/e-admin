// index.ts 文件内容

import { createI18n } from 'vue-i18n'

import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { getI18n } from '@/utils/LocalStore'
import { websiteTitle } from '@/config'
import { i18nStore } from '@/stores'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/en'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getI18n() || 'zhCn',
  messages: messages,
})

export default i18n

export const changeTitleLocale = function (title: any) {
  document.title = title
    ? i18n.global.t(title) + ` - ${websiteTitle}`
    : websiteTitle
}
export const changeLocal = function (locale: any, target: any, title: any) {
  const lanStore = i18nStore()
  if (target.value != undefined) {
    lanStore.seti18n(target.value)
    locale.value = target.value
    changeTitleLocale(title)
  }
}

export const allLocal = { zhCN, enUS }
export const initCurrentLocale = function (): any {
  return getCurrentLocale(null)
}

export const getCurrentLocale = function (lan: string | null): any {
  if (lan == null) {
    const initLocal = getI18n() == null ? 'zhCn' : getI18n()
    for (const key in allLocal) {
      let localName = allLocal[key].name as string
      localName = localName.replace('-', '')
      if (localName.toUpperCase() == (initLocal as string).toUpperCase()) {
        return allLocal[key]
      }
    }
  } else {
    for (const key in allLocal) {
      let localName = allLocal[key].name as string
      localName = localName.replace('-', '')
      if (localName.toUpperCase() == lan.toUpperCase()) {
        return allLocal[key]
      }
    }
  }
}
const settingJson = [
  { name: '中文', key: 'zhCn' },
  { name: 'English', key: 'en' },
]
export const allLocalJson = settingJson
