<template class="dark">
  <el-config-provider
    :locale="lanStore.lan === 'en' ? enUS : zhCN"
    :size="sizeStore.size"
  >
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { i18nStore } from '@/stores/i18n'
import { sizeStore as sizeStores } from '@/stores/sizeStore'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/en'
const lanStore = i18nStore()
const sizeStore = sizeStores()
</script>
