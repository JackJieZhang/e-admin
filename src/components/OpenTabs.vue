<template>
  <div class="tabs">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      class="mx-1"
      :closable="tag.closable"
      :type="tag.type"
      @click="onChangeTag(tag)"
      @close="onCloseTag(tag.name)"
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
import { ref, watch } from 'vue'

const props = defineProps(['tags'])
const selectTag = ref('Tag 1')
const tags = props.tags
// eslint-disable-next-line no-undef
function selectTagFnc() {
  tags.forEach(function (item: string) {
    item.type = ''
    if (item.name === selectTag.value) {
      item.type = 'success'
    }
  })
}
selectTagFnc()
watch(selectTag, selectTagFnc)
const onChangeTag = function (name: string) {
  selectTag.value = name
}
const onCloseTag = function (name: string) {
  let removeIdex: number[] = []
  let isSelect = false
  tags.forEach(function (item: any, idex: number) {
    if (item.name === name) {
      if (item.name === selectTag.value) {
        isSelect = true
      }
      removeIdex.push(idex)
    }
  })
  removeIdex.reverse()
  removeIdex.forEach(function (itm) {
    tags.splice(itm, 1)
  })
  if (isSelect) {
    selectTag.value = tags[tags.length - 1].name
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
