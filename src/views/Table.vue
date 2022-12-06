<template>
  <el-card class="box-card">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Query</el-button>
      </el-form-item>
    </el-form>
    <vxe-grid v-bind="gridOptions" :size="vxeTableSizeConvert[sizeStore.size]">
      <template #pager>
        <vxe-pager
          :layouts="[
            'Sizes',
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'FullJump',
            'Total',
          ]"
          :current-page="1"
          :page-size="2"
          :total="100"
        >
        </vxe-pager>
      </template>
    </vxe-grid>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { sizeStore as sizeStores } from '@/stores'
import { vxeTableSizeConvert } from '@/config'
import { VxeGridProps } from 'vxe-table'

const value1 = ref('')
const sizeStore = sizeStores()

const gridOptions = ref<VxeGridProps>({
  border: true,
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex', showHeaderOverflow: true },
    { field: 'address', title: 'Address', showOverflow: true },
  ],
  data: [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'test abc',
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou',
    },
    {
      id: 10003,
      name: 'Test3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai',
    },
    {
      id: 10004,
      name: 'Test4',
      role: 'Designer',
      sex: 'Women',
      age: 24,
      address: 'Shanghai',
    },
  ],
})
</script>
