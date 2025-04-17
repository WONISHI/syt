<template>
    <div class="top">
        <div class="content">
            <!-- 头部 -->
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚易通 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="loginIn()" v-if="!userName">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userName }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="routerPath('/user/realname')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="routerPath('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="routerPath('/user/seeDoc')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="delCook()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import userStore from '@/store/modules/User.ts';
import { getCookie, deleteCookie } from '@/utils/index.ts';
import { ref, onMounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue'
let userstore = userStore()
let $router = useRouter();
let userName = ref<string>('')
const goHome = () => {
    $router.push({ path: '/home' })
}
const loginIn = () => {
    userstore.visiable = true
}
const delCook = () => {
    deleteCookie('name');
    deleteCookie('token');
    userstore.loginOut()
    $router.push({ path: '/home' })
    setTimeout(() => {
        window.location.reload()
    }, 500)
}
const routerPath=(path:string)=>{
    $router.push({path})
}
onMounted(() => {
    userName.value = getCookie('name')
})
</script>
<style lang="scss" scoped>
.top {
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 2000;

    .content {

        width: 1200px;
        height: 70px;
        background: #fff;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            img {
                width: 50px;
            }

            p {
                font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
                margin-left: 10px;
                font-size: 22px;
                color: #4490f1;
                user-select: none;
                letter-spacing: 1px;
            }
        }

        .right {
            display: flex;
            align-items: center;
            width: 190px;
            justify-content: space-between;
            font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            color: #666;
            transition: all .2s ease;

            .login {
                cursor: pointer;
            }
            .el-dropdown{
                cursor: pointer;
            }
        }
    }
}
</style>