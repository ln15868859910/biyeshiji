<template>
    <div class="propagate_detail">
        <h1 class="title">{{proagateItem.title}} </h1>
        <div class="time">{{proagateItem.createtime | formatTime}}</div>
        <div class="propagate_detail_content" v-html="proagateItem.content" style="line-height: 1.5;">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      proagateItem: {}
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route' () {
      this.init()
    }
  },
  methods: {
    init () {
      let id = this.$route.query.id
      this.$http.get('/api/getPropagateById', {params: {
        id: id
      }}).then(data => {
        this.proagateItem = data.data.list[0]
      })
    }
  }
}
</script>

<style lang='less'>
.propagate_detail{
    height: 600px;
    margin: 0 auto;
    padding: 20px;
    .title{
        margin-top: 20px;
        text-align: center;
        font-size: 28px;
        font-weight: 700;
        line-height: 50px;
        color: #191919;
    }
    .time{
        margin-top: 15px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color: #999;
    }
    .propagate_detail_content{
        margin-top: 20px;
    }
}
</style>
