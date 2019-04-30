<template>
    <div class="index2">
        <div class="round_pics">
                <slide/>
            </div>
            <div class="news">
                <div class="title"><img width="100%" src="../assets/imgs/newslist_30.gif"></div>
                <ul>
                     <li class="news_item" v-for="(item,index) in newList" :key="index" @click="showDetail(item)"><i class="iconfont iconyoujiantou"></i>{{item.title}}</li>
                    <li class="news_item"><i class="iconfont iconyoujiantou"></i>333</li>
                    <li class="news_item"><i class="iconfont iconyoujiantou"></i>222</li>
                    <li class="news_item"><i class="iconfont iconyoujiantou"></i>111</li>
                    <li class="news_item"><i class="iconfont iconyoujiantou"></i>eee</li>
                </ul>
            </div>
    </div>
</template>

<script>
import slide from '@/components/round.vue'
export default {
  data () {
    return {
      newList: []
    }
  },
  components: {
    slide
  },
  created () {
    this.$http.get('/admin/getNewList').then(data => {
      this.newList = data.data.newList
    })
  },
  methods: {
    showDetail (item) {
      console.log(item)
      this.$router.push({
        query: { id: item.id, code: 0},
        name: 'new'
      })
    }
  }
}
</script>

<style lang = 'less'>
    .index2{

    }
</style>
