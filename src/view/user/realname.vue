<template>
    <div class="FCertification-content">
        <el-card class="box-card">
            <template #header>
                <h1>实名认证</h1>
            </template>
            <div class="certification-body">
                <div class="tips">
                    <svg-icon></svg-icon>
                    <span>完成实名认证后才能添加就诊人，正确进行挂号，为了不影响后续步骤，建议提前实名认证</span>
                </div>
                <FCertification v-if="UpdateObj.authStatus==1" :UpdateObj="UpdateObj" @getupdateUser="getupdateUser"></FCertification>
                <updateCertification v-else></updateCertification>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import FCertification from '@/view/user/components/FCertification/index.vue'
import updateCertification from '@/view/user/components/updateCertification/index.vue';
import type {UserInfoResponseData,UserInfo} from '@/api/type.ts';
import {reqUserinfo} from '@/api/api.ts';
import { onMounted,ref } from 'vue';
let UpdateObj=ref<UserInfo>({} as UserInfo)
const getupdateUser=async ()=>{
    let res:UserInfoResponseData=await reqUserinfo()
    if(res.code==200){
        UpdateObj.value=res.data
    }
}
onMounted(()=>{ 
    getupdateUser()
})
</script>
<style lang="scss" scoped>
.FCertification-content {
    :deep(.el-card) {
        .el-card__body {
            padding: 0 20px 20px;
            // height: 300px;

            .tips {
                height: 80px;
                display: flex;
                align-items: center;
            }
            .el-descriptions{
                .el-descriptions__table{
                    tr td:first-child{
                        width: 15%;
                    }
                }
            }
        }
    }
}
</style>