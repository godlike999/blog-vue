<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <router-link to="/" active-class="active">
                        <Menu-item name="1">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">首页</span>
                        </Menu-item>
                    </router-link>
                    <router-link to="/user">
                        <Menu-item name="2">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">用户</span>
                        </Menu-item>
                    </router-link>
                    <router-link to="/cate">
                        <Menu-item name="3">
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            <span class="layout-text">分类</span>
                        </Menu-item>
                    </router-link>
                    <router-link to="/blog">
                        <Menu-item name="4">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">日志</span>
                        </Menu-item>
                    </router-link>
                    <router-link to="/comment">
                        <Menu-item name="5">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">评论</span>
                        </Menu-item>
                    </router-link>
                    <router-link to="/upload">
                        <Menu-item name="6">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">上传</span>
                        </Menu-item>
                    </router-link>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            }
        }
    }
</script>

<style scoped>
	.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .active li span{
        color:#f00;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
