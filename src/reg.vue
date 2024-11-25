<template>
    <div style="position: relative; height: 100vh;">
        <div class="box" style="position: absolute;">
            <h3 style="text-align: center;">注册用户</h3>
            <el-form ref="ruleFormRef" style="max-width: 450px;margin-top: 30px;" :model="ruleForm" :rules="rules"
                label-width="100px" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="密 码" prop="password">
                    <el-input v-model="ruleForm.password"  show-password/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

interface RuleForm {
    name: string
    password: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    password: ''
})


const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },

    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const router = useRouter()

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            fetch('http://8.152.220.74:3000/register/user', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: ruleForm.name.trim(),
                    password: ruleForm.password.trim()
                })
            }).then((res) => {
                return res.json()
            }).then((res) => {
                if (res.code == 500) {
                    ElMessage({
                        message: res.msg,
                        type: 'error',
                    })
                }else {
                    ElMessage({
                        message: res.msg,
                        type: 'success',
                    })
                    ruleForm.name = ''
                    ruleForm.password = ''
                    router.push('/login')
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
<style scoped>
.box {
    width: 500px;
    height: 250px;
    border: 1px solid red;
    top: 50%;
    left: 50%;
    margin: -125px -250px;
}
</style>