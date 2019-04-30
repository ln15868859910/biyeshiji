const express = require('express')
//  引入数据库连接池，防止数据库超过最大连接数
const query = require('./db')
//  定义路由级中间件
const router = express.Router()

router.get('/getusers', async function (req, res) {
  var rows = await query('select * from user')
  res.json({
    userList: rows
  })
})
router.post('/del_user', async function (req, res) {
  var name = req.body.name
  await query('delete from user where username = "' + name + '" ')
  res.json({
    code: 1,
    message: '操作成功！'
  })
})
router.post('/del_method', async function (req, res) {
  var category = req.body.sub_category
  var title = req.body.title
  var rows = await query('select b.id from sub_category a , method b where a.id = b.sub_cate_id and a.sub_name = "' + category + '" and b.title="' + title + '"')
  await query('delete from method where id ="' + rows[0].id + '"')
  res.json({
    code: 1,
    message: '操作成功！'
  })
})
router.post('/del_defend', async function (req, res) {
  var category = req.body.sub_category
  var title = req.body.title
  var rows = await query('select b.id from sub_category a , defend b where a.id = b.sub_cate_id and a.sub_name = "' + category + '" and b.title="' + title + '"')
  await query('delete from defend where id ="' + rows[0].id + '"')
  res.json({
    code: 1,
    message: '操作成功！'
  })
})
router.post('/adduser', async function (req, res) {
  var name = req.body.username
  var pwd = req.body.pwd
  console.log(req.body)
  // 检查输入错误
  if (!name) {
    res.json({
      code: 0,
      message: '请输入用户名！'
    })
  } else if (!pwd) {
    res.json({
      code: 0,
      message: '请输入密码！'
    })
  } else {
    var rows = await query("select * from user where username = '" + name + "'")
    if (!rows.length) {
      await query("insert into user(username,pwd,isadmin) values('" + name + "','" + pwd + "',0)")
      res.json({
        code: 1,
        message: '插入成功！'
      })
    } else {
      res.json({
        code: 0,
        message: '该用户名已存在！'
      })
    }
  }
})

router.post('/edituser', async function (req, res) {
  var name = req.body.username
  var oldname = req.body.oldname
  var pwd = req.body.pwd
  console.log(req.body.username)
  if (name === oldname) {
    await query("update user set pwd = '" + pwd + "' where username = '" + name + "'")
    res.json({
      code: 1,
      message: '编辑成功！'
    })
  } else {
    var rows = await query("select * from user where username = '" + name + "' and username != '" + oldname + "'")
    if (rows.length) {
      res.json({
        code: 0,
        message: '该用户名已存在！'
      })
    } else {
      await query("update user set username = '" + name + "',pwd = '" + pwd + "' where username = '" + oldname + "'")
      res.json({
        code: 1,
        message: '编辑成功！'
      })
    }
  }
})
// 添加新闻和急救常识
router.post('/add_news', async function (req, res) {
  var kind = req.body.kind
  var title = req.body.title
  var content = req.body.content.replace(/"/g, '\\"')
  console.log(req.body)
  if (kind === '0') {
    var rows = await query('select * from news where "' + title + '" = title')
    if (rows.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
    } else {
      await query('insert into news(title,content) values ("' + title + '","' + content + '")')
      res.json({
        code: 1,
        message: '添加成功！'
      })
    }
  } else if (kind === '1') {
    var rows1 = await query('select * from custom where "' + title + '" = title')
    if (rows1.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
      return;
    } else {
      await query('insert into custom(title,content) values ("' + title + '","' + content + '")')
      res.json({
        code: 1,
        message: '添加成功！'
      })
    }
  } else {
    var rows2 = await query('select * from proagate where "' + title + '" = title')
    if (rows2.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
      return;
    } else {
      await query('insert into proagate(title,content) values ("' + title + '","' + content + '")')
      res.json({
        code: 1,
        message: '添加成功！'
      })
    }
  }
})
router.get('/getcommet', async function (req, res) {
  var rows = await query('select a.username, b.sub_name,c.content ,c.id from user a,sub_category b,commet c where a.id=c.user_id and b.id=c.sub_cate_id')
  console.log(rows)
  res.json({
    code: 1,
    commetList: rows
  })
})

router.post('/del_commet', async function (req, res) {
  var id = req.body.id
  await query('delete from commet where id = "' + id + '" ')
  res.json({
    code: 1,
    message: '删除成功！'
  })
})

router.post('/editcommet', async function (req, res) {
  var id = req.body.id
  var content = req.body.content
  await query('update commet set content = "' + content + '" where id = "' + id + '"')
  res.json({
    code: 1,
    message: '修改成功！'
  })
})

router.post('/add_commet', async (req, res) => {
  var username = req.body.user
  var cate = req.body.cate
  var content = req.body.content.replace(/"/g, '\\"')
  var rows1 = await query('select id from user where username ="' + username + '"')
  var rows2 = await query('select id from sub_category where sub_name = "' + cate + '"')
  console.log(rows1)
  console.log(rows2)
  await query('insert into commet(user_id,sub_cate_id,content) values("' + rows1[0].id + '","' + rows2[0].id + '","' + content + '")')
  res.json({
    code: 1,
    message: '添加成功！'
  })
})
router.get('/getNewList', async function (req, res) {
  var rows = await query('select id,title from news')
  res.json({
    newList: rows
  })
})
router.post('/del_news', async function (req, res) {
  var id = req.body.id
  await query('delete from news where "' + id + '" = id')
  res.json({
    code: 1,
    message: '删除成功！'
  })
})
router.post('/del_custom', async function (req, res) {
  var id = req.body.id
  await query('delete from custom where "' + id + '" = id')
  res.json({
    code: 1,
    message: '删除成功！'
  })
})
router.post('/del_proagate', async function (req, res) {
  var id = req.body.id
  await query('delete from proagate where "' + id + '" = id')
  res.json({
    code: 1,
    message: '删除成功！'
  })
})
router.post('/edit_news', async function (req, res) {
  var cate = req.body.cate
  var id = req.body.id
  var title = req.body.title
  var content = req.body.content.replace(/"/g, '\\"')
  console.log(content)
  if (cate === 0) {
    var rows = await query('select * from news where id !="' + id + '" and title="' + title + '"')
    if (rows.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
    }
    await query('update news set title = "' + title + '" , content = "' + content + '" where id = "' + id + '"')
    res.json({
      code: '1',
      message: '修改成功！'
    })
  } else if (cate === 1) {
    var rows1 = await query('select * from custom where id !="' + id + '" and title="' + title + '"')
    if (rows1.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
    }
    await query('update custom set title = "' + title + '" , content = "' + content + '" where id = "' + id + '"')
    res.json({
      code: '1',
      message: '修改成功！'
    })
  } else {
    var rows2 = await query('select * from proagate where id !="' + id + '" and title="' + title + '"')
    if (rows2.length) {
      res.json({
        code: 0,
        message: '该标题已存在！'
      })
    }
    await query('update proagate set title = "' + title + '" , content = "' + content + '" where id = "' + id + '"')
    res.json({
      code: '1',
      message: '修改成功！'
    })
  }
})
module.exports = router
