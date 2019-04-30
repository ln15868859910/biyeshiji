<template>
  <div class="new">
    <div class="new_content">
      <h1 class="title">{{itemObj.title}}</h1>
      <div class="time">
        发布时间：2019/4/29
      </div>
      <div class="content" v-html="itemObj.content" style="line-height: 1.5">
      </div>
      <div class="declare">
        免责声明：本文仅代表作者个人观点，与中国急救网无关。其原创性以及文中陈述文字和内容未经本站证实，对本文以及其中全部或者部分内容、文字的真实性、完整性、及时性本站不作任何保证或承诺，请读者仅作参考，并请自行核实相关内容。
      </div>
    </div>
  </div>
</template>

<script>
import foot from '@/components/footer.vue'

export default {
  data () {
    return {
      itemObj: {},
      code: 0,
      id: 0
    }
  },
  components: {
    foot
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.code = this.$route.query.code
      this.id = this.$route.query.id
      if (this.code) {
        this.$http.get('/api/getCustomItem', {
          params: {
            id: this.id
          }
        }).then(data => {
          this.itemObj = data.data.item[0]
        })
      } else {
        this.$http.get('/api/getNewItem', {
          params: {
            id: this.id
          }
        }).then(data => {
          this.itemObj = data.data.item[0]
        })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  }
}
</script>

<style lang='less'>
  .new {
    padding: 10px 20px 40px;

    .new_content {

    }

    .title {
      width: 100%;
      line-height: 30px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid #999999;
    }

    .time {
      width: 80%;
      margin: 0 auto;
      border-bottom: 1px solid #999999;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
    }

    .content {
      margin-top: 20px;
    }

    .declare {
      border: 1px solid #9fc5e9;
      background: #f0f9ff;
      color: #333333;
      border-radius: 5px;
      font-size: 12px;
      line-height: 20px;
      text-align: left;
      padding: 10px;
      margin-top: 20px;
      margin-bottom: 50px;
    }
  }
</style>
