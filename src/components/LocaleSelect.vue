<template>
  <el-dropdown
    :hide-on-click="false"
    trigger="click"
    ref="languageDropdown"
    @command="changeLang"
  >
    <span class="el-dropdown-link">
      <el-button link
        ><i class="el-icon-ali-language" style="font-size: 20px"
      /></el-button>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lj in localJson"
          :key="lj.key"
          :command="lj.key"
          >{{ lj.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { allLocalJson, changeLocal } from '@/i18n'
import { i18nStore } from '@/stores'
import { ref, toRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const localJson = ref(allLocalJson)
const { locale } = useI18n()
const lanStore = i18nStore()
const locale1 = toRef(lanStore, 'lan')
const route = useRoute()
watch(locale1, (): void => {
  changeLocal(locale, locale1, route.meta.title)
})
const languageDropdown = ref()
const changeLang = function (command: string) {
  locale1.value = command
  languageDropdown.value.handleClose()
}
</script>
