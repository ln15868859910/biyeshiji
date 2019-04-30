<template>
    <div class="method_edit">
        <Row class="title">
            <Col span="3"> <strong style="color:red">*</strong>请输入标题：</Col>
            <Col span="21">
               <input type="text" placeholder="请输入标题..." v-model="title">
            </Col>
        </Row>
        <Row class="add_content">
            <Col span="3"><strong style="color:red">*</strong>请输入内容：</Col>
            <Col span="21">
               <wangeditor :catchData="catchData" :content="content"></wangeditor>
            </Col>
        </Row>
        <Row class="add_content">
            <Col span="3">
            </Col>
             <Col span="21">
                 <Button type="primary" @click="save">保存</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import wangeditor from './editor.vue'
export default {
  data () {
    return {
      id: '',
      title: '',
      content: '',
      cate: 0
    }
  },
  components: {
    wangeditor
  },
  created () {
    this.title = this.$route.params.title
    this.content = this.$route.params.content.replace(/&quot;/g, '\"')
    this.id = this.$route.params.id
    this.cate = this.$route.params.cate
  },
  methods: {
    catchData (value) {
      this.content = value
    },
    save () {
      if (!this.title) {
        this.$Message.error('请输入标题！')
      }
      // 编辑新闻保存
      this.$http.post('/admin/edit_news', {
        cate: this.cate,
        id: this.id,
        title: this.title,
        content: this.content
      }).then(data => {
        console.log(data)
        if (data.data.code) {
          this.$Message.info(data.data.message)
          //    this.$router.push({
          //         name:'method'
          //     })
        } else {
          this.$Message.error(data.data.message)
        }
      })
    }
  }
}
</script>

<style lang='less'>
.method_edit{
     .ivu-row{
        height: 50px;
        line-height: 50px;
    }
    .title{
        input{
            height: 30px;
            line-height: 30px;
            width: 200px;
            border-radius: 5px;
            padding-left: 8px;
            padding-right: 24px;
            outline: none;
            border: 1px solid #DDDFE3;
        }
    }
    .picture{
        height: 150px;
        line-height: 150px;
         .pickFileBox{
             margin-top: 10px;
             margin-right: 20px;
            position: relative;
            width: 100px;
            display: inline-block;
            background: #57A3F3;
            border-radius: 5px;
            padding: 4px 12px;
            overflow: hidden;
            color: white;
            text-decoration: none;
            text-indent: 0;
            line-height: 20px;
            input{
                position: absolute;
                font-size: 100px;
                right: 0;
                top: 0;
                opacity: 0
            }
        }
    }
    .add_content{
        .w-e-text-container{
            height: 500px !important;
        }
    }
}
</style>
