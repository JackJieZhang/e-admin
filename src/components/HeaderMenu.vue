<template>
  <el-menu
    class="top-menu"
    mode="horizontal"
    :default-active="active"
    :ellipsis="false"
  >
    <el-menu-item
      v-for="it in menus"
      :index="it.key"
      :key="it.key"
      @click="showChild(it.child)"
      >{{ it.name }}</el-menu-item
    >
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const prop = defineProps(['menus'])
const emit = defineEmits(['get-child-menus'])
const active = ref(prop.menus[0].key)
showChild(prop.menus[0].child)
function showChild(childs: []) {
  emit('get-child-menus', childs)
}
</script>
