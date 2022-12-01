import { defineStore } from 'pinia'
export const headerMenuToLeftMenuStore = defineStore(
  'HeaderMenuToLeftMenuStoreKey',
  {
    state: () => {
      return { secordMenus: [] }
    },
    actions: {
      setSecordMenu(secordMenus: []) {
        this.secordMenus = secordMenus
      },
    },
  }
)
