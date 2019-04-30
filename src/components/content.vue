<template>
  <transition :name="transitionName">
   <div class="content">
    <h1 class="title">{{title}}</h1>
    <div class="define">
      {{defined}}
    </div>
    <div class="method_content">
      <h3 class="sub_title">
        急救措施
      </h3>
      <div class="inner_content">
        <ul style="display: flex;flex-wrap: wrap;">
          <li v-for="(item,index) in methodList" :key="index" class="item">
            <div class="headline">
              <span class="num">{{index+1}}</span>
              <span class="text">{{item.title}}</span>
            </div>
            <div class="img_content" @click="showDetail(item)">
              <img :src="require('@/assets/public/upload/'+item.title_page)" width="150" height="100" class="imgs">
              <div class="nav">
                查看详情
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="defend_content">
      <h3 class="sub_title">
        预防措施
      </h3>
      <div class="inner_content">
        <ul style="display: flex;flex-wrap: wrap;">
          <li v-for="(item,index) in defendList" :key="index" class="item">
            <div class="headline">
              <span class="num">{{index+1}}</span>
              <span class="text">{{item.title}}</span>
            </div>
            <div class="img_content" @click="showDetail(item)">
              <img :src="require('@/assets/public/upload/'+item.title_page)" width="200" height="200" class="imgs">
              <div class="nav">
                查看详情
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Modal
      v-model="isshow"
      :title="currentTitle"
      class-name="vertical-center-modal"
      :closable="false"
    >
      <p class="detail_content" v-html="currentContent">
        {{currentContent}}
      </p>
      <div slot="footer">
        <Button type="primary" size="large" @click="cancel">取消</Button>
      </div>
    </Modal>
    <div class="commet_content">
      <a class="avator">
        <img src="../assets/imgs/head.jpg">
      </a>
      <textarea placeholder="写下你的评论..." v-model="commet" class="commet_text"></textarea>
      <div class="write_block">
        <a class="send" @click="save">保存</a>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isshow: false,
      title: '',
      methodList: [],
      defendList: [],
      defined: '',
      currentContent: '',
      currentTitle: '',
      commet: '',
      transitionName: ''
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  },
  methods: {
    init () {
      let sub_name = this.$route.query.sub_name
      this.$http.get('/api/getallList', {
        params: {
          sub_name: sub_name
        }
      }).then(data => {
        this.title = this.$route.query.sub_name
        this.methodList = data.data.methodList
        this.defendList = data.data.defendList
        this.defined = data.data.defind
        this.transitionName = 'slide-fade'
      })
    },
    showDetail (item) {
      this.isshow = true
      this.currentContent = item.content
      this.currentTitle = item.title
    },
    cancel () {
      this.isshow = false
    },
    save () {
      if (!this.commet) {
        this.$Message.error('评论不能为空！')
      } else {
        this.$http.post('/api/add_commet', {
          title: this.title,
          username: localStorage.getItem('userName'),
          commet: this.commet
        }).then(data => {
          if (data.data.code) {
            this.$Message.info(data.data.message)
          }
          this.commet = ''
        })
      }
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
      background: #57A3F3;

      .ivu-modal-header-inner {
        font-size: 16px;
        color: white;
        text-align: center;
      }
    }

    .detail_content {
      font-size: 14px;
    }
  }

  .content {
    width: 70%;
    border: 1px solid #f0f0ee;
    border-top: none;
    margin: 0 auto 5px auto;
    padding: 20px;

    .title {
      // width: 95%;
      margin: 0 auto;
      border-radius: 5px;
      height: 50px;
      background: #6BCCEF;
      color: white;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .define {
      margin: 20px auto;
      padding: 10px;
      line-height: 20px;
      width: 90%;
      text-indent: 30px;
      background: #FDE9B1;
      border-radius: 3px;
      font-size: 14px;

    }

    .method_content, .defend_content {
      .sub_title {
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
        padding: 10px;
        border-bottom: 2px solid #78BBD1;
      }

      .inner_content {
        padding: 10px;

        .item {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          width: calc((100% - 120px) / 3);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 20px;

          .headline {
            text-align: center;
            margin-bottom: 10px;
            font-size: 18px;

            .num {
              width: 20px;
              line-height: 17px;
              border: 1px solid;
              border-radius: 50%;
              display: inline-block;
            }
          }

          .img_content {
            position: relative;

            &:hover .nav {
              opacity: 1;
              cursor: pointer;
            }

            .nav {
              position: absolute;
              bottom: 2px;
              text-align: center;
              background: rgba(51, 51, 51, .6);
              width: 100%;
              height: 40px;
              line-height: 40px;
              color: white;
              opacity: 0;
              transition: opacity .5s ease-in-out;
            }

            .imgs {
              width: 250px;
              height: 200px;
              border-radius: 3px;

              &:hover {
                cursor: pointer;
              }
            }
          }

        }
      }
    }

    .commet_content {
      padding-left: 30px;

      .avator {
        width: 38px;
        height: 38px;
        display: inline-block;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .commet_text {
        width: 91%;
        height: 80px;
        font-size: 14px;
        border: 1px solid #dcdcdc;
        padding: 10px;
        border-radius: 4px;
        background-color: hsla(0, 0%, 71%, .1);
        resize: none;
        display: inline-block;
        vertical-align: top;
        outline-style: none;
      }

      .write_block {
        position: relative;
        height: 50px;

        .send {
          position: absolute;
          top: 10px;
          right: 40px;
          width: 78px;
          margin: 10px 0;
          padding: 8px 18px;
          font-size: 16px;
          border: none;
          border-radius: 20px;
          color: #fff !important;
          background-color: #42c02e;
          cursor: pointer;
          outline: none;
          display: block;
        }
      }
    }
    .slide-fade{
      position: absolute;left:0;right: 0;
    }
    .slide-fade-enter-active {
      transition: all 1.2s ease;
    }
    .slide-fade-leave-active {

      transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
      left:0;right: 0;
      transform: translateX(50px);
      opacity: 0;
    }
  }
</style>
