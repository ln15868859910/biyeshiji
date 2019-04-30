<template>
    <div class="propagate_title">
        <h1 class="title">宣传栏</h1>
        <ul class="propagate_inner">
          <li class="propagate_inner_item" v-for="(item,index) in proagateList">
            <div class="item_detail">
              <span class="item_num">{{index+1}}</span>
              <span class="item_time">{{item.createtime|formatTime}}</span>
            </div>
            <div class="item_title" @click="show_detail(item)">
              {{item.title}}
            </div>
          </li>
            <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title" @click="show_detail">
                    中国兵工华资东有限公司
                </div>
            </li>
            <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
            <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
            <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司中中国兵工华资东有限公司中中国兵工华资东有限公司中
                </div>
            </li>
                <li class="propagate_inner_item">
                <div class="item_detail">
                    <span class="item_num">1</span>
                    <span class="item_time">2019.3.23</span>
                </div>
                <div class="item_title">
                    中国兵工华资东有限公司
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      proagateList: []
    }
  },
  created () {
    this.$http.get('/api/getPropagate').then(data => {
      this.proagateList = data.data.list
    })
  },
  methods: {
    show_detail (item) {
      this.$router.push({
        name: 'propagate_detail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang='less'>
.propagate_title{
     .title{
        margin:30px;
        text-align: center;
        font-size: 20px;
        color: #197FE6;
    }
    .propagate_inner{
        overflow: hidden;
        .propagate_inner_item{
            margin-left: 20px;
            margin-bottom: 20px;
            list-style: none;
            display: inline-flex;
          width: calc((100% - 60px) / 2);
            .item_detail{
                float: left;
                width: 80px;
                height: 80px;
                background: #197FE6;
                color: white;
                .item_num,.item_time{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    display: inline-block;
                    text-align: center;
                }
                .item_num{
                    padding: 5px;
                    font-weight: bold;
                    font-size: 14px;
                }
                .item_time{
                    font-size: 12px;
                }
            }
            .item_title{
                width: 200px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: 10px;
                padding-right: 10px;
                line-height: 20px;
                height: 80px;
                float: left;
                background: #F2F7FB;
                font-size: 12px;
                &:hover{
                    cursor: pointer;
                    background: rgba(255, 172, 56, .2);
                }
            }
        }
    }
}
</style>
