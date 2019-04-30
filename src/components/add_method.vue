<template>
    <div class="add_method">
        <Row class="category">
            <Col span="3">
            <strong style="color:red">*</strong>
            请选择类别：</Col>
            <Col span="21">
                <Select v-model="kind" style="width:200px">
                    <Option v-for="item in kindList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Row>
        <Row class="category">
            <Col span="3">
            <strong style="color:red">*</strong>
            请选择分类：</Col>
            <Col span="21">
                <Select v-model="selectCate" style="width:200px">
                    <OptionGroup v-for="(item,index) in showList" :key="index" :label="item.cate_name">
                        <Option v-for="(sub_item,sub_index) in item.sub_names" :key="sub_index" :value="sub_item.value" :sub_item="item.value">{{ sub_item.label }}</Option>
                    </OptionGroup>
                </Select>
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
            <Col span="3"> <strong style="color:red">*</strong>请输入内容：</Col>
            <Col span="21">
               <wangeditor :catchData="catchData"></wangeditor>
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
      cateList: [],
      selectCate: '',
      showList: [],
      title: '',
      content: '',
      file: {},
      kind: '',
      kindList: [
        {
          value: '急救措施',
          label: '急救措施'
        },
        {
          value: '预防措施',
          label: '预防措施'
        }
      ]
    }
  },
  components: {
    wangeditor
  },
  created () {
    this.cateList = this.$store.state.cateList
    this.cateList.forEach((item, index) => {
      var subList = []
      item.sub_names.forEach(sub_item => {
        subList.push({
          value: sub_item,
          label: sub_item
        })
      })
      this.showList.push({
        cate_name: item.cate_name,
        sub_names: subList
      })
    })
    console.log(this.showList)
  },
  methods: {
    catchData (value) {
      this.content = value
      console.log(this.content)
    },
    save () {
      var formdata = new FormData()
      formdata.append('cate', this.selectCate)
      formdata.append('myimg', this.file)
      formdata.append('title', this.title)
      formdata.append('content', this.content)
      formdata.append('kind', this.kind)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$http.post('/api/add_method', formdata, config).then(data => {
        if (data.data.code) {
          this.$Message.info(data.data.message)
          this.$router.push({
            name: 'method'
          })
        } else {
          this.$Message.error(data.data.message)
        }
      })
    },
    showfile (e) {
      var file = e.target.files[0]
      this.file = file
      var fr = new FileReader()
      var single_img = this.$refs.single_img
      fr.onloadend = function (e) {
        console.log(e.target)
        single_img.src = e.target.result
      }
      fr.readAsDataURL(file)
      single_img.style.display = 'inline-block'
    }
  }
}
</script>

<style lang='less'>
.add_method{
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
}
</style>
