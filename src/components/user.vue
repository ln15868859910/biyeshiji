<template>
  <div class="user">
    <div class="add" @click="addUser"><strong class="add_icon">+</strong>新增用户</div>
    <div class="user_content">
      <Table border :columns="titleList" :data="showList"></Table>
      <div class="page">
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changePage" show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="ishow"
      title="新增用户"
      @on-ok="ok"
      @on-cancel="cancel"
      :closable=false
      class-name="vertical-center-modal">
      <Row>
        <Col span="12" class="fisrt_column"> 用户名：</Col>
        <Col span="12">
          <input type="text" placeholder="请输入用户名..." class="username" v-model="name">
        </Col>
      </Row>
      <Row>
        <Col span="12" class="fisrt_column"> 密码：</Col>
        <Col span="12">
          <input type="text" placeholder="请输入密码..." class="pwd" v-model="pwd">
        </Col>
      </Row>
    </Modal>
    <Modal
      v-model="edit_ishow"
      title="编辑用户"
      @on-ok="edit_ok"
      @on-cancel="cancel"
      :closable=false
      class-name="vertical-center-modal">
      <Row>
        <Col span="12" class="fisrt_column"> 用户名：</Col>
        <Col span="12">
          <input type="text" placeholder="请输入用户名..." class="username" v-model="name">
        </Col>
      </Row>
      <Row>
        <Col span="12" class="fisrt_column"> 密码：</Col>
        <Col span="12">
          <input type="text" placeholder="请输入密码..." class="pwd" v-model="pwd">
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      userList: [],
      titleList: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '密码',
          key: 'pwd'
        },
        {
          title: '是否管理员',
          key: 'isadmin'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      showList: [],
      dataCount: 0,
      pageSize: 3,
      pageIndex: 1,
      ishow: false,
      name: '',
      pwd: '',
      edit_ishow: false,
      oldname: '',
      oldpwd: ''
    }
  },
  created () {
    this.$http.get('/admin/getusers').then(data => {
      var userlist = data.data.userList
      userlist.forEach((item, index) => {
        this.userList.push(({
          username: item.username,
          pwd: item.pwd,
          isadmin: item.isadmin
        }))
      })
      this.init()
    })
  },
  methods: {
    init () {
      this.dataCount = this.userList.length
      if (this.dataCount < this.pageSize) {
        this.showList = this.userList
      } else {
        this.showList = this.userList.slice(0, this.pageSize)
      }
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.showList = this.userList.slice(_start, _end)
      this.pageIndex = index
    },
    remove (index) {
      this.$http.post('/admin/del_user', {
        name: this.showList[index].username
      }).then(data => {
        console.log(data.data.message)
        this.$Message.info(data.data.message)
      })
      var num = (this.pageIndex - 1) * this.pageSize + index
      this.userList.splice(num, 1)
      this.init()
    },
    edit (index) {
      this.edit_ishow = true
      this.oldname = this.showList[index].username
      this.name = this.oldname
      this.oldpwd = this.showList[index].pwd
      this.pwd = this.oldpwd
    },
    addUser () {
      this.ishow = true
    },
    ok () {
      this.$http.post('/admin/adduser', {
        username: this.name,
        pwd: this.pwd,
        repwd: this.repwd
      }).then(data => {
        if (data.data.code) {
          this.$Message.info(data.data.message)
        } else {
          this.$Message.error(data.data.message)
        }
      })
    },
    cancel () {
      this.$Message.info('已取消！')
    },
    edit_ok () {
      if (this.oldname === this.name && this.oldpwd === this.pwd) {
        this.$Message.error('操作失败！')
        return
      }
      this.$http.post('/admin/edituser', {
        username: this.name,
        oldname: this.oldname,
        pwd: this.pwd,
        repwd: this.repwd
      }).then(data => {
        if (data.data.code) {
          this.$Message.info(data.data.message)
        } else {
          this.$Message.error(data.data.message)
        }
      })
      this.name = ''
      this.pwd = ''
    }
  }
}
</script>

<style lang='less'>
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }

    .ivu-modal-header {
      background: #70D3F1;
      height: 30px;

      .ivu-modal-header-inner {
        text-align: center;
        margin-top: -50px;
      }
    }

    .fisrt_column {
      text-align: left;
      padding-left: 160px;
    }

    .ivu-row {
      margin-top: 5px;
    }

    .username, .pwd, .repwd {
      height: 30px;
      line-height: 30px;
      width: 200px;
      border: 1px solid #ABABAB;
      border-radius: 3px;
      padding-left: 10px;
    }

    .ivu-btn-text {
      margin-right: 100px;
    }

    .ivu-modal-footer {
      text-align: center !important;
    }
  }

  .user {
    .add {
      height: 30px;
      width: 150px;
      line-height: 30px;
      border-radius: 10px;
      text-align: center;
      background: #1591FA;
      color: white;

      .add_icon {
        margin-right: 5px;
        font-size: 18px;
        font-weight: bold;
      }

      &:hover {
        cursor: pointer;
        opacity: .8;
      }
    }

    .user_content {
      margin-top: 30px;
      width: 70%;
      text-align: center;

      .ivu-table-row {
        height: 80px;
      }

      .page {
        margin-top: 20px;
        font-size: 14px;
      }
    }

  }

</style>
