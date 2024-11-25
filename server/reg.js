import express from 'express'
import fs from 'node:fs'
import path from 'path';
const router = express.Router()

router.post('/user', (req, res) => {
    const { name, password } = req.body;
    if (name && name.trim()) {
        if (password && password.trim()) {
            fs.readFile(path.join(process.cwd(), './login.json'), {
                encoding: 'utf-8'
            }, (err, data) => {
                if (data.length == 0) {
                    fs.writeFileSync(path.join(process.cwd(), './login.json'), JSON.stringify([req.body]), {
                        encoding: 'utf-8'
                    })
                    res.json({
                        code: 200,
                        msg: '注册成功'
                    })
                } else {
                    let dataa = JSON.parse(data)
                    let a = true
                    dataa.forEach((item, index) => {
                        if (item.name == name) {
                            res.json({
                                code: 500,
                                msg: '用户名已被注册'
                            })
                            a = false
                        }
                    })
                    if (a) {
                        dataa.push(req.body)
                        fs.writeFileSync(path.join(process.cwd(), './login.json'), JSON.stringify(dataa), {
                            encoding: 'utf-8'
                        })
                        res.json({
                            code: 200,
                            msg: '注册成功'
                        })
                    }

                }
            })
        } else {
            res.json({
                code: 500,
                msg: '请输入正确的密码'
            })
        }
    } else {
        res.json({
            code: 500,
            msg: '请输入正确的用户名'
        })
    }
})

export default router