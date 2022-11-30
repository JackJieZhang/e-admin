<template>
  <el-container>
    <el-header class="header">
      <el-space wrap style="float: left">
        <div class="logo"></div>
        <div>
          <el-menu class="top-menu" mode="horizontal" :ellipsis="false">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-space>
      <div style="padding: 10px; float: right">
        <el-avatar />
      </div>
      <div style="padding-top: 20px; float: right">
        <el-button
          style="font-size: 20px"
          link
          :icon="FullScreen"
          @click="fullScreenHanlder()"
        ></el-button>
        <el-button
          style="font-size: 20px"
          link
          :icon="isDark ? Sunny : Moon"
          @click="toggleDark()"
        ></el-button>
        <el-dropdown
          :hide-on-click="false"
          trigger="click"
          ref="sizeDropdown"
          @command="changeSize"
        >
          <span class="el-dropdown-link">
            <el-button link
              ><i
                class="el-icon-ali-diaozhengdaxiaoresize5"
                style="font-size: 20px"
            /></el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="large">{{
                $t('home.large')
              }}</el-dropdown-item>
              <el-dropdown-item command="default">{{
                $t('home.default')
              }}</el-dropdown-item>
              <el-dropdown-item command="small">{{
                $t('home.small')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
              <el-dropdown-item command="cn">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        style="border-right: solid 1px var(--el-menu-border-color)"
      >
        <el-menu class="left-meun">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="main">
        <el-main style="padding: 0px">
          <div class="tabs">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              class="mx-1"
              :closable="tag.closable"
              :type="tag.type"
              @click="onChangeTag(tag.name)"
              @close="onCloseTag(tag.name)"
            >
              {{ tag.name }}
            </el-tag>
            <div style="float: right; padding: 5px">
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>关闭其他</el-dropdown-item>
                    <el-dropdown-item>关闭全部</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="main-content" style="padding: var(--el-main-padding)">
            <router-view />
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { ref, watch, toRef } from 'vue'
import { i18nStore, sizeStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Sunny, Moon, FullScreen } from '@element-plus/icons-vue'

const { locale } = useI18n()
const lanStore = i18nStore()
const locale1 = toRef(lanStore, 'lan')
watch(locale1, (): void => {
  if (locale1.value != undefined) {
    lanStore.seti18n(locale1.value)
    locale.value = locale1.value
  }
})
const languageDropdown = ref()
const changeLang = function (command: string) {
  locale1.value = command
  languageDropdown.value.handleClose()
}

const sizeDropdown = ref()
const size = sizeStore()
const changeSize = function (command: string) {
  size.setSize(command)
  sizeDropdown.value.handleClose()
}

const router = useRouter()
const tags = ref([
  { name: 'Tag 1', type: '', closable: false },
  { name: 'Tag 2', type: '', closable: true },
  { name: 'Tag 3', type: '', closable: true },
  { name: 'Tag 4', type: '', closable: true },
  { name: 'Tag 5', type: '', closable: true },
])
const selectTag = ref('Tag 1')
function selectTagFnc() {
  tags.value.forEach(function (item) {
    item.type = ''
    if (item.name === selectTag.value) {
      item.type = 'success'
    }
  })
}
selectTagFnc()
const onChangeTag = function (name: string) {
  selectTag.value = name
}
const onCloseTag = function (name: string) {
  let removeIdex: number[] = []
  let isSelect = false
  tags.value.forEach(function (item, idex) {
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
    selectTag.value = tags.value[tags.value.length - 1].name
  }
}

watch(selectTag, selectTagFnc)
tags.value.push({ name: 'Tag 6', type: '', closable: true })
router.push({
  path: '/table',
})
const isDark = useDark()
const toggleDark = useToggle(isDark)

const fullscreen = ref(false)

const fullScreenHanlder = function () {
  {
    if (fullscreen.value) {
      if (document.exitFullscreen()) {
        document.exitFullscreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen
      } else if (document.msExitFullScreen) {
        document.msExitFullScreen
      }
    } else {
      let element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullScreen) {
        element.msRequestFullScreen()
      }
    }
    fullscreen.value = !fullscreen.value
  }
}
</script>
<style lang="less" scoped>
.header {
  padding: 0;
  border-bottom: solid 1px var(--el-menu-border-color);
}
.logo {
  min-width: 200px;
  float: left;
  height: var(--el-menu-item-height);
  background-color: rgba(17, 0, 255, 0.555);
}
.top-menu {
  border-bottom: none;
}
.left-meun {
  border-right: none;
}
.main {
  max-height: 100vh;
  height: 100vh;
  background-color: var(--el-bg-color-page);
}
.main-content {
  padding: var(--el-main-padding);
}
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
<style lang="scss">
.el-tabs__nav-wrap {
  background-color: var(--el-bg-color);
}
</style>
