<template>
    <div class="update-certification">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
            <el-form-item label="用户姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select v-model="ruleForm.certificatesType" placeholder="请选择">
                    <el-option :label="item.name" :value="item.value" v-for="(item, index) in CertationArr" :key="index" />
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input v-model="ruleForm.certificatesNo" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="上传图片" prop="certificatesUrl" class="png-upload">
                <!-- <input v-module="ruleForm.certificatesUrl" v-show="false" class="validator" /> -->
                <el-upload v-model:file-list="fileList" ref="upload" list-type="picture-card" :limit="1"
                    :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handlePictureCardPreview"
                    :on-success="hangelesave" action="/api/oss/file/fileUpload?fileHost=userAuah">
                    <img src="../../../../assets/images/auth_example.png">
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="ruleForm.certificatesUrl" alt="Preview Image" v-if="ruleForm.certificatesUrl"
                        style="width:100%;height:100%" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm()">
                    提交
                </el-button>
                <el-button @click="reset()">重写</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, PropType, onMounted } from 'vue';
import type {  FormRules } from 'element-plus';
import type { UserInfo, CertationTypeResponseData, CertationArr, UserParams } from '@/api/type.ts';
import { reqCertationType, reqUserCertation } from '@/api/api.ts';
import { ElMessage } from 'element-plus';
defineProps({
    UpdateObj: {
        type: Object as PropType<UserInfo>,
        default: {}
    },
});
const ruleFormRef = ref()
const upload = ref()
let fileList = ref([])
let dialogVisible = ref<boolean>(false)
let CertationArr = ref<CertationArr>([])
let $emit = defineEmits(['getupdateUser'])
let ruleForm = ref<UserParams>({
    name: '',
    certificatesType: '',
    certificatesNo: '',
    certificatesUrl: ''
})
const handlePreview = () => {
    dialogVisible.value = true
}
const handleRemove = () => {
    ruleForm.value.certificatesUrl = ''
}
const reset = () => {
    Object.assign(ruleForm.value, {
        name: '',
        certificatesType: '',
        certificatesNo: '',
        certificatesUrl: ''
    })
    upload.value.clearFiles()
}
const confirm = async () => {
    await ruleFormRef.value.validate()
    let res: any = await reqUserCertation(ruleForm.value)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '认证成功'
        })
        $emit('getupdateUser')
    } else {
        ElMessage({
            type: 'error',
            message: '认证失败'
        })
    }
}
const handlePictureCardPreview = () => {
    ElMessage({
        type: 'error',
        message: '图片只能上传一张图片'
    })
}
//@ts-ignore
const hangelesave = (response: any, uploadFile: any, uploadFiles: any) => {
    
    ruleFormRef.value.clearValidate('certificatesUrl')
    ruleForm.value.certificatesUrl = response.data
}

//@ts-ignore
const validatorType = (rule:any,value:any,callBack:any) => {
    var reg=/^(^[1-9]\d{5}[1-9]\d{3}(((0[2])([0|1|2][0-8])|(([0-1][1|4|6|9])([0|1|2][0-9]|[3][0]))|(((0[1|3|5|7|8])|(1[0|2]))(([0|1|2]\d)|3[0-1]))))((\d{4})|\d{3}[Xx])$)$/;
    if(reg.test(value)){
        callBack()
    }else{
        callBack(new Error('请输入正确的中国人的名字'))
    }
}
//@ts-ignore
const validatorNo=(rule:any,value:any,callBack:any)=>{
    let sfz=/^[1-9]\d{5}(19|20|21)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let hkb=/^\d{9}$/;
    if(sfz.test(value) || hkb.test(value)){
        callBack()
    }else{
        callBack(new Error('请输入正确的身份证或者户口本号码'))
    }
}
const rules = reactive<FormRules<UserParams>>({
    name: [
        { required: true, validator: validatorType },
    ],
    certificatesType: [
        { required: true, message: '请选择证件类型', trigger: 'change' },
    ],
    certificatesNo: [
        { required: true, validator: validatorNo },
    ],
    certificatesUrl: [
        {
            required: true, message: '请选择上传图片', trigger: 'change'
        }
    ]
})
const getCertification = async () => {
    let res: CertationTypeResponseData = await reqCertationType()
    console.log('res', res)
    if (res.code == 200) {
        CertationArr.value = res.data
    }
}
onMounted(() => {
    getCertification()
})
</script>
<style lang="scss" scoped>
.update-certification {
    .el-form {
        .el-form-item {
            .el-form-item__content {
                .el-upload-list .el-upload {
                    img {
                        width: 100%;
                        height: 100%;
                        background-size: 100%;
                    }
                }

            }
        }
        .png-upload{
            .el-form-item__content{
                position: relative;
                .validator{
                    height: 100%;
                    top: 0;
                    position: absolute;
                }
            }
        }
    }
}
</style>