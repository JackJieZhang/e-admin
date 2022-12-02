<template>
  <div class="tabs">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      class="mx-1"
      :closable="tag.closable"
      :type="tag.type"
      @click="onChangeTag(tag)"
      @close="onCloseTag(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <div style="float: right; padding: 5px; cursor: pointer">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{ $t('home.closeOthers') }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('home.closeAll') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { ref, toRef } from 'vue'

const props = defineProps(['tags'])
const selectTag = ref<string>('')
const tags = toRef(props, 'tags')
// eslint-disable-next-line no-undef
function selectTagFnc(value: string) {
  tags.value.forEach(function (item: any) {
    item.type = ''
    if (item.name === value) {
      selectTag.value = value
      item.type = 'success'
    }
  })
}

const onChangeTag = function (ob: any) {
  selectTagFnc(ob.name)
  router.push({ path: ob.path })
}
const onCloseTag = function (ob: any) {
  const name = ob.name
  let removeIdex: number[] = []
  let isSelect = false
  tags.value.forEach(function (item: any, idex: number) {
    if (item.name === name) {
      if (item.name === selectTag.value) {
        isSelect = true
      }
      removeIdex.push(idex)
    }
  })
  removeIdex.reverse()
  removeIdex.forEach(function (itm) {
    tags.value.splice(itm, 1)
  })
  if (isSelect) {
    selectTag.value = tags.value[tags.value.length - 1].type
    tags.value[tags.value.length - 1].type = 'success'
    router.push({ path: tags.value[tags.value.length - 1].path })
  }
}
</script>
<style lang="less" scoped>
.tabs {
  padding: 5px;
  border-bottom: solid 1px var(--el-menu-border-color);
  background-color: var(--el-bg-color);
  display: block;
}
.tabs .el-tag {
  cursor: pointer;
}
.tabs .el-tag:not(:first-child) {
  margin-left: 10px;
}
</style>
