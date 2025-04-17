<template>
    <div class="seeDoc">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>就诊人管理</span>
                    <el-button class="button" type="primary" @click="changesScene('add')">
                        <svg-icon name="my"></svg-icon>
                        <span>添加就诊人</span>
                    </el-button>
                </div>
            </template>
            <div class="card-lists" v-if="!scene">
                <el-card v-for="(item, index) in userData" :key="index">
                    <template #header>
                        <div class="card-header">
                            <div class="left">
                                <el-tag>{{ item.isInsure == 1 ? '医保' : '自费' }}</el-tag>
                                <span>{{ item.name }}</span>
                            </div>
                            <div>
                                <el-button class="button" type="primary" @click="changesScene('edit', item)">
                                    <svg-icon name="edit"></svg-icon>
                                </el-button>
                                <el-popconfirm :title="`你确定要删除${item.name}`" width="200" @confirm="remove(item)">
                                    <template #reference>
                                        <el-button class="button del" type="primary">
                                            <svg-icon name="del"></svg-icon>
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </div>
                    </template>
                    <ul>
                        <li>证件类型：{{ item.param.certificatesTypeString }}</li>
                        <li>证件号码：{{ item.contactsCertificatesNo }}</li>
                        <li>用户性别：{{ item.sex == 0 ? '女士' : '男士' }}</li>
                        <li>出生日期：{{ item.birthdate }}</li>
                        <li>手机号码：{{ item.phone }}</li>
                        <li>婚姻状况：{{ item.isMarry == 0 ? '未婚' : '已婚' }}</li>
                        <li>当前住址：{{ item.address }}</li>
                        <li>详细住宅：{{ item.param.fullAddress }}</li>
                        <li class="wate" v-show="selectIndex == index">已选择</li>
                    </ul>
                </el-card>
            </div>
            <template v-else>
                <formDetail :detailRow="detailRow" @getuserdata="getuserdata" v-model:scene="scene"></formDetail>
            </template>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import type { UserResponseData, UserArr } from '@/api/type.ts';
import { getuserdoc, reqRemoveUser } from '@/api/api.ts';
import { onMounted, ref, reactive } from 'vue';
import formDetail from '@/view/user/components/formDetail/index.vue';
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';
let $route = useRoute()
let userData = ref<UserArr>([]);
let selectIndex = ref<number>(-1);
let scene = ref<boolean>(false)
let detailRow: { type?: string, row?: any } = reactive({});
const getuserdata = async () => {
    let res: UserResponseData = await getuserdoc()
    if (res.code == 200) {
        userData.value = res.data
    }
}
const changesScene = (type: string, row?: any) => {
    scene.value = true
    detailRow.type = type
    detailRow.row = row ?? {};
}
const remove=async (item:any)=>{
    let res=await reqRemoveUser(item.id)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getuserdata()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}
onMounted(() => {
    getuserdata()
    if (['add', 'edit'].includes($route.query.type as string)) {
        scene.value = true
    }
})
</script>

<style lang="scss" scoped>
.seeDoc {
    .el-card {
        margin-top: 40px;

        .el-card__header {
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;
                    align-items: center;

                    span {
                        margin-left: 5px;
                    }
                }
            }

        }

        .el-card__body {
            .card-lists {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;

                .el-card {
                    margin: 0px;

                    .card-header {
                        .left {
                            .el-tag {
                                background: #fff;
                                border-color: #7f7f7f;
                                color: #333;
                            }
                        }

                        .el-button {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            border: none;
                        }

                        .del {
                            background-color: #FF4935;
                        }
                    }

                    .el-card__body {
                        ul {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                            padding: 10px 20px;
                            position: relative;
                            cursor: default;

                            li {
                                word-break: break-all;
                                cursor: default;
                            }

                            .wate {
                                position: absolute;
                                width: 200px;
                                height: 200px;
                                border: 1px dotted red;
                                color: red;
                                border-radius: 50%;
                                line-height: 200px;
                                text-align: center;
                                opacity: 0.3;
                                font-size: 24px;
                                transform: rotate(40deg);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>