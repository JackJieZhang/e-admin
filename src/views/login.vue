<template>
  <el-radio-group v-model="locale1" size="large">
    <el-radio-button label="en">English</el-radio-button>
    <el-radio-button label="cn">中文</el-radio-button>
  </el-radio-group>
  <el-pagination
    :page-size="100"
    layout="total, prev, pager, next"
    :total="1000"
  />
  <el-button @click="login">{{ $t('home.large') }}</el-button>
</template>
<script lang="ts" setup>
import { i18nStore } from '@/stores'
import { setUserToken } from '@/utils/LocalStore'
import { watch } from 'vue'
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { locale } = useI18n()
const lanStore = i18nStore()
// const locale1 = ref<string>()
const locale1 = toRef(lanStore, 'lan')
watch(locale1, (): void => {
  if (locale1.value != undefined) {
    lanStore.seti18n(locale1.value)
    locale.value = locale1.value
  }
})
const router = useRouter()
const login = (): void => {
  setUserToken('admin')
  router.push({
    path: '/home',
  })
}
</script>
