<template>
    <div class="box-card">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h1>挂号详情</h1>
                </div>
            </template>
            <div class="card-detail-body">
                <div class="center">
                    <el-tag>
                        <svg-icon name="check"></svg-icon>
                        <span>{{ orderInfo.param?.orderStatusString }}</span>
                    </el-tag>
                    <div class="focus-info">
                        <img src="../../../../assets/images/code_app.png">
                        <p>
                            <span>微信<svg-icon name="wxlg"></svg-icon>关注“北京114预约挂号”</span>
                            <span>“快速预约挂号”</span>
                        </p>
                    </div>
                </div>
                <div class="bottom">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-descriptions :column="1" border>
                                <el-descriptions-item label="就诊人信息">{{ orderInfo.patientName }}</el-descriptions-item>
                                <el-descriptions-item label="就诊人日期">{{ orderInfo.reserveDate }}</el-descriptions-item>
                                <el-descriptions-item label="就诊人医院">{{ orderInfo.hosname }}</el-descriptions-item>
                                <el-descriptions-item label="就诊科室">{{ orderInfo.depname }}</el-descriptions-item>
                                <el-descriptions-item label="医生职称">{{ orderInfo.title }}</el-descriptions-item>
                                <el-descriptions-item label="医事服务费" class="notice">{{ orderInfo.amount
                                }}</el-descriptions-item>
                                <el-descriptions-item label="挂号单号">{{ orderInfo.outTradeNo }}</el-descriptions-item>
                                <el-descriptions-item label="挂号时间">{{ orderInfo.createTime }}</el-descriptions-item>
                            </el-descriptions>
                        </el-col>
                        <el-col :span="12">
                            <div class="precautions">
                                <p class="precautions-title">注意事项</p>
                                <p class="precautions-body">
                                    <span>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</span>
                                    <span class="notice">2.【取号】就诊当天需在{{ orderInfo.fetchTime }}前 在医院取号，未取号视为爽约，该号不退不换；</span>
                                    <span>3.【退号】在{{ orderInfo.quitTime }}前可在线退号，逾期将不可办理退号退费；</span>
                                    <span>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号;</span>
                                    <span>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。支付</span>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="card-detail-footer" v-if="[0, 1].includes(orderInfo.orderStatus)">
                <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
                    <template #reference>
                        <el-button>取消预约</el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" v-if="orderInfo.orderStatus === 0" @click="confirmplay()">支付</el-button>
            </div>
        </el-card>
        <pay v-model:dialogVisible="dialogVisible"></pay>
    </div>
</template>
<script lang="ts" setup>
import type { OrderInfo, OrderResponseData } from '@/api/type.ts';
import { reqOrderInfo, reqCancelOrder } from '@/api/api.ts';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import pay from '@/view/user/components/pay/index.vue'
let $route = useRoute();
let orderInfo = ref<OrderInfo>({} as OrderInfo)
let dialogVisible = ref<boolean>(false)
const getreqOrderInfo = async () => {
    let res: OrderResponseData = await reqOrderInfo($route.query.orderId as string)
    if (res.code == 200) {
        orderInfo.value = res.data
    }
}
const cancel = async () => {
    let res: any = await reqCancelOrder($route.query.orderId as string)

    console.log(res,)
    if (res.code == 200) {
        getreqOrderInfo()
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
const confirmplay = () => {
    console.log(5555)
    dialogVisible.value = true
}
onMounted(() => {
    getreqOrderInfo()
})
</script>
<stylee lang="scss" scoped>
.el-card {
    .el-card__body {
        .card-detail-body {
            .center {
                display: flex;
                justify-content: space-between;
                height: 80px;
                border-bottom: 1px solid #e4e7ed;
                align-items: center;
                margin-bottom: 20px;

                .el-tag {
                    background-color: #00BD29;
                    color: #fff;
                    display: flex;
                    align-items: center;

                    .svg-icon {
                        margin-right: 3px;
                    }
                }

                .focus-info {
                    display: flex;
                    align-items: center;

                    img {
                        width: 50px;
                        height: 50px;
                        background-size: 100%;
                    }

                    p {
                        display: flex;
                        flex-direction: column;

                        span {
                            margin-left: 5px;

                            &:first-child {
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
            }

            .bottom {
                .el-descriptions {
                    .el-descriptions__table {}
                }

                .precautions {
                    border: 1px solid #e4e7ed;

                    .precautions-title {
                        height: 50px;
                        padding: 0px 15px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #e4e7ed;
                    }

                    .precautions-body {
                        display: flex;
                        flex-direction: column;
                        row-gap: 10px;
                        padding: 15px;

                        span {
                            line-height: 20px;
                        }

                        .notice {
                            color: red;
                        }
                    }
                }
            }
        }
    }

}
</stylee>