<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/imgs/logo.png" class="logo_img"  width="300" height="100">
            <span class="text">急救网站统一身份认证</span>
        </div>
        <div class="content_box">
            <div class="login_bg">
                <div class="switch_btn">
                    <span class="login_btn" :class="islogin ?'active' : ''" @click="login_btn">快速登录</span>
                     <span class="register_btn" @click="register_btn" :class="!islogin ?'active' : ''">快速注册</span>
                </div>
                <div class="content">
                    <div class="login_box" v-show="islogin"> 
                        <div>
                            <input class="username" v-model="name" type="text" placeholder="账号">
                        </div>
                        <div>
                            <input class="pwd" type="text" v-model="pwd" placeholder="密码">
                        </div>
                        <div class="submit" @click="login">
                            登录
                        </div>
                        <div class="register">
                            注册
                        </div>
                    </div>
                      <div class="register_box" v-show="!islogin">
                         <div>
                            <input class="username" type="text" v-model="name" placeholder="账号">
                        </div>
                        <div>
                            <input class="pwd" type="text" v-model="pwd" placeholder="密码">
                        </div>
                        <div>
                            <input class="repwd" type="text" v-model="repwd" placeholder="请确认密码">
                        </div>
                        <div class="submit">
                            注册
                        </div>
                        <div class="register">
                            登录
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="foot">
            浙ICP备05040830号&nbsp;&nbsp;&nbsp;地址：浙江省杭州市滨江区滨文路(310053)&nbsp;&nbsp;&nbsp;电话：0571-86613521(校办)&nbsp;&nbsp;&nbsp;FAX：0571-86613500
            <br><br>
            Copyright@1959-2016 first aid special website
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name:'',
            pwd:'',
            repwd:'',
            islogin:false
        }
    },
    created () {
        this.islogin = this.$route.params.login
        console.log(this.$route.params.login)
    },
    methods: {
        login_btn(){
            this.islogin = true
        },
        register_btn(){
            this.islogin = false
        },
        login(){
            if(!this.name) {
                this.$Message.error('请输入用户名！');
            } else if (!this.pwd) {
                this.$Message.error('请输入密码！');
            } else {
                
                this.$http.get('/api/login',{
                    params:{
                        name:this.name,
                        pwd:this.pwd
                    }
                }).then(data=>{
                    if(data.data.code){
                        this.$Message.info(data.data.message);
                        localStorage.setItem('userName',data.data.user.username)
                        localStorage.setItem('userToken',data.data.code)  
                        this.$store.dispatch('setUser',data.data.name)
                        if(data.data.user.isadmin){
                            this.$router.push({
                                name:'admin'
                            })
                            return
                        }
                        this.$router.push({
                            path:'/'
                        })
                    } else {
                        this.$Message.error(data.data.message);
                    }
                })

                this.name = ''
                this.pwd = ''
            }
        }
    }
}
</script>

<style lang='less'>
.login{
    .logo{
        margin: 20px auto;
        .logo_img{
            vertical-align: middle;
            margin-left: 100px;
    }
    }
    .text{
        font-family: 'Microsoft YaHei';
        font-weight: bold;
        font-size: 25px;
        color: #09CEFF;
    }
    .content_box{
        position: relative;
        width:100%;
        height:500px;
        background: #41AFD2;
        background-image: url('../assets/imgs/login.jpg');
        background-repeat: no-repeat;
        // background-size: 100% 100%;
        .login_bg{
            position: absolute;
            right: 250px;
            top: 50px;
            width: 310px;
            height: 348px;
            background-image: url('../assets/imgs/login-div-bg.png');
            background-size: 100% 100%;
            margin-top: 40px;
            .switch_btn{
                    height: 50px;
                    line-height: 50px;
                    margin-bottom: 30px;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                     font-size: 0;
                .login_btn,.register_btn{
                    width: 48%;
                    height: 55px;
                    display: inline-block;
                    font-size: 16px;
                    margin-top: 7px;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .active{
                    border-bottom: 3px solid #54ADC9;
                }
            }
            .content{
                padding-left: 40px;
                .login_box>div,.register_box>div{
                margin-top: 10px;

            }
            }
            .username,.pwd,.repwd{
                height: 40px;
                width: 250px;
                border: 1px #a5a5a5 solid;
                padding-left: 35px;
                border-radius: 5px;
                font-size: 14px;
                background-size: 18px 18px;
                background-repeat: no-repeat;
                background-position: 5px 10px;
            }
            .username{
                background-image: url('../assets/imgs/user.png');
            }
            .pwd,.repwd{
                background-image: url('../assets/imgs/pwd.png')
            }
            .submit,.register{
                line-height: 32px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                font-size: 14px;
                border-radius: 5px;
                background: #57A3F3;
                width: 250px;
                height: 45px;
                line-height: 45px;
                font-size: 18px;
                &:hover{
                    background: #C0D9EB;
                    color: #333;
                }
            }
        }
    }
    .foot{
        text-align: center;
        width: 100%;
        color: #999;
        padding-top: 30px;
        padding-bottom: 20px;
        font-size: 12px;
        position: relative;
    }
}
</style>