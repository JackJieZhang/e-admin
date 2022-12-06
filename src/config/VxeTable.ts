import { App } from 'vue'
import {
  // 全局对象
  VXETable,
  Icon,
  Column,
  Table,
  Pager,
  Grid,
} from 'vxe-table'

export function useTable(app: App, i18n: any) {
  // 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
  VXETable.setup({
    i18n: (key, args) => i18n.global.t(key, args),
  })
  // 可选组件
  app.use(Icon).use(Column).use(Table).use(Pager).use(Grid)
}
