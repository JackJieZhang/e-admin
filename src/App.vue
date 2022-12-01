<template class="dark">
  <el-config-provider :locale="currentLocal" :size="sizeStore.size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { ref, watch } from 'vue'
import { i18nStore, sizeStore as sizeStores } from '@/stores'
import { getCurrentLocale, initCurrentLocale } from '@/i18n/index'
const lanStore = i18nStore()
const currentLocal = ref(initCurrentLocale())
watch(lanStore, () => {
  currentLocal.value = getCurrentLocale(lanStore.lan)
})
const sizeStore = sizeStores()
</script>
