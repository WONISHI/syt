<template>
    <div class="detail-container">
        <div class="left">
            <div class="nav">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/realname " @click="jumpPage('/user/realname')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="jumpPage('/user/order')">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/seeDoc" @click="jumpPage('/user/seeDoc')">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/account" @click="jumpPage('/user/account')">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/option" @click="jumpPage('/user/option')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>意见反馈</span>
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
let $route=useRoute();
let $router=useRouter();
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