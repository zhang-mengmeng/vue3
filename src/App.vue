<template>
  <div style="padding: 10px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.user" placeholder="请输入用户名称" clearable />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formInline.age" placeholder="请输入年龄" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.sex" placeholder="请选择用户性别" clearable>
          <el-option label="男" value='男' />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜 索</el-button>
      </el-form-item>

    </el-form>
    <div style="margin-bottom: 10px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" plain size="small" @click="handleadd(0)">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="180" />
      <el-table-column prop="name" label="用户名称" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="dt" label="创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="danger" size="small" @click="handleClick(scope.row.id)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click="handleaddd(scope.row.id, 1)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="用户资料" width="500">
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item label="用户名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
        <el-input v-model="form.age" autocomplete="off" placeholder="请输入用户年龄" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择用户性别">
          <el-option label="男" value='男' />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="quxiao(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="queding(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
const formInline = reactive({
  user: '',
  age: '',
  sex: ''
})

const onSubmit = () => {
  fetch('http://localhost:3000/users', {
    method: 'post',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: formInline.user,
      age: formInline.age,
      sex: formInline.sex
    })
  }).then(res => {
    return res.json()
  }).then(data => {
    if (data.code == 200) {
      tableData.splice(0, tableData.length)
      tableData.push(...data.data)
    }
  })
}
let tableData = reactive<any[]>([])
//删除
const handleClick = (row: any) => {
  ElMessageBox.confirm(
    `您确定要删除用户ID为 ${row} 的用户吗?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {

      const xhr = new XMLHttpRequest()
      xhr.open('delete', `http://localhost:3000/user/` + row)
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
          let data = JSON.parse(xhr.responseText)
          ElMessage({
            message: data.msg,
            type: 'success',
          })
          getlist()

        }
      })
      xhr.send(null)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}
const formLabelWidth = '140px'

interface RuleForm {
  name: string
  age: string,
  sex: string,
}

const form = reactive<RuleForm>({
  name: '',
  age: '',
  sex: '',
})
let dialogFormVisible = ref(false)
const handleadd = (data: number) => {
  aa.value.bb = data
  dialogFormVisible.value = true
  form.name = ''
  form.age = ''
  form.sex = ''
}

const quxiao = (formEl: FormInstance | undefined) => {
  dialogFormVisible.value = false
  if (!formEl) return
  formEl.resetFields()
}

// const queding = () =>{
//   // dialogFormVisible.value = false
//   console.log(form.name)
// }

const rules = reactive<FormRules<RuleForm>>({
  age: [
    {
      required: true,
      message: '请输入用户年龄',
      trigger: 'change',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'change',
    },
  ],

  sex: [
    {
      required: true,
      message: '请选择用户性别',
      trigger: 'change',
    },
  ],
})

const ruleFormRef = ref<FormInstance>()
const queding = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (aa.value.bb == 1) {
        fetch('http://localhost:3000/user', {
          method: 'put',
          headers: {
            "content-type": 'application/json'
          },
          body: JSON.stringify({
            id: aa.value.id,
            name: form.name,
            age: form.age,
            sex: form.sex
          })
        }).then(res => {
          return res.json()
        }).then(data => {
          if (data.code == 200) {
            ElMessage({
              message: data.msg,
              type: 'success',
            })
            getlist()
            dialogFormVisible.value = false
          }
        })
      } else {
        fetch('http://localhost:3000/user', {
          method: 'post',
          headers: {
            "content-type": 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            age: form.age,
            sex: form.sex
          })
        }).then(res => {
          return res.json()
        }).then(data => {
          if (data.code == 200) {
            ElMessage({
              message: data.msg,
              type: 'success',
            })
            getlist()
            dialogFormVisible.value = false
          }
        })
      }

    } else {
      console.log('error submit!', fields)
    }
  })
}
const getlist = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:3000/users')
  xhr.addEventListener('load', () => {
    if (xhr.status == 200) {
      let aa = JSON.parse(xhr.response)
      if (aa.code == 200) {
        tableData.splice(0, tableData.length)
        tableData.push(...aa.data)
      }
    }
  })
  xhr.send(null)
}
getlist()
type M = {
  bb: number,
  id: number
}
const aa = ref<M>({ bb: 0, id: 0 })

// 编辑
const handleaddd = (row: any, data: number) => {
  aa.value.bb = data
  aa.value.id = row
  fetch('http://localhost:3000/user/' + row, {
    method: 'get',
  }).then(res => {
    return res.json()
  }).then(data => {
    if (data.code == 200) {
      dialogFormVisible.value = true
      form.age = data.data.age
      form.name = data.data.name
      form.sex = data.data.sex
    }
  })
}
</script>

<style scoped>
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
