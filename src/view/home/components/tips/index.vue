<template>
    <div class="department">
        <div class="tips">
            <p>常见科室</p>
            <i>全部</i>
        </div>
        <div class="content">
            <span v-for="(item, index) in department" :key="index">{{ item }}</span>
        </div>
    </div>
    <div class="announcement" v-for="(item, index) in announcement" :key="index">
        <div class="title-tip">
            <p>{{ item.title }}</p>
            <i>全部</i>
        </div>
        <ul class="announcement-content">
            <li v-for="(data, index) in item.children" :key="index">{{ data }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
let department = ref(['神经内科', '消化内科', '呼吸内科', '内科', '神经外科', '妇科', '产科', '儿科'])
let announcement = reactive([
    {
        title: '平台公告',
        children: [
            '关于延长北京大学国际医院放假的通知',
            '北京中医药大学东方医院部分科室医生门诊医',
            '武警总医院号源暂停更新通知'
        ]
    }, {
        title: '停诊公告',
        children: [
            '中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告',
            '首都医科大学附属北京潞河医院老年医学科门诊停诊公告',
            '中日友好医院中西医结合心内科门诊停诊公告'
        ]
    }
])
</script>
<style lang="scss" scoped>
.department {
    .tips {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        p {
            font-weight: 700;
            color: #333;
            font-size: 16px;
        }

        i {
            font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            color: #999;
            font-size: 14px;
            cursor: pointer;
        }
    }

    .content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        span {
            height: 31px;
            line-height: 31px;
            text-align: center;
            color: #333;
            font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
        }
    }
}

.announcement {
    margin-top: 40px;
    .title-tip {
        display: flex;

        p {
            letter-spacing: 1px;
            font-weight: 700;
            color: #333;
            font-size: 16px;
            margin-right:auto;
            font-family: Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        }
    }
    ul{
        li{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 14px;
        }
    }
}
</style>