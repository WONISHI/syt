<template>
    <div class="form-search">
        <el-autocomplete v-model="hosname" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
            placeholder="请输入医院名称" @select="goDetail" :trigger-on-focus="false" />
        <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { reqHospitalInfo } from '@/api/api.ts';
import type { HospitalInfo } from '@/api/type.ts';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let hosname = ref<string>('');
let $router = useRouter();
const querySearch = async (keyword: string, cb: any) => {
    let res: HospitalInfo = await reqHospitalInfo(keyword)
    if (res.code == 200) {
        let responseData: any = res.data.map((item) => {
            return {
                value: item.hosname,
                hoscode: item.hoscode
            }
        })
        cb(responseData)
    }
}
const goDetail = (item:any) => {
    $router.push({ path: '/detail/register', query:{ hoscode: item.hoscode }})
}
</script>
<style lang="scss" scoped>
.form-search {
    display: flex;
    padding: 30px 60px;
    box-sizing: border-box;
    align-items: center;
    height: 100px;

    ::v-deep(.el-autocomplete) {
        width: 90%;
        height: 100%;

        .el-input {
            height: 100%;
        }
    }

    .el-button {
        height: 40px;
        width: 10%;
    }
}
</style>