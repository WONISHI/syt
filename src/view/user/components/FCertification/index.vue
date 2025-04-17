<template>
    <div class="FCertification-con">
        <el-descriptions :column="1" border>
            <el-descriptions-item label="用户姓名">{{ UpdateObj.name }}</el-descriptions-item>
            <el-descriptions-item label="证件类型">{{ UpdateObj.certificatesType == '10' ? '身份证' : '户口本' }}</el-descriptions-item>
            <el-descriptions-item label="证件号码">{{  UpdateObj.certificatesNo}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import type { UserInfo } from '@/api/type.ts';
defineProps({
    UpdateObj: {
        type: Object as PropType<UserInfo>,
        default: {}
    },
});

</script>
<style lang="scss" scoped>
.FCertification-con {
    .el-descriptions {
        .el-descriptions__table {
            tr td:first-child {
                width: 15%;
            }
        }
    }
}
</style>