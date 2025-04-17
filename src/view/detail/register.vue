<template>
    <div class="register">
        <div class="top">
            <div class="title">
                <p>{{ hospitalStore.hospitalInfo.hospital?.hosname }}</p>
                <svg-icon name="jibie"></svg-icon>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
            <div class="center">
                <img :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
                    v-if="hospitalStore.hospitalInfo.hospital?.logoData">
                <div class="right">
                    <div class="hospital-rule">
                        <p>排号规则</p>
                        <ul>
                            <li class="w-33">
                                <span>预约周期：</span>
                                <i>{{ hospitalStore.hospitalInfo.bookingRule?.cycle }}天</i>
                            </li>
                            <li class="w-33">
                                <span>放号时间：</span>
                                <i>{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}</i>
                            </li>
                            <li class="w-33">
                                <span>停挂时间：</span>
                                <i>{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}</i>
                            </li>
                            <li class="w-100">
                                <span>具体位置：</span>
                                <i>{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</i>
                            </li>
                            <li class="w-100">
                                <span>规划路线：</span>
                                <i>{{ hospitalStore.hospitalInfo.hospital?.route }}</i>
                            </li>
                            <li>
                                <span>退号时间</span>
                                <i>就诊前一工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消</i>
                            </li>

                        </ul>
                    </div>
                    <div class="register-rule">
                        <p>医院预约规则</p>
                        <ul>
                            <ol v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">{{
                                index + 1 + '.' + item }}</ol>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <bar></bar>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import useDetailStore from '@/store/modules/hospitalDetail';
import bar from '@/view/detail/component/bar/index.vue'
let hospitalStore = useDetailStore()
</script>
<style lang="scss" scoped>
.w-100 {
    width: 100%;
}

.w-33 {
    width: 33%;
    display: inline-block;
}

.register {
    .top {
        .title {
            display: flex;
            align-items: flex-end;

            p {
                color: #333;
                font-size: 20px;
                font-weight: 700;
                margin-right: 15px;
            }

            span {
                display: flex;
                align-items: center;
                color: #999;
                font-size: 14px;
                margin-left: 4px;
            }
        }

        .center {
            margin-top: 30px;
            display: flex;
            align-items: center;

            img {
                height: 80px;
                width: 80px;
                border-radius: 40px;
            }

            .right {
                margin-left: 30px;
                flex: 1;

                .hospital-rule {
                    p {
                        color: #333;
                        font-size: 18px;
                        margin-bottom: 16px;
                        font-weight: 600;
                    }

                    ul {

                        li {
                            &:not(:last-child) {
                                margin-bottom: 8px;
                            }

                            span {
                                color: #999;
                                font-size: 14px;
                            }

                            i {
                                color: #333;
                                font-size: 14px;
                            }
                        }
                    }
                }

                .register-rule {
                    margin-top: 16px;

                    p {
                        color: #333;
                        font-size: 18px;
                        margin-bottom: 16px;
                        font-weight: 600;
                    }

                    ul {
                        ol {
                            color: #999;
                            line-height: 24px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style> 