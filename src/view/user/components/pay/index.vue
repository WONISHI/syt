<template>
    <div class="wx-pay">
        <el-dialog v-model="visibleShow" title="微信支付" width="30%" :before-close="cancel">
            <div class="wx-pay-body">
                <img :src="payPng">
                <p>请使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">关闭窗口</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script lang="ts" setup>
import { watch, ref, onMounted } from 'vue';
import type { Qrcode, PayResult } from '@/api/type.ts';
import { reqQrcode, reqQueryPayState } from '@/api/api.ts';
import { useRoute } from 'vue-router';
//@ts-ignore
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus';
let $route = useRoute()
const props = defineProps(['dialogVisible']);
let visibleShow = ref<boolean>(false)
let timer=ref<any>()
watch(
    () => props.dialogVisible,
    () => {
        visibleShow.value = props.dialogVisible
    }
)
const emit = defineEmits();
let payPng = ref<string>('')
onMounted(() => {
    getQrcode()
    ask()
})
const getQrcode = async () => {
    try {
        let res: Qrcode = await reqQrcode($route.query.orderId as string)
        if (res.code == 200) {

        } else {
            console.log('// weixin://wxpay/bizpayurl?pr=6rI1fb7zz')
        }
    } catch {
        let pay = 'weixin://wxpay/bizpayurl?pr=6rI1fb7zz'
        let result = await QRCode.toDataURL(pay)
        payPng.value = result
    }
}
const ask = () => {
    timer.value = setTimeout(async () => {
        let res: PayResult = await reqQueryPayState($route.query.orderId as string)
        if (res.code == 200) {
            if (res.data) {
                cancel()
                ElMessage({
                    type: 'success',
                    message: '支付成功'
                })
                clearInterval(timer.value)
            }
        }
    }, 2000)
}
const cancel = () => {
    emit('update:dialogVisible', false);
    clearInterval(timer.value)
};
</script>
<style lang="scss" scoped>
.wx-pay {
    :deep(.el-overlay-dialog) {
        .el-dialog {
            width: 450px;

            .wx-pay-body {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                    background-size: 100%;
                }

                p {
                    line-height: 24px;
                }
            }

            .el-dialog__header {
                border-bottom: 1px solid #e4e7ed;
            }

            .el-dialog__footer {
                border-top: 1px solid #e4e7ed;
            }
        }
    }
}
</style>
  