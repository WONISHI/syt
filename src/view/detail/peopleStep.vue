<template>
    <div class="people-step">
        <h1>确认挂号信息</h1>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请点击选择就诊人</span>
                    <el-button class="button" type="primary" @click="add()">
                        <svg-icon name="my"></svg-icon>
                        <span>添加就诊人</span>
                    </el-button>
                </div>
            </template>
            <div class="card-lists">
                <el-card v-for="(item, index) in userData" :key="index">
                    <template #header>
                        <div class="card-header">
                            <div class="left">
                                <el-tag>{{ item.isInsure == 1 ? '医保' : '自费' }}</el-tag>
                                <span>{{ item.name }}</span>
                            </div>
                            <el-button class="button" type="primary" @click="edit(item)">
                                <svg-icon name="edit"></svg-icon>
                            </el-button>
                        </div>
                    </template>
                    <ul @click="selectCard(index, item)">
                        <li>证件类型：{{ item.param.certificatesTypeString }}</li>
                        <li>证件号码：{{ item.certificatesNo }}</li>
                        <li>用户性别：{{ item.sex == 0 ? '女士' : '男士' }}</li>
                        <li>出生日期：{{ item.birthdate }}</li>
                        <li>手机号码：{{ item.phone }}</li>
                        <li>婚姻状况：{{ item.isMarry == 0 ? '未婚' : '已婚' }}</li>
                        <li>当前住址：{{ item.param.cityString }}</li>
                        <li>当前住址：{{ item.param.fullAddress }}</li>
                        <li class="wate" v-show="selectIndex == index">已选择</li>
                    </ul>
                </el-card>
            </div>
        </el-card>
        <el-card class="box-card">
            <el-descriptions class="margin-top" title="挂号信息" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期：
                        </div>
                    </template>
                    {{ docData?.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院：
                        </div>
                    </template>
                    {{ docData.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室：
                        </div>
                    </template>
                    {{ docData.param?.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名：
                        </div>
                    </template>
                    {{ docData.param?.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称：
                        </div>
                    </template>
                    {{ docData.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长：
                        </div>
                    </template>
                    {{ docData.skill }}
                </el-descriptions-item>
                <el-descriptions-item class="amount">
                    <template #label>
                        <div class="cell-item">
                            医生服务器：
                        </div>
                    </template>
                    {{ docData.amount }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <div class="registered-footer">
            <el-button type="primary" class="registered" :disabled="JSON.stringify(selectObj) == '{}'"
                @click="confirmReg()">确认挂号</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UserResponseData, UserArr, DoctorInfoData, User, submitOrder } from '@/api/type.ts';
import { getuserdoc, reqDdoctorInfo, reqSubmitOrder } from '@/api/api.ts';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
let userData = ref<UserArr>([]);
let docData = ref<any>({});
let selectIndex = ref<number>(-1);
let selectObj = ref<User>({} as User);

let $route = useRoute()
let $router = useRouter()
const getuserdata = async () => {
    let res: UserResponseData = await getuserdoc()
    if (res.code == 200) {
        userData.value = res.data
    }
}
const getDocData = async () => {
    let res: DoctorInfoData = await reqDdoctorInfo($route.query.docId as string)
    console.log(res)
    if (res.code == 200) {
        docData.value = res.data
    }
}
const selectCard = (index: number, item: User) => {
    selectIndex.value = index
    selectObj.value = item
}
const add=()=>{
    $router.push({path:'/user/seeDoc',query:{type:'add'}})
}
const edit=(row?:any)=>{
    $router.push({path:'/user/seeDoc',query:{type:'edit',row:JSON.stringify(row)}})
}
const confirmReg = async () => {
    let hoscode = docData.value.hoscode
    let scheduleId = docData.value.id
    let patientId = selectObj.value.id
    let res: submitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
    if (res.code == 200) {
        $router.push({path:'/user/order',query:{orderId:res.data}})
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}
onMounted(() => {
    getuserdata()
    getDocData()
})
</script>
<style lang="scss" scoped>
.people-step {
    .el-card {
        margin-top: 40px;

        .el-card__header {
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;
                    align-items: center;

                    span {
                        margin-left: 5px;
                    }
                }
            }

        }

        .el-card__body {
            .card-lists {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;

                .el-card {
                    margin: 0px;

                    .card-header {
                        .left {
                            .el-tag {
                                background: #fff;
                                border-color: #7f7f7f;
                                color: #333;
                            }
                        }

                        .el-button {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                    }

                    .el-card__body {
                        ul {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                            padding: 10px 20px;
                            position: relative;
                            cursor: default;

                            li {
                                word-break: break-all;
                                cursor: default;
                            }

                            .wate {
                                position: absolute;
                                width: 200px;
                                height: 200px;
                                border: 1px dotted red;
                                color: red;
                                border-radius: 50%;
                                line-height: 200px;
                                text-align: center;
                                opacity: 0.3;
                                font-size: 24px;
                                transform: rotate(40deg);
                            }
                        }
                    }
                }
            }
        }
    }

    .registered-footer {
        display: flex;
        justify-content: center;

        .registered {
            margin: 20px 0;
        }
    }
}
</style>