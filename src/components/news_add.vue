<template>
    <div class="news_add">
        <Row class="kind">
            <Col span="3">
            <strong style="color:red">*</strong>
            请选择类别：</Col>
            <Col span="21">
                <Select v-model="kind" style="width:200px">
                    <Option v-for="item in kindList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Row>
        <Row class="title">
             <Col span="3"> <strong style="color:red">*</strong>请输入标题：</Col>
            <Col span="21">
               <input type="text" placeholder="请输入标题..." v-model="title">
            </Col>
        </Row>
        <Row class="add_content">
            <Col span="3"> <strong style="color:red">*</strong>请输入内容：</Col>
            <Col span="21">
               <wangeditor :catchData="catchData"></wangeditor>
            </Col>
        </Row>
        <Row>
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
import {showresult} from '../utils/common.js'
export default {
  data () {
    return {
      kindList: [
        {
          value: '0',
          label: '急救新闻'
        },
        {
          value: '1',
          label: '急救常识'
        },
        {
          value: '2',
          label: '宣传新闻'
        }
      ],
      kind: '',
      title: '',
      content: ''
    }
  },
  components: {
    wangeditor
  },
  methods: {
    catchData (value) {
      this.content = value
    },
    save () {
      if (!this.kind) {
        this.$Message.error('请选择分类！')
      } else if (!this.title) {
        this.$Message.error('请输入标题！')
      } else {
        this.$http.post('/admin/add_news', {
          kind: this.kind,
          title: this.title,
          content: this.content
        }).then(data => {
          var _this = this
          showresult(_this, data)
        })
      }
    }
  }
}
</script>

<style lang='less'>
.news_add{
     .ivu-row{
        height: 50px;
        margin-bottom: 10px;
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
}
</style>
