<template>
    <div class="step-content">
        <div class="nav">
            <span>{{ workData?.baseMap?.hosname }}</span>
            <i>|</i>
            <span>专科</span>
            <i>.</i>
            <span>{{ workData?.baseMap?.depname }}</span>
        </div>
        <div class="registered">
            <div class="top">
                <h1>2{{ workData?.baseMap?.workDateString }}</h1>
                <ul>
                    <li v-for="(item, index) in workData?.bookingScheduleList" :key="index"
                        :class="{ 'active': item.status == -1 || item.availableNumber == -1, 'click-active': index == clickIndex }"
                        @click="changeIndex(index, item)">
                        <span class="times">{{ item.workDate }}{{ item.dayOfWeek }}</span>
                        <span class="status">
                            <i v-if="item.status == -1">停止挂号</i>
                            <i v-else-if="item.status == 0">
                                <em>{{ item.availableNumber == -1 ? '约满了' : `有号(${item.availableNumber})` }}</em>
                            </i>
                            <i v-else-if="item.status == 1">即将放号</i>
                        </span>
                    </li>
                </ul>
                <div class="page-pagination">
                    <el-pagination layout="prev, pager, next" :total="total" v-model:current-page="page"
                        @current-change="gethostWorkdetail" />
                </div>
            </div>
            <div class="bottom">
                <div class="arrange-status" v-show="JSON.stringify(allocateNumbers) == '{}' && workLists.length">
                    <div class="morning" v-if="workLists.filter(item => item.workTime == 0).length">
                        <span>
                            <svg-icon name="morning"></svg-icon>
                            <i>上午号源</i>
                        </span>
                        <div class="doc-info" v-for="(item, index) in workLists.filter(item => item.workTime == 0)"
                            :key="index">
                            <div class="doc-left">
                                <span>{{ item.title }}<i>|</i>{{ item.docname }}</span>
                                <span>{{ item.skill }}</span>
                            </div>
                            <div class="doc-right">
                                <span>¥{{ item.amount }}</span>
                                <el-button type="primary" @click="jumpStep(item)">剩余 {{ item.availableNumber }}</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="afterning" v-if="workLists.filter(item => item.workTime == 1).length">
                        <span>
                            <svg-icon name="afterning"></svg-icon>
                            <i>下午号源</i>
                        </span>
                        <div class="doc-info" v-for="(item, index) in workLists.filter(item => item.workTime == 1)"
                            :key="index">
                            <div class="doc-left">
                                <span>{{ item.title }}<i>|</i>{{ item.docname }}</span>
                                <span>{{ item.skill }}</span>
                            </div>
                            <div class="doc-right">
                                <span>¥{{ item.amount }}</span>
                                <el-button type="primary" @click="jumpStep(item)"> 剩余{{ item.availableNumber }}</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="JSON.stringify(allocateNumbers) != '{}'" class="allocate-tips">{{
                    allocateNumbers.workDate }}<i>放号</i></div>
                <div v-show="!workLists.length" class="agree-tips">约满了</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { HospitalWordData, DoctorResponseData, WorkMap, DocArr ,Doctor} from '@/api/type.ts';
import { getBookingScheduleRule, gethospitaldoctor } from '@/api/api.ts';
import { useRoute, useRouter } from 'vue-router'
let page = ref<number>(1);
let limit = ref<number>(6)
let workData = ref<any>();
let clickIndex = ref<number>(-1);
let workTime = ref<string>('');
let workLists = ref<DocArr>([])
let allocateNumbers = ref({} as WorkMap)
let total=ref<number>(0)
let $route = useRoute();
let $router = useRouter()
const gethostWorkdetail = async () => {
    let res: HospitalWordData = await getBookingScheduleRule(page.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (res.code == 200) {
        workData.value = res.data
        total.value=res.data.total
        clickIndex.value = 0
        if (workData.value.bookingScheduleList.length) {
            workTime.value = workData.value.bookingScheduleList[0].workDate
            getdoclist()
        }
    }
}
const getdoclist = async () => {
    let res: DoctorResponseData = await gethospitaldoctor($route.query.hoscode as string, $route.query.depcode as string, workTime.value)
    if (res.code == 200) {
        workLists.value = res.data
    }
}
const changeIndex = (index: number, item: WorkMap) => {
    console.log(item,item)
    clickIndex.value = index
    workTime.value = item.workDate
    if (item.status == 1) {
        allocateNumbers.value = item
    } else {
        allocateNumbers.value = {} as WorkMap
    }
    getdoclist()
}
const jumpStep = (obj: Doctor) => {
    console.log(obj)
    $router.push({ path: '/detail/peopleStep',query:{docId:obj.id} })
}
onMounted(() => {
    gethostWorkdetail()
})
</script>
<style lang="scss" scoped>
.step-content {
    .nav {
        color: #999;
        margin-bottom: 30px;

        i {
            display: inline-flex;
            margin: 0 8px;
        }
    }

    .registered {
        .top {
            h1 {
                width: 100%;
                margin: 30px 0 20px;
                text-align: center;
                display: inline-block;
            }

            ul {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                column-gap: 15px;

                li {
                    height: 80px;
                    border: 1px solid skyblue;
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;

                    .times {
                        height: 44%;
                        border-bottom: 1px solid skyblue;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: skyblue;
                    }

                    .status {
                        height: 55%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    &.active {
                        border-color: #ccc;

                        .times {
                            background-color: #ccc;
                            border-color: #ccc;
                        }

                        .status {
                            color: #7f7f7f;
                        }
                    }

                    &.click-active {
                        transform: scale(1.1);
                    }
                }
            }

            .page-pagination {
                display: flex;
                justify-content: center;
                margin: 20px 0px;
            }
        }

        .bottom {
            .arrange-status {

                .afterning,
                .morning {
                    span {
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;

                        .svg-icon {
                            width: 20px;
                            height: 20px;
                            margin-right: 10px;
                        }
                    }

                    .doc-info {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #000;

                        &:not(:last-child) {
                            margin-bottom: 10px;
                        }

                        .doc-left {
                            display: flex;
                            flex-direction: column;

                            span {
                                i {
                                    margin-left: 10px;
                                }

                                &:first-child {
                                    color: skyblue
                                }
                            }
                        }

                        .doc-right {
                            width: 130px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            span {
                                margin-bottom: 0px;
                            }

                            .el-button {
                                width: 80px;
                                height: 35px;
                            }
                        }
                    }
                }

                .afterning {
                    margin-top: 30px;
                }
            }

            .allocate-tips {
                display: flex;
                font-size: 28px;
                justify-content: center;
                font-weight: 600;
                margin-top: 60px;

                i {
                    color: red;
                    display: flex;
                    margin-left: 15px;
                }
            }

            .agree-tips {
                font-size: 28px;
                margin-top: 60px;
                color: #7f7f7f;
                display: flex;
                justify-content: center;
            }
        }
    }

}
</style>