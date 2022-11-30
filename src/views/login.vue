<template>
  <el-radio-group v-model="locale1" size="large">
    <el-radio-button label="en">English</el-radio-button>
    <el-radio-button label="cn">中文</el-radio-button>
  </el-radio-group>
  <el-card class="box-card" style="max-width: 340px">
    <div>
      <el-form
        :label-position="labelPosition"
        :model="formLabelAlign"
        style="max-width: 300px"
      >
        <el-form-item>
          <el-input v-model="formLabelAlign.username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="formLabelAlign.password"
            :prefix-icon="Unlock"
          />
        </el-form-item>
      </el-form>
    </div>
    <div style="max-width: 300px; height: 30px">
      <el-image style="height: 30px; width: 100px"></el-image>
      <el-input
        type="password"
        style="max-width: 80px; margin-top: -20px; margin-left: 10px"
        v-model="formLabelAlign.password"
      /><el-button
        style="max-width: 60px; margin-top: -20px; margin-left: 10px"
        @click="login"
        >{{ $t('home.login') }}</el-button
      >
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { i18nStore } from '@/stores'
import { setUserToken } from '@/utils/LocalStore'
import { reactive, ref, watch } from 'vue'
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { User, Unlock } from '@element-plus/icons-vue'
const labelPosition = ref('right')
const formLabelAlign = reactive({
  username: '',
  password: '',
})
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
