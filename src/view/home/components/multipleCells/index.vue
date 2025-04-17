<template>
    <h1 class="tips-title">医院</h1>
    <div class="multiple">
        <label>等级:</label>
        <ul>
            <li :class="{ active: activeFlag == '' }" @click="changeLeave('')">全部</li>
            <li :class="{ active: activeFlag == item.value }" v-for="item in levelArr" :key="item.value"
                @click="changeLeave(item.value)">{{ item.name }}</li>
        </ul>
    </div>
    <div class="multiple">
        <label>地区:</label>
        <ul>
            <li :class="{ active: activeFag == '' }" @click="changeRegion('')">全部</li>
            <li :class="{ active: activeFag == item.value }" v-for="item in regionArr" :key="item.value"
                @click="changeRegion(item.value)">{{ item.name }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { reqHospitalLevalAndRegion } from '@/api/api.ts';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/type.ts'
let levelArr = ref<HospitalLevelAndRegionArr>([])
let regionArr = ref<HospitalLevelAndRegionArr>([])
let activeFlag = ref<string>('')
let activeFag = ref<string>('')
const _HospitalLevalAndRegion = async (item: string) => {
    let res: HospitalLevelAndRegionResponseData = await reqHospitalLevalAndRegion(item)
    if (res.code == 200) {
        if (item == 'HosType') levelArr.value = res.data
        if (item == 'Beijin') regionArr.value = res.data
    }
}
let $emit = defineEmits(['changeLevel'])
const changeLeave = (value: string) => {
    activeFlag.value = value
    $emit('changeLevel', 'level', value)
}
const changeRegion = (value: string) => {
    activeFag.value = value
    $emit('changeLevel', 'region', value)
}
onMounted(() => {
    ['HosType', 'Beijin'].forEach((item) => {
        _HospitalLevalAndRegion(item)
    })
})
</script>
<script lang="ts">
export default {
    name: 'Level'
}
</script>
<style lang="scss" scoped>
.tips-title {
    font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-weight: 700;
    color: #333;
    font-size: 16px;
    margin-bottom: 30px;
}

.multiple {
    display: flex;
    font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    color: #999;
    margin-bottom: 10px;

    label {
        white-space: nowrap;
    }

    ul {
        display: flex;
        flex-wrap: wrap;

        li {
            margin-left: 26px;
            margin-bottom: 10px;
            cursor: pointer;
        }

        li.active {
            color: #4490f1;
            font-size: 14px;
            font-weight: 700;
        }

        li:hover {
            color: #4490f1;
        }
    }
}
</style>