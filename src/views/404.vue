<template>
  <input v-model="message" />
  <Child />
</template>
<script lang="ts" setup>
// import { provide } from 'vue'

const message = 'hello'
// provide('message', '张三啊')
</script>
