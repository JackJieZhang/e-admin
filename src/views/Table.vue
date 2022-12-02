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
    <div v-click-outside="endEdit">
      <el-table
        stripe
        :data="tableData"
        style="width: 100%"
        @row-click="editRow"
        border
        ><el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="Date" width="180">
          <template #default="scope">
            <div v-if="!scope.row.editFlag">{{ scope.row.date }}</div>
            <el-date-picker
              style="max-width: 160px"
              v-else
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              v-model="scope.row.date"
              placeholder="Pick a day"
              type="date"
              data-for="table"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
          <template #default="scope">
            <div v-if="!scope.row.editFlag">{{ scope.row.name }}</div>
            <el-input
              v-else
              v-model="scope.row.name"
              placeholder="Please input"
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Address">
          <template #default="scope">
            <div v-if="!scope.row.editFlag">{{ scope.row.address }}</div>
            <el-select v-else v-model="scope.row.address" placeholder="Select">
              <el-option
                data-for="table"
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" column-key="opt">
          <el-button v-has="btns['edit']" @click="testClick()">编辑</el-button>
          <!-- <el-button ref="testBtn" disabled>编辑</el-button> -->
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-top: 20px"
      :page-sizes="[100, 200, 300, 400]"
      background="background"
      :small="sizeSt.size === 'small'"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </el-card>
</template>
<script lang="ts" setup>
import { sizeStore } from '@/stores'
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { useRoute } from 'vue-router'
function testClick() {
  console.log(12312)
}
const sizeSt = sizeStore()
const value1 = ref('')
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    editFlag: false,
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    editFlag: false,
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    editFlag: false,
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    editFlag: false,
  },
])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
function editRow(row: any, column: any) {
  if (column.columnKey === 'opt') {
    endEdit(null)
    return
  }
  tableData.value.forEach((itm) => {
    itm.editFlag = false
  })
  row.editFlag = true
}
function endEdit(e: any | null) {
  if (e === null) {
    tableData.value.forEach((itm) => {
      itm.editFlag = false
    })
  } else if (e.target.dataset['for'] === undefined) {
    tableData.value.forEach((itm) => {
      itm.editFlag = false
    })
  }
}
const route = useRoute()
const btns = route.meta.btns as object
// const testBtn = ref()
// testBtn.value.disabled = false
</script>
