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
                        <svg-icon name="zunxing" width="20px" height="20px"></svg-icon>
                        <ul>
                            <li class="w-100">
                                <span>具体位置：</span>
                                <i>{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</i>
                            </li>
                            <li class="w-100">
                                <span>规划路线：</span>
                                <i>{{ hospitalStore.hospitalInfo.hospital?.route }}</i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span>医院介绍</span>
            <p>{{ hospitalStore.hospitalInfo.hospital?.intro }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import useDetailStore from '@/store/modules/hospitalDetail'
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
                    display: flex;

                    .svg-icon {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 5px;
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
            }
        }
    }

    .bottom {
        margin-top: 26px;

        span {
            display: inline-block;
            margin-bottom: 16px;
        }

        p {
            color: #999;
            font-size: 14px;
            line-height: 24px;
        }
    }
}</style>