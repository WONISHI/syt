<template>
    <p>{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息</p>
    <el-empty description="暂无信息" />
</template>
<script lang="ts" setup>
import useDetailStore from '@/store/modules/hospitalDetail'
let hospitalStore = useDetailStore()
</script>
<style lang="scss" scoped>
p{
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}
</style>