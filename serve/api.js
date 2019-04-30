const express = require('express')
//  引入数据库连接池，防止数据库超过最大连接数
const query = require('./db')
//  定义路由级中间件
const router = express.Router()
var fs = require('fs')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

function ext (extname) {
  var extName = ''
  switch (extname) {
    case 'image/pjpeg':
      extName = 'jpg'
      break
    case 'image/jpeg':
      extName = 'jpg'
      break
    case 'image/png':
      extName = 'png'
      break
    case 'image/x-png':
      extName = 'png'
      break
  }
  return extName
}
function upload (oldpath, avatorName, edit, res) {
  var newpath = '../src/assets/public/upload/' + avatorName
  fs.readFile(oldpath, function (err, data) {
    if (err) throw err
    fs.writeFile(newpath, data, function (err) {
      if (err) throw err
      if (edit) {
        res.json({
          isok: true,
          url: 'http://localhost:3000/' + avatorName
        })
      }
    })
    fs.unlink(oldpath, function (err) {
      if (err) throw err
    })
  })
}
router.get('/login', async function (req, res) {
  var name = req.query.name
  var pwd = req.query.pwd
  var rows = await query('select * from user where username = "' + name + '" and pwd = "' + pwd + '"')
  if (rows.length) {
    res.json({
      code: 1,
      user: rows[0],
      message: '登录成功！'
    })
  } else {
    res.json({
      code: 0,
      message: '登录失败！'
    })
  }
})
router.get('/getcate', async function (req, res) {
  var rows = await query('select cate_name,GROUP_CONCAT(sub_name) sub_names from category a, sub_category b where a.id = b.cate_id group by b.cate_id ')
  res.json({
    cateList: rows
  })
})
router.get('/getallList', async function (req, res) {
  // eslint-disable-next-line camelcase
  var sub_name = req.query.sub_name
  var defind = await query('select define from sub_category where sub_name = "' + sub_name + '"')
  var methodList = await query('select b.sub_name,a.title,a.title_page,a.content,a.title_page from method a,sub_category b where b.id = a.sub_cate_id and b.sub_name = "' + sub_name + '"')
  var defendList = await query('select b.sub_name,a.title,a.title_page,a.content,a.title_page from defend a,sub_category b where b.id = a.sub_cate_id and b.sub_name = "' + sub_name + '"')
  res.json({
    defind: defind[0].define,
    methodList: methodList,
    defendList: defendList
  })
})
router.post('/upload', multipartMiddleware, async function (req, res) {
  var oldpath = req.files.mypic.path
  var avatorName = Math.random() + '.' + ext(req.files.mypic.type)
  upload(oldpath, avatorName, true, res)
})
router.post('/add_method', multipartMiddleware, async function (req, res) {
  var cate = req.body.cate
  var title = req.body.title
  var content = req.body.content.replace(/"/g, '&quot;')
  var file = req.files.myimg
  var kind = req.body.kind
  if (!kind) {
    res.json({
      code: 0,
      message: '请选择类别！'
    })
  } else if (!cate) {
    res.json({
      code: 0,
      message: '请选择分类！'
    })
  } else if (!file || !title || !content) {
    res.json({
      code: 0,
      message: '请填写完整内容！'
    })
  } else {
    var oldpath = file.path
    var avatorName = Math.random() + '.' + ext(file.type)
    upload(oldpath, avatorName, false, res)
    var rows = await query('select id from sub_category where "' + cate + '" =  sub_name')
    var id = rows[0].id
    if (kind === '急救措施') {
      await query('insert into method(sub_cate_id,title,title_page,content) values("' + id + '","' + title + '","' + avatorName + '","' + content + '")')
    } else {
      await query('insert into defend(sub_cate_id,title,title_page,content) values("' + id + '","' + title + '","' + avatorName + '","' + content + '")')
    }
    res.json({
      code: 1,
      message: '添加成功！'
    })
  }
})
router.get('/get_methods', async function (req, res) {
  var rows = await query('select a.cate_name,b.sub_name,c.title,c.title_page,c.content,c.id from category a,sub_category b,method c where a.id = b.cate_id and b.id = c.sub_cate_id')
  res.json({
    methodList: rows
  })
})
router.get('/get_defends', async function (req, res) {
  var rows = await query('select a.cate_name,b.sub_name,c.title,c.title_page,c.content,c.id from category a,sub_category b,defend c where a.id = b.cate_id and b.id = c.sub_cate_id')
  res.json({
    defendList: rows
  })
})
router.post('/edit_method', multipartMiddleware, async function (req, res) {
  var id = req.body.id
  var title = req.body.title
  let content = req.body.content.replace(/"/g, '&quot;')
  let file = req.files.myimg
  const kind = req.body.kind
  console.log(req.body)
  if (!title || !content) {
    res.json({
      code: 0,
      message: '请填写完整内容！'
    })
  } else {
    var rows = await query('select * from method where id != "' + id + '" and title = "' + title + '"')
    if (rows.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
    } else {
      if (!file) {
        if (kind === '急救措施') {
          await query('update method set title="' + title + '",content="' + content + '" where id ="' + id + '"')
        } else {
          await query('update defend set title="' + title + '",content="' + content + '" where id ="' + id + '"')
        }
      } else {
        var oldpath = file.path
        var avatorName = Math.random() + '.' + ext(file.type)
        upload(oldpath, avatorName, false, res)
        if (kind === '预防措施') {
          await query('update method set title="' + title + '",content="' + content + '",title_page="' + avatorName + '" where id ="' + id + '"')
        } else {
          await query('update defend set title="' + title + '",content="' + content + '",title_page="' + avatorName + '" where id ="' + id + '"')
        }
      }
      res.json({
        code: 1,
        message: '修改成功！'
      })
    }
  }
})
router.post('/add_commet', async function (req, res) {
  var commet = req.body.commet
  var title = req.body.title
  var username = req.body.username
  var rows = await query('select id from sub_category where sub_name = "' + title + '"')
  var rows1 = await query('select id from user where username = "' + username + '"')
  var userId = rows1[0].id
  // eslint-disable-next-line camelcase
  var sub_id = rows[0].id
  // eslint-disable-next-line camelcase
  await query('insert into commet(user_id,sub_cate_id,content) values("' + userId + '","' + sub_id + '","' + commet + '")')
  res.json({
    code: 1,
    message: '评论成功！'
  })
})
router.get('/getCustomList', async function (req, res) {
  var rows = await query('select * from custom')
  res.json({
    customList: rows
  })
})
router.get('/getCustomItem', async function (req, res) {
  var id = req.query.id
  var rows = await query('select title,content,createtime from custom where id = "' + id + '"')
  res.json({
    item: rows
  })
})
router.get('/getNewItem', async function (req, res) {
  var id = req.query.id
  var rows = await query('select title,content,createtime from news where id = "' + id + '"')
  res.json({
    item: rows
  })
})

router.get('/get_news', async function (req, res) {
  var rows = await query('select *  from news')
  res.json({
    newList: rows
  })
})

router.get('/proagate', async function (req, res) {
  var rows = await query('select *  from proagate')
  res.json({
    proagateList: rows
  })
})
router.get('/getPropagate', async function (req, res) {
  var rows = await query('select * from proagate')
  res.json({
    code: '1',
    list: rows
  })
})
router.get('/getPropagateById', async function (req, res) {
  var id = req.query.id
  var rows = await query('select * from proagate where id = "' + id + '" ')
  res.json({
    list: rows
  })
})
module.exports = router
