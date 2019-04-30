<template>
    <div class="admin_index">
        <div class="left_content">
            <div class="title">后台管理系统</div>
            <Menu theme="light" style="width:200px">
                <router-link to='user'>
                    <MenuItem name="1">
                        <Icon type="ios-paper" />
                        用户管理
                    </MenuItem>
                </router-link>
                <router-link to='method'>
                    <MenuItem name="2">
                        <Icon type="ios-paper" />
                        急救及预防管理
                    </MenuItem>
                </router-link>
                <router-link to='news'>
                    <MenuItem name="3">
                        <Icon type="ios-stats" />
                        新闻管理
                    </MenuItem>
                 </router-link>
                  <router-link to='commet'>
                    <MenuItem name="4">
                        <Icon type="ios-stats" />
                        留言管理
                    </MenuItem>
                 </router-link>
                <!-- <Submenu name="6">
                    <template slot="title">
                        <Icon type="ios-people" />
                        留言管理
                    </template>
                    <MenuItem name="6-1">新增用户</MenuItem>
                    <MenuItem name="6-2">活跃用户</MenuItem>
                </Submenu> -->
            </Menu>
        </div>
       <div class="right_content">
           <div class="user_info">
               
           </div>
            <div class="content">
                <router-view/>
            </div> 
       </div>
    </div>
</template>
<script>
import user from '../components/method.vue'
    export default {
        data () {
            return {
            }
        },
        components:{
            user
        }
    }
</script>
<style lang='less'>
.admin_index{
    height: 1050px;
    .left_content{
        float: left;
        height: 100%;
        width: 200px;
        .title{
            margin: 20px auto;
            text-align: center;
            color: #DEDEDE;
        }
        .ivu-menu{
            position: static !important;
        }
    }
    .right_content{
        margin-left: 200px;
        background-color: #F7F9FB;
        height: 100%;
        .user_info{
            height: 30px;
            background: #F6D522;
            margin-bottom: 100px;
        }
        .content{
            padding-left: 100px;
        }
        }
    }
</style>
