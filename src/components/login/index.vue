<template>
    <div class="login-pop">
        <el-dialog v-model="userstore.visiable" title="用户登录" width="960px" :before-close="handleClose">
            <div class="content">
                <el-row>
                    <el-col :span="12" class="left">
                        <el-form :model="ruleForm" :rules="rule" ref="formSubmit" class="demo-ruleForm" status-icon
                            v-show="!isWXin">
                            <el-form-item prop="phone">
                                <el-input v-model="ruleForm.phone" placeholder="输入手机号码" style="width: 100%"
                                    :prefix-icon="User" />
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input v-model="ruleForm.code" placeholder="输入手机验证码" style="width: 100%"
                                    :disabled="!isPhone" :prefix-icon="Lock" />
                            </el-form-item>
                            <el-form-item class="code-btn">
                                <el-button @click="getCode()" :disabled="!isPhone" v-if="!flag">获取验证码</el-button>
                                <el-button :disabled="true" v-else>获取验证码{{ time }}</el-button>
                            </el-form-item>
                            <el-form-item class="login-btn">
                                <el-button @click="loginForm()"
                                    :disabled="!isPhone && ruleForm.code?.length != 6">用户登录</el-button>
                            </el-form-item>
                            <el-form-item class="weixing-btn">
                                <div class="wx-content" @click="jumpWx()">
                                    <span>微信扫码登录</span>
                                    <svg-icon name="weixing"></svg-icon>
                                </div>
                            </el-form-item>
                        </el-form>
                        <div v-show="isWXin" class="login-weixin">
                            <div id="wxmodel"></div>
                            <div class="phone-login" @click="jumpPhone()">
                                <p>手机短信验证码登录</p>
                                <svg-icon name="phonelogin"></svg-icon>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" class="right">
                        <div>
                            <div class="top">
                                <div class="code-left">
                                    <img src="../../assets/images/code_login_wechat.png">
                                    <svg-icon name="msg"></svg-icon>
                                    <span>微信扫一扫关注</span>
                                    <i>"快速预约挂号"</i>
                                </div>
                                <div class="code-right">
                                    <img src="../../assets/images/code_login_wechat.png">
                                    <svg-icon name="phone"></svg-icon>
                                    <span>扫一扫下载</span>
                                    <i>"预约挂号APP"</i>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>尚医通官方指定平台</span>
                            <span>快速挂号&empty;安全放心</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose()">关闭窗口</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import userStore from '@/store/modules/User.ts';
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { saveCookie } from '@/utils/index.ts';
import type { FormRules } from 'element-plus';
import { reqweiLogin } from '@/api/api.ts';
import type { WXloginResponseData } from '@/api/type.ts';
import { useRoute, useRouter } from 'vue-router';
let isWXin = ref<boolean>(false)
let userstore = userStore();
let flag = ref<boolean>(false);
let time = ref<number>(5);
let formSubmit = ref<any>();
let $route = useRoute();
let $router = useRouter()
let isPhone = computed(() => {
    const res = /^1[3456789]\d{9}$/
    return res.test(ruleForm.phone)
})
// @ts-ignore
const validatorPhone = (rule: any, value: string, callback: any) => {
    const res = /^1[3456789]\d{9}$/
    if (res.test(value)) {
        callback()
    } else {
        callback('请输入正确的手机号格式')
    }
}
//@ts-ignore
const validatorCode = (rule: any, value: string, callback: any) => {
    if (/^\d{6}$/.test(value)) {
        callback()
    } else {
        callback('请输入正确的验证码格式')
    }
}
const rule = reactive<FormRules<RuleForm>>({
    phone: [
        { validator: validatorPhone, trigger: 'change' },
    ],
    code: [
        { validator: validatorCode, trigger: 'change' },
    ]
})

