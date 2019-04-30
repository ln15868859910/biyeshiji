
<template>
    <div class="side">
         <div class="user_info">
             <img width="50" height="50" src="../assets/imgs/head.jpg">
             <div class="login_and_register" v-show="!isLogin">
                 <router-link :to = "{ name: 'login',params:{login:true}}">
                    <div class="login">请登陆</div>
                </router-link> 
                <router-link :to = "{ name: 'login',params:{login:false}}">
                    <div class="register">免费注册</div>
                </router-link>
             </div>
            <div class="user_home" v-show="isLogin">
                <div class="welcome_user">欢迎你，<strong style="color:red;">{{name}}</strong>！</div>
                <div class="logout" @click="logout">登出</div>
            </div>        
        </div>
        <div class="custom">
            <div class="title">急救常识</div>
            <ul class="custom_list">
                 <li 
                 class="item" 
                 v-for="(item ,index) in customList" 
                 :key="index" 
                 @click="showDetail(item)">
                     <i class="iconfont icondian"></i>
                     {{item.title}}
                     </li>
                <li class="item"><i class="iconfont icondian"></i>2222</li>
                <li class="item"><i class="iconfont icondian"></i>2222</li>
                <li class="item"><i class="iconfont icondian"></i>2222</li>
                <li class="item"><i class="iconfont icondian"></i>2222</li>
                <li class="item"><i class="iconfont icondian"></i>2222</li>
                <li class="item"><i class="iconfont icondian"></i>2222</li>
            </ul>
        </div>
        <img width="100%" height="200" class="img" src="../assets/imgs/logo.jpg" alt="">
    </div>
</template>

<script>
export default {
    data () {
        return {
            name:'',
            customList:[]
        }
    },
    computed: {
        isLogin(){
            if(localStorage.getItem('userName') && localStorage.getItem('userToken')){
                this.$store.commit('userStatus',localStorage.getItem('userName'))
                this.name = localStorage.getItem('userName')
            } else {
                this.$store.commit('userStatus',null)
            }
            return this.$store.getters.isLogin
        }
    },
    mounted () {
      this.$http.get('/api/getCustomList').then(data=>{
          this.customList = data.data.customList
      })  
    },
    methods: {
        logout(){
            localStorage.removeItem('userName')
            localStorage.removeItem('userToken')
            this.$store.dispatch('setUser',null)
        },
        showDetail(item){
            this.$router.push({
             query: { id:item.id,code:1},
              name:'new'
            })
        }
    }
}
</script>

<style lang='less'>
    .side{
        width:100%;
        .user_info{
            padding-top: 30px;
            height:200px ;
            border: 1px solid green;
            text-align: center;
            box-sizing: border-box;
            .user_home{
                .welcome_user{
                    margin-top: 20px;
                    text-align: center;
                }
                .logout{
                    width: 80px;
                    line-height: 20px;
                    margin: 20px auto;
                    background: #31A4E5;
                    padding: 5px;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: white;
                    &:hover{
                        cursor: pointer;
                        background: #333; 
                    }
                }
            }
            .login,.register{
                margin-top: 10px;
                margin-left: 35%;
                width: 100px;
                height: 30px;
                line-height: 30px;
                border-radius: 10px;
                background: #6BA7F0;
                color: white;
                &:hover{
                    cursor: pointer;
                    background: #333;
                    transition: all .3s ease-in-out;
                }
            }
        }
        .custom{
            font-size: 14px;
            margin-top: 5px;
            padding: 5px;
            border: 1px solid #ccc;
            .title{
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: #E8F2FE;
                padding-left: 10px;
            }
            .item{
                font-size: 12px;
                height: 25px;
                line-height: 25px;
                &:hover{
                    cursor: pointer;
                    background: #599DDE;
                    color:white;
                }
            }
        }
        .img{
            margin-top: 5px;
            border-radius: 10px;
        }
    }
</style>
