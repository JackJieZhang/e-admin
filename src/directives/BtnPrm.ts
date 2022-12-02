import { App } from 'vue'

function checkBtnPer(key: string) {
  const pers = ['add', 'del', 'edit']
  // const pers = ['add', 'del']
  return pers.indexOf(key) != -1
}
export const hasPermission = {
  install(app: App, option?: any) {
    //自定义指令v-has：
    app.directive('has', {
      updated(el, binding) {
        if (!checkBtnPer(binding.value)) {
          if (!option || option.hide) {
            el.remove()
          } else {
            el.disabled = true
            el.classList.add('is-disabled')
          }
        }
      },
    })
  },
}
