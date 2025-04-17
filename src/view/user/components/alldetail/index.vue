<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>订单挂号</span>
        </div>
      </template>
      <div>
        <div class="el-search">
          <el-form :inline="true">
            <el-form-item label="就诊人">
              <el-select v-model="patientId" placeholder="请选择" @change="getOrderList()">
                <el-option label="请选择全部就诊人" value=""></el-option>
                <el-option v-for="(item, index) in allUser" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select placeholder="请选择" v-model="orderStatus" @change="getOrderList()">
                <el-option label="全部订单" value=""></el-option>
                <el-option v-for="(item, index) in allOrder" :key="index" :label="item.comment" :value="item.status"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="records" style="width: 100%">
          <el-table-column prop="reserveDate" label="就诊时间" />
          <el-table-column prop="hosname" label="医院" />
          <el-table-column prop="depname" label="科室" />
          <el-table-column prop="title" label="医生" />
          <el-table-column prop="amount" label="服务费" />
          <el-table-column prop="patientName" label="就诊人" />
          <el-table-column prop="param.orderStatusString" label="订单状态" />
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" @click="jumpOrder(row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          :background="true" layout="  prev, pager, next, jumper,->,sizes,total" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <template #footer>Footer content</template>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { reqUserOrderInfo, reqAllUser, reqOrderState } from '@/api/api.ts';
import type { UserOrderInfoResponseData, Records, Order, UserArr, AllOrderState } from '@/api/type.ts';
import { useRouter } from 'vue-router';
const $router = useRouter()
let pageSize = ref<number>(10)
let currentPage = ref<number>(1)
let total = ref<number>(10)
let patientId = ref<string>('')
let orderStatus = ref<string>('')
let records = ref<Records>([])
let allUser = ref<UserArr>([])
let allOrder = ref<AllOrderState>([])
const handleSizeChange = () => {
  getOrderList()
}
const handleCurrentChange = () => {
  getOrderList()
}
const getOrderList = async () => {
  let res: UserOrderInfoResponseData = await reqUserOrderInfo(currentPage.value, pageSize.value, patientId.value, orderStatus.value)
  if (res.code == 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
const jumpOrder = (row: Order) => {
  $router.push({ path: '/user/order', query: { orderId: row.id } })
}
const getData = async () => {
  let [res1, res2] = await Promise.all([reqAllUser(), reqOrderState()])
  console.log(res1, res2)
  if (res1.code == 200) {
    allUser.value = res1.data
  }
  if (res2.code == 200) {
    allOrder.value = res2.data
  }
}
onMounted(() => {
  getOrderList()
  getData()
})
</script>
<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>