import { getSize, setSize } from '@/utils/LocalStore'
import { defineStore } from 'pinia'
let size = getSize()
if (size == null) {
  size = 'large'
}
export const sizeStore = defineStore('sizeStoreKey', {
  state: () => {
    return { size: size }
  },
  actions: {
    setSize(size: string | undefined) {
      if (size != undefined) {
        this.size = size
        setSize(size)
      }
    },
  },
})
