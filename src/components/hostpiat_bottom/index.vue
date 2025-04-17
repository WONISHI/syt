<template>
    <div class="bottom">
        <div class="content">
            <div class="left">
                <p class="no-num">京ICP备13018369号</p>
                <p class="phone">电话挂号010-56253825</p>
            </div>
            <div class="right">
                <ul>
                    <li> 联系我们 </li>
                    <li> 合作伙伴 </li>
                    <li> 用户协议 </li>
                    <li> 隐私协议 </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
</script>
<style lang="scss" scoped>
.bottom {
    width: 100%;
    height: 50px;
    background: #fafafa;
    display: flex;
    justify-content: center;
    position:fixed;
    bottom:0px;
    left:0px;
    z-index: 2000;

    .content {
        font-size: 12px;
        height: 50px;
        line-height: 50px;
        width: 1200px;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;

            .no-num {
                color: #bbb;
            }

            .phone {
                margin-left: 24px;
                font-size: 12px;
                font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            }
        }

        .right ul {
            display: flex;
            width: 341px;
            justify-content: space-between;

            li {
                transition: all .2s ease;
                font-size: 12px;
                font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
                color: #666;
            }
        }
    }
}
</style>