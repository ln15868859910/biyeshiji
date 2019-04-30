<template>
    <div class="commet">
        <div class="add" @click="addCommet" ><strong class="add_icon">+</strong>新增留言</div>
        <div class="commet_content">
            <Table border :columns="titleList" :data="showList"></Table>
            <div class="page">
                <Page :total="dataCount" :page-size ="pageSize" show-total @on-change="changePage" show-elevator></Page>
            </div>
        </div>
        <Modal
        v-model="isshow"
        title="新增评论"
        @on-ok="add_ok"
        @on-cancel="cancel"
        :closable = false
        class-name="vertical-center-modal">
        <Row>
            <Col span="6"> 请选择用户：</Col>
            <Col span="18">
                <Select v-model="selectuser" style="width:200px">
                    <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span="6"> 请选择分类：</Col>
            <Col span="18">
                <Select v-model="selectcate" style="width:200px">
                    <OptionGroup v-for="(item,index) in showcatelist" :key="index" :label="item.cate_name">
                        <Option v-for="(sub_item,sub_index) in item.sub_names" :key="sub_index" :value="sub_item.value" :sub_item="item.value">{{ sub_item.label }}</Option>
                    </OptionGroup>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span="6">请输入留言：</Col>
            <Col span="18">
                <textarea v-model="add_content" class="content"></textarea>
            </Col>
        </Row>
    </Modal>
         <Modal
        v-model="edit_ishow"
        title="编辑留言"
        @on-ok="edit_ok"
        @on-cancel="cancel"
        :closable = false
        class-name="vertical-center-modal">
        <Row>
            <Col span="6"> 用户名：</Col>
            <Col span="18">
                {{username}}
            </Col>
        </Row>
        <Row>
            <Col span="6"> 分类名：</Col>
            <Col span="18">
                {{sub_name}}
            </Col>
        </Row>
        <Row>
            <Col span="6"> 留言内容：</Col>
            <Col span="18">
               <textarea v-model="content" class="content"></textarea>
            </Col>
        </Row>
    </Modal>
    </div>
</template>

<script>
export default {
  data () {
    return {
      titleList: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '分类名',
          key: 'sub_cate'
        },
        {
          title: '留言内容',
          key: 'content'
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
      commetList: [],
      dataCount: 0,
      pageSize: 3,
      isshow: false,
      edit_ishow: false,
      username: '',
      sub_name: '',
      content: '',
      old_content: '',
      edit_id: 0,
      selectuser: '',
      selectcate: '',
      userList: [],
      cateList: [],
      showcatelist: [],
      add_content: ''
    }
  },
  created () {
    this.$http.get('/admin/getcommet').then(data => {
      var commetList = data.data.commetList
      commetList.forEach((item, index) => {
        this.commetList.push({
          id: item.id,
          username: item.username,
          sub_cate: item.sub_name,
          content: item.content
        })
      })
      console.log(commetList)
      this.init()
    })
    this.$http.get('/admin/getusers').then(data => {
      var userList = data.data.userList
      userList.forEach((item) => {
        this.userList.push({
          value: item.username,
          label: item.username
        })
      })
    })

    this.cateList = this.$store.state.cateList
    this.cateList.forEach((item, index) => {
      var subList = []
      item.sub_names.forEach(sub_item => {
        subList.push({
          value: sub_item,
          label: sub_item
        })
      })
      console.log(subList)
      this.showcatelist.push({
        cate_name: item.cate_name,
        sub_names: subList
      })
      console.log(456)
      console.log(this.showcatelist)
    })
  },
  methods: {
    init () {
      this.dataCount = this.commetList.length
      if (this.dataCount < this.pageSize) {
        this.showList = this.commetList
      } else {
        this.showList = this.commetList.slice(0, this.pageSize)
      }
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.showList = this.commetList.slice(_start, _end)
      this.pageIndex = index
    },
    addCommet () {
      this.isshow = true
    },
    remove (index) {
      this.$http.post('/admin/del_commet', {
        id: this.showList[index].id
      }).then(data => {
        this.$Message.info(data.data.message)
      })
      var num = (this.pageIndex - 1) * this.pageSize + index
      this.commetList.splice(num, 1)
      this.init()
    },
    edit (index) {
      this.edit_ishow = true
      this.username = this.showList[index].username
      this.content = this.showList[index].content
      this.old_content = this.content
      this.sub_name = this.showList[index].sub_cate
      this.edit_id = this.showList[index].id
    },
    edit_ok () {
      if (this.content === this.old_content || this.content === '') {
        this.$Message.error('操作失败！')
        return
      }
      this.$http.post('/admin/editcommet', {
        id: this.edit_id,
        content: this.content
      }).then(data => {
        this.$Message.info(data.data.message)
      })
      this.content = ''
    },
    add_ok () {
      if (this.selectuser === '' || this.selectcate === '' || this.add_content === '') {
        this.$Message.error('操作失败！')
        return
      }
      this.$http.post('/admin/add_commet', {
        user: this.selectuser,
        cate: this.selectcate,
        content: this.add_content
      }).then(data => {
        this.$Message.info(data.data.message)
      })
      this.content = ''
    },
    cancel () {
      this.$Message.info('已取消！')
    }
  }
}
</script>

<style lang='less'>
 .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .ivu-modal-header{
            background: #70D3F1;
            height: 30px;
            .ivu-modal-header-inner{
                text-align: center;
                margin-top: -50px;
            }
        }
        .ivu-row{
            margin-top: 10px;
            font-size: 14px;
            .ivu-col{
                .content{
                    width: 70%;
                    height: 80px;
                    padding: 5px;
                    font-size: 13px;
                    border: 1px solid #dcdcdc;
                    border-radius: 4px;
                    resize: none;
                    display: inline-block;
                    vertical-align: top;
                    outline-style: none;
                }
            }
        }
        .ivu-btn-text{
                margin-right: 100px;
        }
        .ivu-modal-footer{
            text-align: center !important;
        }
}
.commet{
  .add{
        height: 30px;
        width: 150px;
        line-height: 30px;
        border-radius: 10px;
        text-align: center;
        background: #1591FA;
        color: white;
        .add_icon{
            margin-right: 5px;
            font-size: 18px;
            font-weight: bold;
        }
        &:hover{
            cursor: pointer;
            opacity: .8;
        }
    }
     .commet_content{
        margin-top: 30px;
        width: 70%;
        text-align: center;
        .ivu-table-row{
            height: 80px;
        }
        .page{
            margin-top: 20px;
            font-size: 14px;
        }
    }
}
</style>
