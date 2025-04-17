<template>
    <div class="bar">
        <div class="title">选择科室</div>
        <div class="bar-content">
            <div class="bar-left">
                <span v-for="(item, index) in hospitalStore.deparmentArr" :key="index" @click="jumpCell(index)"
                    :class="{ 'active': activeIndex == index }">{{
                        item.depname }}</span>
            </div>
            <div class="bar-right">
                <div class="content" :leave="index" v-for="(item, index) in hospitalStore.deparmentArr" :key="index">
                    <div class="tips">{{ item.depname }}</div>
                    <ul>
                        <li v-for="(data, clindex) in item.children" @click="showLogin(data)" :key="clindex">{{ data.depname }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import useDetailStore from '@/store/modules/hospitalDetail';
import userStore from '@/store/modules/User.ts';
import {useRouter,useRoute} from 'vue-router'
import { ref } from 'vue';
import {getCookie} from '@/utils/index.ts'
let hospitalStore = useDetailStore();
let userstore=userStore()
let $router=useRouter()
let $route=useRoute()
let activeIndex = ref<number>(0)
const jumpCell = (index: number) => {
    const element:any = document.querySelector(`.content[leave="${index}"]`)
    element.scrollIntoView({ behavior: 'smooth' })
    activeIndex.value = index
}
const showLogin=(data:any)=>{
    if(!getCookie('token')){
        userstore.visiable=true
    }else{
        $router.push({path:'/detail/step',query:{hoscode:$route.query.hoscode,depcode:data.depcode}})
    } 
}
</script>
<style lang="scss" scoped>
.bar {
    margin-top: 50px;

    .title {
        margin-bottom: 20px;
        font-weight: 700;
        color: #333;
        font-size: 16px;
    }

    .bar-content {
        display: flex;
        height: 500px;
        overflow-y: hidden;

        .bar-left {
            width: 170px;
            background: #f4f9ff;
            height: 100%;
            color: #333;
            display: flex;
            flex-direction: column;
            padding: 10px 0;

            span {
                font-size: 16px;
                font-weight: 700;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 10px;
                cursor: pointer;
                transition: all .2s ease;
                min-height: 40px;

                &.active {
                    background: #fff
                }
            }
        }

        .bar-right {
            overflow-y: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .content {
                background: #fafafa;
                padding: 16px;
                margin-left: 30px;

                &:not(:last-child) {
                    margin-bottom: 20px;
                }

                .tips {
                    padding-left: 6px;
                    position: relative;
                    margin-bottom: 16px;

                    &::before {
                        content: '';
                        position: absolute;
                        left: 0px;
                        width: 4px;
                        height: 100%;
                        background: #4990f1;
                    }
                }

                ul {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 14px;
                    li{
                        cursor: pointer;
                        &:hover{
                            color: #4490f1;
                        }
                    }
                }
            }
        }
    }
}</style>