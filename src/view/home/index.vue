<template>
    <div>
        <Carousel></Carousel>
        <!-- 搜索 -->
        <Search></Search>
        <el-row :gutter="80" v-loading="loading">
            <el-col :span="20">
                <multiple-cells @changeLevel="changeLevel"></multiple-cells>
                <div class="cards-list" v-if="!isEmpty">
                    <el-card shadow="hover" v-for="(item, index) in hasHospitalArr" :key="index" @click="goDetail(item)">
                        <div class="left">
                            <div class="marginTop">
                                <div> {{ item.hosname }}</div>
                            </div>
                            <div class="marginBottom">
                                <div>
                                    <svg-icon name="jibie" width="20" height="20"></svg-icon>
                                    <span>{{ item.param.hostypeString }}</span>
                                </div>
                                <div>
                                   <svg-icon name="time" width="20" height="20"></svg-icon>
                                    <span>每天{{ item.bookingRule?.quitTime }}放号</span>
                                </div>
                            </div>
                        </div>
                        <img :src="`data:image/jpeg;base64,${item.logoData}`">
                    </el-card>
                </div>
                <el-empty description="暂无数据" v-else style="height:600px" />
                <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    :hide-on-single-page="isPage" :disabled="disabled" :background="background"
                    layout="total,->,prev, pager, next,sizes" :total="totalElements" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </el-col>
            <el-col :span="4">
                <Tips></Tips>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import Carousel from '@/view/home/components/carousel/index.vue';
import Search from '@/view/home/components/search/index.vue';
import multipleCells from '@/view/home/components/multipleCells/index.vue';
import Tips from '@/view/home/components/tips/index.vue';
import { reqHospital } from '@/api/api.js'
import type { Content, HospitalResponseData } from '@/api/type.ts'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
const background = ref<boolean>(true)
let hasHospitalArr = ref<Content>([]);
let totalElements = ref<number>(0);
let loading = ref<boolean>(true)
let isPage = ref<boolean>(true);
let isEmpty = ref<boolean>(false);
const disabled = ref<boolean>(false)
let hostype = ref<string>('');
let districtCode = ref<string>('');
let $router=useRouter()
const handleSizeChange = () => {
    isPage.value = true
    loading.value = true
    _getHospitalInfo()
}
const handleCurrentChange = () => {
    isPage.value = true
    loading.value = true
    _getHospitalInfo()
}
const goDetail=(item:any)=>{
    $router.push({path:'/detail/register',query:{hoscode:item.hoscode}})
}
const _getHospitalInfo = async () => {
    let res: HospitalResponseData = await reqHospital(currentPage.value, pageSize.value, hostype.value, districtCode.value)
    console.log(res)
    if (res.code == 200) {
        hasHospitalArr.value = res.data.content
        totalElements.value = res.data.totalElements
        isEmpty.value = res.data.content.length == 0
        isPage.value = res.data.content.length == 0
        loading.value = false
    }
}
const changeLevel = (type: string, value: string) => {
    console.log(type, value)
    if (type == 'level') {
        isPage.value = true
        loading.value = true
        hostype.value = value
        _getHospitalInfo()
    } else {
        isPage.value = true
        loading.value = true
        districtCode.value = value
        _getHospitalInfo()
    }
}
onMounted(() => {
    _getHospitalInfo()
})
</script>
<style lang="scss" scoped>
.cards-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 10px;

    .el-card {
        height: 98px;

        :deep(.el-card__body) {
            display: flex;
            align-items: center;
            padding: 0 10px 0 20px;
            height: 98px;

            .left {
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 100%;
                justify-content: space-around;

                .marginBottom {
                    display: flex;
                    justify-content: space-between;
                    width: 250px;
                }
            }

            img {
                width: 80px;
                height: 80px;
                border-radius: 40px;
                margin-left: 12px;
                transition: all .2s linear;
            }
        }
    }
}

.el-pagination {
    margin: 15px 0px;
}
</style>