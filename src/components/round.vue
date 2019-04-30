<template>
    <div class="carousel-wrap" id="carousel">
        <transition-group tag="ul" class="slide-ul" name="list">
            <li v-for="(list,index) in slideList" :key="list.alt" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
                <img :src="list.image">
            </li>
        </transition-group>
        <div class="carousel-items">
            <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" :key="item" @mouseover="change(index)"></span>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        slideList:[
            {
              alt:'111',
              image:require('../assets/imgs/1.jpg')
            },
            {
              alt:'222',
              image:require('../assets/imgs/2.jpg')
            },
            {
              alt:'333',
              image:require('../assets/imgs/3.jpg')
            },
            {
              alt:'444',
              image:require('../assets/imgs/4.jpg')
            },
            {
              alt:'555',
              image:require('../assets/imgs/5.jpg')
            }
        ],
        timer:'',
        currentIndex:0
  }
},
created () {
    this.$nextTick(()=>{
        this.timer = setInterval(()=>{
            this.autoplay()
        },2000)
    })
},methods: {
    go () {
        this.timer = setInterval(()=>{
            this.autoplay()
        },2000)
    },
    stop(){
        clearInterval(this.timer)
        this.timer = null
    },
    change(index){
        this.currentIndex = index
    },
    autoplay(){
        this.currentIndex ++
        if(this.currentIndex>this.slideList.length-1){
            this.currentIndex = 0
        }
    }
}
}
</script>

<style lang='less'>
.carousel-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}

.slide-ul {
  width: 100%;
  height: 100%;
  li {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.carousel-items {
  position: absolute;
  z-index: 10;
  bottom: 20px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  span {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin: 0 3px;
    background-color: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background-color: #FFFF00;
  }
}
.list-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%)
}

.list-enter {
  transform: translateX(100%)
}

.list-leave {
  transform: translateX(0)
}
</style>
