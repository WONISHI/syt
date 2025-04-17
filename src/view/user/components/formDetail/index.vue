<template>
    <div class="form-detail">
        <div class="form-label-item">
            <span>就诊人信息</span>
            <span></span>
        </div>
        <el-form>
            <el-form-item label="用户姓名">
                <el-input placeholder="请输入" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select placeholder="请选择证件类型" v-model="ruleForm.certificatesType">
                    <el-option v-for="item in certaionArr" :key="item.id" :label="item.name"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input placeholder="请输入证件号码" v-model="ruleForm.certiicatesNo"></el-input>
            </el-form-item>
            <el-form-item label="用户性别">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker v-model="ruleForm.birthdate" type="date" placeholder="请选择出生日期" value-format="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input placeholder="请你输入用户手机号码" v-model="ruleForm.phone"></el-input>
            </el-form-item>
        </el-form>
        <div class="form-label-item">
            <span>建档信息（完善后部分医院首次就诊不排队建档）</span>
            <span></span>
        </div>
        <el-form>
            <el-form-item label="婚姻状态">
                <el-radio-group v-model="ruleForm.isMarry">
                    <el-radio :label="1">已婚</el-radio>
                    <el-radio :label="0">未婚</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自费/医保">
                <el-radio-group v-model="ruleForm.isInsure">
                    <el-radio :label="1">自费</el-radio>
                    <el-radio :label="0">医保</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前住址">
                <el-cascader :props="options" v-model="ruleForm.addressSelected" />
            </el-form-item>
            <el-form-item label="详细住址">
                <el-input placeholder="请你输入用户详细地址" v-model="ruleForm.address"></el-input>
            </el-form-item>
        </el-form>
        <div class="form-label-item">
            <span>联系人信息（选填）</span>
            <span></span>
        </div>
        <el-form>
            <el-form-item label="用户姓名">
                <el-input placeholder="请你输入用户姓名" v-model="ruleForm.contactsName"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select placeholder="请你选择证件的类型" v-model="ruleForm.contactsCertificatesType">
                    <el-option v-for="item in certaionArr" :key="item.id" :label="item.name"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input placeholder="请你输入证件号码" v-model="ruleForm.contactsCertificatesNo"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input placeholder="请你输入用户的手机号码" v-model="ruleForm.contactsPhone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="reset()">重写</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqCertationType, reqCity, reqAddOrUpdateUser } from '@/api/api.ts';
import type { CertationTypeResponseData,CertationArr,AddOrUpdateUser } from '@/api/type.ts';
import {useRoute,useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
let certaionArr = ref<CertationArr>([])
let $route=useRoute()
let $router=useRouter()
const $emit = defineEmits(['update:scene', 'getuserdata'])
let ruleForm = ref<AddOrUpdateUser>({
    name: '456',
    certificatesType: '',
    certiicatesNo: '23018220111011',
    sex: 0,
    birthdate: '',
    phone: '13412345678',
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: '天府',
    contactsName: '456',
    contactsCertificatesType: '',
    contactsCertificatesNo: '23018220111011',
    contactsPhone: '13412345678',
})
const props = defineProps({
    detailRow: {
        type: Object,
        default: {}
    }
})
const reset = () => {
    Object.assign(ruleForm.value,{
        name: '',
        certificatesType: '',
        certiicatesNo: '',
        sex: 0,
        birthdate: '',
        phone: '',
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: '',
        contactsName: '',
        contactsCertificatesType: '',
        contactsCertificatesNo: '',
        contactsPhone: '',
    })
}
const certationType = async () => {
    let res: CertationTypeResponseData = await reqCertationType()
    console.log('证件', res)
    if (res.code == 200) {
        certaionArr.value = res.data
    }
}
const submit = async () => {
    let res = await reqAddOrUpdateUser(ruleForm.value)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: ruleForm.value.id ? '修改成功' : '新增成功'
        })
        if(['add','edit'].includes($route.query.type as string)){
            $router.back()
        }else{
            $emit('update:scene', false)
            $emit('getuserdata')
        }
    } else {
        ElMessage({
            type: 'error',
            message: ruleForm.value.id ? '修改失败' : '新增失败'
        })
    }
}
const options = {
    lazy: true,
    async lazyLoad(node: any, resolve:any) {
        let res: any = await reqCity(node.data.id || '86')
        let showData = res.data.map((item:any) => {
            return {
                label: item.name,
                value: item.value,
                id: item.id,
                leaf: !item.hasChildren
            }
        })
        resolve(showData)
    }
}
onMounted(() => {
    certationType()
    console.log(props)
    
    if(JSON.stringify(props.detailRow)!='{}' ){
        Object.assign(ruleForm.value,props.detailRow.row)
    }else if($route.query.row!='{}'){
        Object.assign(ruleForm.value,JSON.parse($route.query.row as string))
    }
})

</script>
<style lang="scss" scoped>
.form-detail {
    margin: 20px 0px;

    .form-label-item {
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        span:first-child {
            color: #333;
            margin-right: 15px;
        }

        span:last-child {
            height: 1px;
            background: #eee;
            flex: 1;
        }
    }

    .el-form {
        width: 60%;
        margin: 0 auto;
    }
}
</style>