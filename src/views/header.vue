<template>
  <div class="index" style="height: 100%">
    <div class="header">
      <div class="header_img">
        <img src="../assets/imgs/logo.png" class="logo_img" width="250" height="90">
        <img src="../assets/imgs/kepu.png" class="kepu_img" width="100" height="50">
      </div>
      <div class="hbg">
        <div class="hbg_resize">
          <div>
            <ul class="menu_nav">
              <li class="active" @click="showindex"><a href="javascript:void(0);">首页</a></li>
              <li v-for="(item,index) in cateList" :key="index" @mouseover="showsub(index)" @mouseout="hidesub(index)"
                  class="active">
                <a href="javascript:void(0);">{{item.cate_name}}</a>
                <ul class="sub_category active" :class="{'sub_show':ind === index}">
                  <li v-for="(sub_cate,sub_index) in item.sub_names" :key="sub_index" @click="showcontent(sub_cate)">
                    <a href="javascript:void(0);">{{sub_cate}}</a>
                  </li>
                </ul>
              </li>
              <li class="active" @click="showpropagate"><a href="javascript:void(0);">宣传</a></li>
            </ul>
          </div>
          <h2 class="text first_text">你知道吗？？？</h2>
          <p class="text">每年许许多多的病人因为没有及时抢救失去了他们的宝贵生命！！！</p>
          <p class="text">学会急救，就可以及时有效地措施生命！！！</p>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../components/footer.vue'

export default {
  components: {
    foot
  },
  data () {
    return {
      cateList: [],
      ind: -1
    }
  },
  created () {
    this.$http.get('/api/getcate').then(data => {
      var data = data.data.cateList
      data.forEach(item => {
        this.cateList.push({
          cate_name: item.cate_name,
          sub_names: item.sub_names.split(',')
        })
      })
    })
    this.$store.state.cateList = this.cateList
  },
  methods: {
    showsub (index) {
      this.ind = index
    },
    hidesub (index) {
      this.ind = -1
    },
    showcontent (sub_name) {
      this.$router.push({
        name: 'content',
        query: {
          sub_name: sub_name
        }
      })
    },
    showpropagate () {
      this.$router.push({
        path: '/propagate'
      })
    },
    showindex () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang='less'>
  @import '../../src/public/styles/index.less';
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
</style>
