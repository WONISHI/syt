<template>
    <div class="detail-container">
        <div class="left">
            <div class="nav">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/医院信息</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/detail/register" @click="jumpPage('/detail/register')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/detail/item" @click="jumpPage('/detail/item')">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>医院的详情</span>
                </el-menu-item>
                <el-menu-item index="/detail/reserve" @click="jumpPage('/detail/reserve')">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/detail/close" @click="jumpPage('/detail/close')">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/detail/search" @click="jumpPage('/detail/search')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Calendar, Document, Bell, Warning, Search,HomeFilled } from '@element-plus/icons-vue';
import { useRoute,useRouter } from 'vue-router';
import { onMounted } from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail.ts';
let detailStore=useDetailStore();
let $route=useRoute();
let $router=useRouter();
onMounted(()=>{
    detailStore.getHospital($route.query.hoscode);
    detailStore.getDeparment($route.query.hoscode);
})
const jumpPage=(path:string)=>{
    $router.push({path,query:{hoscode:$route.query.hoscode}})
}
</script>
<style lang="scss" scoped>
.detail-container {
    display: flex;
    width: 100%;

    .left {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .nav{
            display: flex;
            margin-bottom:20px;
            span{
                color:#999;
            }
        }
    }

    .right {
        flex: 8;
    }
}
</style>