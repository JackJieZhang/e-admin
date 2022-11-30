import { getI18n, setI18n } from '@/utils/LocalStore'
import { defineStore } from 'pinia'
let lan = getI18n()
if (lan == null) {
  lan = 'zhCN'
}
export const i18nStore = defineStore('i18nStoreKey', {
  state: () => {
    return { lan: lan }
  },
  actions: {
    seti18n(lan: string | undefined) {
      if (lan != undefined) {
        this.lan = lan
        setI18n(lan)
      }
    },
  },
})
