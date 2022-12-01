<template>
  <div class="login">
    <el-card class="box-card">
      <div class="lange">
        <locale-select />
      </div>
      <div>
        <el-form
          :label-position="labelPosition"
          :model="loginFormData"
          style="max-width: 300px"
        >
          <el-form-item>
            <el-input
              v-model="loginFormData.username"
              :placeholder="$t('login.username')"
              :prefix-icon="'User'"
              clearable
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="loginFormData.password"
              :placeholder="$t('login.password')"
              clearable
              :prefix-icon="'Unlock'"
              size="large"
            />
          </el-form-item>
        </el-form>
      </div>
      <div style="max-width: 300px; height: 40px">
        <el-image style="height: 40px; width: 120px"></el-image>
        <el-input
          type="password"
          style="max-width: 100px; margin-top: -32px; margin-left: 10px"
          size="large"
          :placeholder="$t('login.verificationCode')"
          v-model="loginFormData.verificationCode"
        /><el-button
          style="max-width: 60px; margin-top: -32px; margin-left: 10px"
          size="large"
          @click="login"
          >{{ $t('login.login') }}</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { setUserToken } from '@/utils/LocalStore'
import { reactive, ref } from 'vue'

import { useRouter } from 'vue-router'
import LocaleSelect from '@/components/LocaleSelect.vue'

const labelPosition = ref('right')
const loginFormData = reactive({
  username: '',
  password: '',
  verificationCode: '',
})
const router = useRouter()
const login = (): void => {
  setUserToken('admin')
  router.push({
    path: '/home',
  })
}
</script>
<style lang="less" scoped>
.login {
  -webkit-transform: translate(40%, 120%);
  transform: translate(40%, 120%);
}
.login .el-card {
  max-width: 340px;
}
.lange {
  padding-left: 275px;
}
</style>
