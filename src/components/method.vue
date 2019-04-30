<template>
  <div class="method">
    <div class="add">
      <router-link to="method_add">
        <strong class="add_icon">+增加措施</strong>
      </router-link>
    </div>
    <div class="method_content">
      <h1 class="title">急救方法列表</h1>
      <Table border :columns="titleList" :data="showlist"></Table>
      <div class="page">
        <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changePage" show-elevator></Page>
      </div>
    </div>
    <div class="method_content">
      <h1 class="title">预防措施列表</h1>
      <Table border :columns="titleList1" :data="showlist1"></Table>
      <div class="page">
        <Page :total="dataCount1" :page-size="pageSize1" show-total @on-change="changePage1" show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      method_list: [],
      defend_list: [],
      titleList: [
        {
          title: '分类',
          key: 'category'
        },
        {
          title: '子分类',
          key: 'sub_category'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '图片',
          key: 'picture',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('img', {
                style: {
                  'margin-top': '10px',
                  'margin-bottom': '10px',
                  'border-radius': '4px',
                  width: '50px',
                  height: '50px',
                  cursor: 'pointer'
                },
                attrs: {
                  'src': 'http://localhost:3000/' + this.showlist[params.index].title_page
                }
              })
            ]
            )
          }
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
      titleList1: [
        {
          title: '分类',
          key: 'category'
        },
        {
          title: '子分类',
          key: 'sub_category'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '图片',
          key: 'picture',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('img', {
                style: {
                  'margin-top': '10px',
                  'margin-bottom': '10px',
                  'border-radius': '4px',
                  width: '50px',
                  height: '50px',
                  cursor: 'pointer'
                },
                attrs: {
                  'src': 'http://localhost:3000/' + this.showlist1[params.index].title_page
                }
              })
            ]
            )
          }
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
                    this.edit1(params.index)
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
                    this.remove1(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      showlist: [],
      showlist1: [],
      dataCount: 0,
      pageSize: 3,
      pageIndex: 1,
      dataCount1: 0,
      pageSize1: 3,
      pageIndex1: 1,
      kind: ''
    }
  },
  created () {
    this.$http.get('/api/get_methods').then(data => {
      var dataList = data.data.methodList
      dataList.forEach((item, index) => {
        this.method_list.push({
          id: item.id,
          category: item.cate_name,
          sub_category: item.sub_name,
          title: item.title,
          title_page: item.title_page,
          content: item.content
        })
      })
      this.init()
    })
    this.$http.get('/api/get_defends').then(data => {
      var dataList = data.data.defendList
      dataList.forEach((item, index) => {
        this.defend_list.push({
          id: item.id,
          category: item.cate_name,
          sub_category: item.sub_name,
          title: item.title,
          title_page: item.title_page,
          content: item.content
        })
      })
      this.init1()
    })
  },
  methods: {
    init () {
      this.dataCount = this.method_list.length
      if (this.dataCount < this.pageSize) {
        this.showlist = this.method_list
      } else {
        this.showlist = this.method_list.slice(0, this.pageSize)
      }
    },
    init1 () {
      this.dataCount1 = this.defend_list.length
      if (this.dataCount1 < this.pageSize1) {
        this.showlist1 = this.defend_list
      } else {
        this.showlist1 = this.defend_list.slice(0, this.pageSize1)
      }
      console.log(this.showlist1)
    },
    defend_init () {

    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.showlist = this.method_list.slice(_start, _end)
      this.pageIndex = index
    },
    changePage1 (index) {
      var _start = (index - 1) * this.pageSize1
      var _end = index * this.pageSize1
      this.showlist1 = this.defend_list.slice(_start, _end)
      this.pageIndex1 = index
    },
    remove1 (index) {
      this.$http.post('/admin/del_defend', {
        sub_category: this.showlist1[index].sub_category,
        title: this.showlist1[index].title
      }).then(data => {
        this.$Message.info(data.data.message)
        var num = (this.pageIndex1 - 1) * this.pageSize1 + index
        this.defend_list.splice(num, 1)
        this.init1()
      })
    },
    remove (index) {
      console.log(index)
      this.$http.post('/admin/del_method', {
        sub_category: this.showlist[index].sub_category,
        title: this.showlist[index].title
      }).then(data => {
        this.$Message.info(data.data.message)
        var num = (this.pageIndex - 1) * this.pageSize + index
        this.method_list.splice(num, 1)
        this.init()
      })
    },
    edit (index) {
      this.kind = '急救措施'
      this.$router.push({
        name: 'method_edit',
        params: {
          kind: this.kind,
          id: this.showlist[index].id,
          sub_category: this.showlist[index].sub_category,
          title: this.showlist[index].title,
          title_page: this.showlist[index].title_page,
          content: this.showlist[index].content
        }
      })
    },
    edit1 (index) {
      this.kind = '预防措施'
      this.$router.push({
        name: 'method_edit',
        params: {
          kind: this.kind,
          id: this.showlist1[index].id,
          sub_category: this.showlist1[index].sub_category,
          title: this.showlist1[index].title,
          title_page: this.showlist1[index].title_page,
          content: this.showlist1[index].content
        }
      })
    }
  }
}
</script>

<style lang='less'>
  .method {
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
        color: #ffffff;
      }

      &:hover {
        cursor: pointer;
        opacity: .9;
      }
    }

    .method_content {
      margin-top: 20px;
      width: 90%;
      height: 400px;

      .page {
        text-align: center;
      }

      .ivu-page {
        font-size: 14px;
        margin-top: 20px;
      }

      .title {
        background: #75B1E5;
        margin: 30px 0;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        color: white;
      }
    }
  }
</style>
