import express from 'express'
import fs from "node:fs"
import path from 'path'
import dayjs from 'dayjs'
const app = express()
app.use('*',(req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Credentials','true')
    res.setHeader('Access-Control-Allow-Headers','content-type')
    res.setHeader('Access-Control-Allow-Methods','PUT,DELETE')
    next()
})

app.use(express.json())



// app.post('/track',(req,res) => {
//     fs.writeFileSync(path.join(process.cwd(),'./datalist.json'),JSON.stringify(req.body),{
//         encoding:'utf-8',
//         flag:'a'
//     })
// })

// 用户新增接口
app.post('/user',(req,res)=>{
    let randomFiveDigit = Math.floor(10000 + Math.random() * 90000);
    let dataObject = {
        dt:dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        id:randomFiveDigit
    }
    let datad = Object.assign({},dataObject,req.body)
    fs.readFile(path.join(process.cwd(),'./data.json'),{
        encoding:'utf-8'
    },(err,data) =>{
        if(data.length == 0) {
            fs.writeFileSync(path.join(process.cwd(),'./data.json'),JSON.stringify([datad]),{
                encoding:'utf-8'
            })
        }else{
            let dalist = JSON.parse(data)
            dalist.push(datad)
            fs.writeFileSync(path.join(process.cwd(),'./data.json'),JSON.stringify(dalist),{
                encoding:'utf-8'
            })
        }
        console.log('123')
     res.json({
        code:200,
        msg:'新增成功'
     })
    })
    
})

// 获取用户列表接口
app.get('/users',(req,res) =>{
    fs.readFile(path.join(process.cwd(),'./data.json'),{
        encoding:'utf-8'
    },(err,data) =>{
        if(data.length == 0) {
            res.json({
                code:200,
                data:[]
            })
        }else {
            res.json({
                code:200,
                data:JSON.parse(data)
            })
        }
    })
})

// 删除用户
app.delete('/user/:id',(req,res) =>{
    console.log('进入')
    fs.readFile(path.join(process.cwd(),'./data.json'),{
        encoding:'utf-8'
    },(err,data) =>{
        let adata = JSON.parse(data)
        adata.forEach((item,index)=>{
            if(item.id == req.query.id) {
                adata.splice(index,1)
            }
        })
        fs.writeFileSync(path.join(process.cwd(),'./data.json'),JSON.stringify(adata),{
            encoding:'utf-8'
        })
        res.json({
            code:200,
            msg:'删除成功'
        })
    })
})

// 查询用户
app.get('/user/:id',(req,res) =>{
    fs.readFile(path.join(process.cwd(),'./data.json'),{
        encoding:'utf-8'
    },(err,data) =>{
        let dataa = JSON.parse(data)
        dataa.forEach((item,index) =>{
            if(item.id == req.params.id) {
                res.json({
                    code:200,
                    msg:'查询成功',
                    data:item
                })
            }
        })
    })
})

// 修改用户
app.put('/user',(req,res) =>{
    fs.readFile(path.join(process.cwd(),'./data.json'),{
        encoding:'utf-8',
    },(err,data) =>{
        let dataa = JSON.parse(data)
        dataa.forEach((item,index) =>{
            if(item.id == req.body.id) {
                let dte = {
                    dt:item.dt
                }
                let ob = Object.assign({},dte,req.body)
                dataa[index] = ob
                res.json({
                    code:200,
                    msg:'修改成功'
                })
            }
        })
        fs.writeFileSync(path.join(process.cwd(),'./data.json'),JSON.stringify(dataa),{
            encoding:"utf-8"
        })
    })
})

app.post('/users',(req,res) =>{
    const { name, sex, age } = req.body;
    fs.readFile(path.join(process.cwd(),'./data.json'),{
        encoding:'utf-8'
    },(err,data) =>{
        let datad = JSON.parse(data)
        const filteredData = datad.filter(item =>{
            let match = true
            if(name && name.trim() && !item.name.includes(name)) match = false
            if(sex && sex.trim() && !item.sex.includes(sex)) match = false
            if(age && age.trim() && !item.age.includes(age)) match = false
            return match
        })
        res.json({
            code:200,
            msg:'查询成功',
            data:filteredData.length == 0 ? datad : filteredData
        })
    })
})

app.listen(3000,() =>{
    console.log('服务启动成功')
})