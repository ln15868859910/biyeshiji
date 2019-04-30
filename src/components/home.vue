<template>
    <div class="home">
        <div class="lfet_content">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </div>
        <div class="right_content">
           <side/>
        </div>
    </div>
</template>

<script>
import slide from '@/components/round.vue'
import side from '@/components/side.vue'
export default {
  name: 'home',
  components: {
    slide,
    side
  },
  methods: {
    shownew () {
      this.$router.push({
        name: 'new'
      })
    }
  }
}
</script>

<style lang='less'>
@import '../public/styles/home.less';
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
