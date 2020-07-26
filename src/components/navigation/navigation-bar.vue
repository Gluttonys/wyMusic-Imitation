<template>
  <nav>
    <!-- logo区域 -->
    <div class="logo">
      <span class="iconfont icon-yinlemusic214"></span>
      <span>网易云音乐</span>
    </div>
    <!-- 搜索框区域 -->
    <search></search>

    <!--<div class="search-input">-->

    <!--<div class="back">-->
    <!--<span class="iconfont icon-103fangxiang_xiangzuo"></span>-->
    <!--</div>-->

    <!--<div class="go">-->
    <!--<span class="iconfont icon-101fangxiang_xiangyou"></span>-->
    <!--</div>-->

    <!--<div class="search-input__wrapper">-->
    <!--<input type="text" placeholder="搜索音乐、视频、歌词、电台">-->
    <!--<span class="iconfont icon-sousuo"></span>-->
    <!--</div>-->
    <!--</div>-->

    <!-- 工具栏 个人信息头像 -->
    <div class="tools">

      <div class="tool">
        <img class="avatar" :src="defaultUserInfo.avatar_img_path" alt="user avatar">
        <!--<img class="avatar" src="../assets/imgs/noLogin.png" alt="user avatar">-->
      </div>
      <div class="tool">
        <div class="avatar-part">
          <span class="username" @click="login">{{defaultUserInfo.username}}</span>
          <span class="iconfont icon-102fangxiang_xiangxia"></span>
        </div>
      </div>
      <div class="tool">
        <span class="vip">开通VIP</span>
      </div>
      <div class="tool">
        <span class="iconfont icon-yifu"></span>
      </div>
      <div class="tool">
        <span class="iconfont icon-youxiang"></span>
      </div>
      <div class="tool">
        <span class="iconfont icon-shezhi"></span>
      </div>
    </div>

    <el-dialog
            title="请登录"
            :visible.sync="loginForm"
            width="30%">

      <el-form :inline="true"
               :model="LoginFormUser"
               class="demo-form-inline"
               label-position="right"
               label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="LoginFormUser.form_username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="LoginFormUser.form_password" placeholder="密码"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="loginForm = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </nav>

</template>


<script>

  import search from "./search/search"

  import {informLoged} from "../../globalBus/events"

  import {getUserLogin} from "../../netWork/navigationBar/requests"

  export default {
    name: "navigationBar",
    components: {
      search
    },
    data() {
      return {
        // 模态框的显示控制标志
        loginForm: false,
        // 登录表单
        LoginFormUser: {
          form_username: "13685586718",
          form_password: "15935724086xsz"
        },
        // 登录提交返回数据
        loginResponseData: null,
        // 信息默认值
        defaultUserInfo: {
          avatar_img_path: "https://www.helloimg.com/images/2020/06/18/noLogin04679a08ac06f40d.png",
          username: "请登录"
        }
      }
    },
    methods: {
      // 打开模态框
      login() {
        this.loginForm = !this.loginForm
      },
      // 提交登录
      submit() {
        getUserLogin({
          phone: this.LoginFormUser.form_username,
          password: this.LoginFormUser.form_password
        }).then(
          data => {
            if (data.code === 200) {
              // 保存请求数据
              this.loginResponseData = data.profile
              // 设置更改头像
              this.defaultUserInfo.avatar_img_path = this.loginResponseData.avatarUrl || this.defaultUserInfo.avatar_img_path
              this.defaultUserInfo.username = this.loginResponseData.nickname || this.defaultUserInfo.username

              // 提示用户登录成功
              this.$message.success("登录成功！")

              // 存储token
              window.sessionStorage.setItem("token", data.cookie)
              // 登录成功后关闭模态框的打开
              // 重置login方法

              // 再 vuex 中存储 用户id 和 用户名
              this.$store.commit("setUid", data.account.id)
              this.$store.commit("setUname", this.defaultUserInfo.username)

              // 使用bus触发侧边栏请求更新音乐列表
              // 通知登录成功
              informLoged()
            }
          }
        ).catch(reason => {
          this.$message.error("登录失败， 请打开控制台查看错误信息")
          console.error(reason)
        }).finally(() => this.loginForm = false)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../public/scss/main";

  nav {
    height: 100%;
    width: 100%;
    background-color: $color-main;
    padding: 0 25px;
    box-sizing: border-box;
    color: white;

    display: grid;
    grid-template-rows: 60px;
    grid-template-columns: 240px 1fr 2fr;

    .logo {
      span {
        font-size: 24px;
        line-height: 60px;
        cursor: pointer;
      }

      span:last-child {
        margin-left: 16px;
        letter-spacing: 2px;
        font-weight: 200;
      }
    }

    .tools {
      place-self: center end;

      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: rgba(156, 150, 155, 0.8);
      }

      .tool:not(:first-child) {
        transform: translateY(-15px);
      }

      .tool {
        display: inline-block;
        margin: 0 12px;
        cursor: pointer;
        color: #bcbcbc;
        font-weight: 100;
        transition: 0.3s;
        vertical-align: center;
      }

      .tool:hover {
        color: #ffffff;
        transition: 0.3s;
      }

      .username {
        margin-right: 16px;
      }

    }

    .el-dialog__wrapper {
      z-index: 99999 !important;
    }

    .input {
      margin: 2em 0;
    }

  }
</style>
