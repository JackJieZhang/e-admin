<template>
  <el-container>
    <el-header class="header">
      <el-space wrap style="float: left">
        <div class="logo"></div>
        <div>
          <header-menu :menus="menus" @get-child-menus="setChildMenus" />
        </div>
      </el-space>
      <div style="padding: 10px; float: right; cursor: pointer">
        <el-dropdown
          :hide-on-click="false"
          trigger="click"
          ref="userOptDropdown"
          @command="userOptCommand"
        >
          <el-avatar />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="toUserInfo">{{
                $t('home.userInfo')
              }}</el-dropdown-item>
              <el-dropdown-item command="toLogout">{{
                $t('home.logout')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="setting_bar">
        <el-button
          style="font-size: 20px"
          link
          :icon="fullscreen ? 'Crop' : 'FullScreen'"
          @click="fullScreenHanlder()"
        ></el-button>
        <el-button
          style="font-size: 20px"
          link
          :icon="isDark ? 'Moon' : 'Sunny'"
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
        <locale-select />
      </div>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        style="border-right: solid 1px var(--el-menu-border-color)"
      >
        <LeftMenu :menus="childMenus" @add-tab="addTab" />
      </el-aside>
      <el-container class="main">
        <el-main style="padding: 0px">
          <open-tabs :tags="tags" />
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
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { sizeStore } from '@/stores'
import { useRouter } from 'vue-router'
import { removeUserToken } from '@/utils/LocalStore'
import LocaleSelect from '@/components/LocaleSelect.vue'
import LeftMenu from '@/components/LeftMenu.vue'

const sizeDropdown = ref()
const size = sizeStore()
const changeSize = function (command: string) {
  size.setSize(command)
  sizeDropdown.value.handleClose()
}

const userOptDropdown = ref()
const userOptCommand = function (command: string) {
  switch (command) {
    case 'toLogout':
      removeUserToken()
      router.push({ path: '/login' })
      break
    case 'toUserInfo':
      router.push({ path: '/user-info' })
      break
  }
  userOptDropdown.value.handleClose()
}

const router = useRouter()
const tags = ref([])

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

const menus = ref([
  {
    name: '测试父级',
    key: 'test_parent',
    path: '',
    icon: 'location',
    child: [{ name: '测试', key: 'test', path: '/table', icon: 'location' }],
  },
  {
    name: '测试父级1',
    key: 'test_parent1',
    path: '',
    icon: 'location',
    child: [
      {
        name: '测试1',
        key: 'test1',
        icon: 'location',
        child: [
          { name: '测试3', key: 'test3', path: '/table', icon: 'location' },
        ],
      },
    ],
  },
])
const childMenus = ref([])
function setChildMenus(chMs: []) {
  childMenus.value = chMs
}

function addTab(ob: any) {
  tags.value.push({
    name: ob.name,
    closable: true,
  })
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

.main {
  max-height: 100vh;
  height: 100vh;
  background-color: var(--el-bg-color-page);
}
.main-content {
  padding: var(--el-main-padding);
}
.setting_bar {
  padding-top: 20px;
  float: right;
}
.setting_bar .el-dropdown {
  margin-left: 12px;
}
</style>
<style lang="scss">
.el-tabs__nav-wrap {
  background-color: var(--el-bg-color);
}
</style>
