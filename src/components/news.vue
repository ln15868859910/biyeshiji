<template>
    <div class="news">
        <router-link to="news_add">
            <div class="add"><strong class="add_icon">+</strong>增加</div>
        </router-link>
        <div class="method_content">
            <h1 class="title">急救新闻</h1>
             <Table border :columns="titleList" :data="showlist"></Table>
            <div class="page">
                <Page :total="dataCount" :page-size ="pageSize" show-total @on-change="changePage" show-elevator></Page>
            </div>
        </div>
        <div class="method_content">
            <h1 class="title">急救常识</h1>
             <Table border :columns="titleList1" :data="showlist1"></Table>
            <div class="page">
                <Page :total="dataCount1" :page-size ="pageSize1" show-total @on-change="changePage1" show-elevator></Page>
            </div>
        </div>
        <div class="method_content">
            <h1 class="title">宣传新闻</h1>
             <Table border :columns="titleList2" :data="showlist2"></Table>
            <div class="page">
                <Page :total="dataCount2" :page-size ="pageSize1" show-total @on-change="changePage2" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      allList: [],
      allList1: [],
      allList2: [],
      titleList: [
        {
          title: '标题',
          key: 'title'
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
          }}
      ],
      titleList1: [
        {
          title: '标题',
          key: 'title'
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
          }}
      ],
      titleList2: [
        {
          title: '标题',
          key: 'title'
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
                    this.edit2(params.index)
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
                    this.remove2(params.index)
                  }
                }
              }, '删除')
            ])
          }}
      ],
      showlist: [],
      showlist1: [],
      showlist2: [],
      dataCount: 0,
      pageSize: 3,
      pageIndex: 1,
      dataCount1: 0,
      pageSize1: 3,
      pageIndex1: 1,
      dataCount2: 0,
      pageSize2: 3,
      pageIndex2: 1
    }
  },
  created () {
    this.$http.get('/api/get_news').then(data => {
      var dataList = data.data.newList
      console.log(data)
      dataList.forEach((item, index) => {
        this.allList.push({
          id: item.id,
          title: item.title,
          content: item.content
        })
      })
      this.init()
    })
    this.$http.get('/api/getCustomList').then(data => {
      var dataList1 = data.data.customList
      dataList1.forEach((item, index) => {
        this.allList1.push({
          id: item.id,
          title: item.title,
          content: item.content
        })
      })
      this.init1()
    }),
    this.$http.get('/api/proagate').then(data => {
      var dataList2 = data.data.proagateList
      dataList2.forEach((item, index) => {
        this.allList2.push({
          id: item.id,
          title: item.title,
          content: item.content
        })
      })
      this.init2()
    })
  },
  methods: {
    catchData (value) {
      this.content = value
    },
    init () {
      this.dataCount = this.allList.length
      if (this.dataCount < this.pageSize) {
        this.showlist = this.allList
      } else {
        this.showlist = this.allList.slice(0, this.pageSize)
      }
    },
    init1 () {
      this.dataCount1 = this.allList1.length
      if (this.dataCount1 < this.pageSize1) {
        this.showlist1 = this.allList1
      } else {
        this.showlist1 = this.allList1.slice(0, this.pageSize1)
      }
    },
    init2 () {
      this.dataCount2 = this.allList2.length
      if (this.dataCount2 < this.pageSize2) {
        this.showlist2 = this.allList2
      } else {
        this.showlist2 = this.allList2.slice(0, this.pageSize2)
      }
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.showlist = this.allList.slice(_start, _end)
      this.pageIndex = index
    },
    changePage1 (index) {
      var _start = (index - 1) * this.pageSize1
      var _end = index * this.pageSize1
      this.showlist1 = this.allList1.slice(_start, _end)
      this.pageIndex1 = index
    },
    changePage2 (index) {
      var _start = (index - 1) * this.pageSize2
      var _end = index * this.pageSize2
      this.showlist2 = this.allList2.slice(_start, _end)
      this.pageIndex2 = indexs
    },
    remove (index) {
      this.$http.post('/admin/del_news', {
        id: this.showlist[index].id
      }).then(data => {
        this.$Message.info(data.data.message)
        var num = (this.pageIndex - 1) * this.pageSize + index
        this.allList.splice(num, 1)
        this.init()
      })
    },
    remove1 (index) {
      this.$http.post('/admin/del_custom', {
        id: this.showlist1[index].id
      }).then(data => {
        this.$Message.info(data.data.message)
        var num = (this.pageIndex1 - 1) * this.pageSize1 + index
        this.allList1.splice(num, 1)
        this.init1()
      })
    },
    remove2 (index) {
      this.$http.post('/admin/del_proagate', {
        id: this.showlist2[index].id
      }).then(data => {
        this.$Message.info(data.data.message)
        var num = (this.pageIndex2 - 1) * this.pageSize2 + index
        this.allList2.splice(num, 1)
        this.init2()
      })
    },
    edit (index) {
      this.$router.push({
        name: 'news_edit',
        params: {
          cate: 0,
          id: this.showlist[index].id,
          title: this.showlist[index].title,
          content: this.showlist[index].content
        }
      })
    },
    edit1 (index) {
      console.log(this.showlist1[index])
      this.$router.push({
        name: 'news_edit',
        params: {
          cate: 1,
          id: this.showlist1[index].id,
          title: this.showlist1[index].title,
          content: this.showlist1[index].content
        }
      })
    },
    edit2 (index) {
      this.$router.push({
        name: 'news_edit',
        params: {
          cate: 2,
          id: this.showlist2[index].id,
          title: this.showlist2[index].title,
          content: this.showlist2[index].content
        }
      })
    }
  }
}
</script>

<style lang='less'>
    .news{
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
        .method_content{
            margin-top: 20px;
            width: 90%;
            height: 400px;
            .page{
                text-align: center;
            }
            .ivu-page{
                font-size: 14px;
                margin-top: 20px;
            }
            .title{
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
