// const fs = require('fs');
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const userApi = require('./api')
const adminApi = require('./admin')
app.use(express.static('../src/assets/public/upload'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
// 开启服务后访问指定编译好的dist文件夹下的数据
app.use(express.static(path.resolve(__dirname, '../dist')))

app.use('/api', userApi)
app.use('/admin', adminApi)
// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