const handleClose = () => {
    userstore.visiable = false
    formSubmit.value.resetFields()
}
const jumpPhone = () => {
    isWXin.value = !isWXin.value
}
const jumpWx = async () => {
    isWXin.value = !isWXin.value
    let redirect_url = encodeURIComponent(window.location.origin + '/wxlogin')
    let result: WXloginResponseData = await reqweiLogin(redirect_url)
    //生成微信二维码登录页面
    if (result.code == 200) {
        console.log(result)
        //@ts-ignore
        new WxLogin({
            self_redirect: true,//true:手机点击确认登录可以在iframe内跳转到redirect_url
            id: "wxmodel",//显示二维码容器设置
            appid: result.data.appid,//应用位置标识appid
            scope: "snsapi_login",//当前微信扫码页面已经授权了
            redirect_uri: result.data.redirectUri,//授权回调域，就是用户授权成功以后，微信服务器
            state: result.data.state,//state就是学校服务器重定向到地址携带用户信息
            style: "black",
            href: ""
        })
    }
}
watch(
    () => flag.value,
    () => {
        if (flag.value) {
            let timer = setInterval(() => {
                time.value--
                if (time.value == 0) {
                    clearInterval(timer)
                    flag.value = !flag.value
                    time.value = 5
                }
            }, 1000)
        }
    }, {
    immediate: true
}
)
interface RuleForm {
    phone: string
    code: string
}
const ruleForm = reactive<RuleForm>({
    phone: '',
    code: '',
})
const getCode = async () => {
    try {
        flag.value = !flag.value
        await userstore.getCode(ruleForm.phone)
        if (!userstore.code) {
            ElMessage({
                type: 'error',
                message: '操作太频繁，请稍后再试'
            })
            time.value = 5
            return
        }
        ruleForm.code = userstore.code
    } catch (err) {
        ElMessage({
            type: 'error',
            message: (err as Error).message
        })
    }
}

const loginForm = async () => {
    await formSubmit.value.validate()
    try {
        let res: any = await userstore.userLogin(ruleForm)
        if (res == 'ok') {
            userstore.visiable = false
            saveCookie('name', userstore.userInfo.name, 2)
            saveCookie('token', userstore.userInfo.token, 2)
            if ($route.query.redirect) {
                $router.push($route.query.redirect as string)
            } else {
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
        }
    } catch (err) {
        ElMessage({
            type: 'error',
            message: (err as Error).message
        })
    }
}

</script>
<style lang="scss" scoped>
.login-pop {
    :deep(.el-overlay-dialog) {
        .el-dialog__header {
            border-bottom: 1px solid #eee;
            margin-right: 0px;
        }

        .content {
            padding: 10px 24px;

            .el-row {
                .left {
                    padding: 16px;
                    border: 1px solid #eee;

                    .el-form {
                        .code-btn {
                            .el-form-item__content {
                                .el-button.is-disabled {
                                    background-color: #f4f4f5;
                                }
                            }
                        }

                        .login-btn {
                            margin: 20px 0px 16px;

                            .el-form-item__content {
                                width: 100%;

                                .el-button {
                                    width: 100%;
                                    background-color: #4490f1;
                                    color: #fff;
                                }
                            }
                        }

                        .weixing-btn {
                            .el-form-item__content {
                                .wx-content {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    width: 100%;

                                    .svg-icon {
                                        width: 30px;
                                        height: 30px;
                                    }

                                    span {
                                        cursor: pointer;
                                    }
                                }
                            }
                        }

                    }

                    .login-weixin {
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .phone-login {
                            color: #999;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            p {
                                margin-bottom: 10px;
                                cursor: pointer;
                            }

                            .svg-icon {
                                width: 30px;
                                height: 30px;
                            }
                        }
                    }
                }

                .right {
                    padding: 0 30px;
                    box-sizing: border-box;

                    .top {
                        display: flex;
                        justify-content: space-between;

                        .code-left,
                        .code-right {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            img {
                                width: 160px;
                                height: 160px;
                            }

                            .svg-icon {
                                margin: 10px 0px;
                                width: 25px;
                                height: 25px;
                            }

                            i {
                                margin: 10px 0px;
                            }
                        }
                    }

                    .bottom {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 40px;

                        span {
                            font-size: 18px;
                            color: #999;
                            font-style: italic;

                            &:not(:last-child) {
                                margin-bottom: 25px;
                            }
                        }
                    }
                }
            }


        }

        .el-dialog__footer {
            border-top: 1px solid #eee;
        }
    }
}
</style>