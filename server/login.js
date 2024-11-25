import { fa } from 'element-plus/es/locales.mjs'
import express from 'express'
import fs from 'node:fs'
import path from 'path'
const router = express.Router()

router.post('/user', (req, res) => {
    const { name, password } = req.body
    if (name && name.trim()) {
        fs.readFile(path.join(process.cwd(), './login.json'), {
            'encoding': 'utf-8'
        }, (err, data) => {
            if (data.length == 0) {
                res.json({
                    code: 500,
                    msg: '请注册该用户'
                })
            } else {
                let dataa = JSON.parse(data)
                let a = false
                dataa.forEach((item, index) => {
                    if (item.name == name) {
                        if (item.password == password) {
                            res.json({
                                code: 200,
                                msg: '登录成功'
                            })
                            a = true
                        }
                    }
                })
                if (!a) {
                    res.json({
                        code: 500,
                        msg: '请输入正确的用户名或密码'
                    })

                }
            }
        })
    }
})

export default router