<template>
    <div class="method_edit">
         <Row class="category">
            <Col span="3"> <strong style="color:red">*</strong>急救分类：</Col>
            <Col span="21">
               <span>{{sub_category}}</span>
            </Col>
        </Row>
        <Row class="title">
            <Col span="3"> <strong style="color:red">*</strong>请输入标题：</Col>
            <Col span="21">
               <input type="text" placeholder="请输入标题..." v-model="title">
            </Col>
        </Row>
        <Row class="picture">
            <Col span="3"> <strong style="color:red">*</strong>请选择图片：</Col>
            <Col span="21">
               <div class="pickFileBox">
                    选择文件
                    <input type="file" class="pickImg" @change="showfile"/>
                </div>
                <img ref="single_img" width="100" height="100" style="vertical-align: middle;display:none;" />
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
      titlePage: '',
      content: '',
      filename: '',
      file: {},
      sub_category: '',
      kind: ''
    }
  },
  components: {
    wangeditor
  },
  created () {
    this.title = this.$route.params.title
    this.content = this.$route.params.content.replace(/&quot;/g, '\"')
    this.filename = this.$route.params.title_page
    this.id = this.$route.params.id
    this.sub_category = this.$route.params.sub_category
    this.kind = this.$route.params.kind
    this.$nextTick(() => {
      var single_img = this.$refs.single_img
      single_img.src = 'http://localhost:3000/' + this.filename
      single_img.style.display = 'inline-block'
    })
  },
  methods: {
    catchData (value) {
      this.content = value
    },
    showfile (e) {
      var file = e.target.files[0]
      this.file = file
      var fr = new FileReader()
      var single_img = this.$refs.single_img
      fr.onloadend = function (e) {
        single_img.src = e.target.result
      }
      fr.readAsDataURL(file)
      single_img.style.display = 'inline-block'
    },
    save () {
      var formdata = new FormData()
      formdata.append('id', this.id)
      formdata.append('myimg', this.file)
      formdata.append('title', this.title)
      formdata.append('content', this.content)
      formdata.append('kind', this.kind)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$http.post('/api/edit_method', formdata, config).then(data => {
        console.log(data)
        if (data.data.code) {
          this.$Message.info(data.data.message)
          this.$router.push({
            name: 'method'
          })
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
