<template>
  <el-menu class="left-meun" :default-active="active">
    <div v-for="it in menus" :key="it.key">
      <el-menu-item v-if="!it.child" :index="it.key" @click="goTo(it)">
        <el-icon><component :is="it.icon" /></el-icon>
        {{ it.name }}</el-menu-item
      >
      <el-sub-menu :index="it.key" v-else>
        <template #title>
          <el-icon><component :is="it.icon" /></el-icon>
          <span>{{ it.name }}</span>
        </template>
        <el-menu-item
          v-for="iit in it.child"
          :key="iit.key"
          :index="iit.key"
          @click="goTo(iit)"
        >
          <el-icon><component :is="iit.icon" /></el-icon>
          {{ iit.name }}</el-menu-item
        >
      </el-sub-menu>
    </div>
  </el-menu>
</template>
<script lang="ts" setup>
import router from '@/router'

defineProps(['menus', 'active'])

const emits = defineEmits(['add-tab'])

function goTo(ob: any) {
  router.push({ path: ob.path })
  emits('add-tab', ob)
}
</script>
<style lang="less" scoped>
.left-meun {
  border-right: none;
}
</style>
