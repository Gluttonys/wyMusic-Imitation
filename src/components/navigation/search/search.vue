<template>
  <div class="search-input">

    <div class="back">
      <span class="iconfont icon-103fangxiang_xiangzuo"></span>
    </div>

    <div class="go">
      <span class="iconfont icon-101fangxiang_xiangyou"></span>
    </div>

    <div class="search-input__wrapper">
      <input ref="input" type="text" :placeholder="defaultPlAceHolderObj.showKeyword" @click="drawer = true">
      <span class="iconfont icon-sousuo"></span>
    </div>

    <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            direction="ttb"
            :with-header="false"
            size="37%"
            :before-close="handleClose">
      <div class="search-inner">

        <div class="real-input-block">
          <input type="text" v-model="inputWords" :placeholder="defaultPlAceHolderObj.showKeyword"
                 @keydown.enter="submit(inputWords)">
          <p>热门搜索</p>
          <div class="hot-search">
            <span class="item" v-for="(hot, index) of hots" :key="index">
              {{hot.first}}
            </span>
          </div>
          <p>历史记录</p>
          <div class="history-tags">
            <el-tag type="info" closable v-for="his in localStorageObj" :key="his">
              {{his}}
            </el-tag>
          </div>


        </div>

        <div class="search-result">
          <p>搜索结果</p>
        </div>

        <div class="hot-list">
          <p>热搜榜</p>
        </div>

      </div>

    </el-drawer>

  </div>
</template>

<script>

  // 工具方法， 获取， 设置， 删除 指定 localStorage
  import {getLocalStorageObj, setHistoryForWY, delHistoryForXY} from "@/tools/tools"

  // 搜索的网路数据请求
  import {getHotSearch, getDefaultKeyWord, getResult} from "@/netWork/navigationBar/requests"

  // 搜索类型数据
  import {searchType} from "@/localData"

  export default {
    name: "search",
    props: {},
    data() {
      return {
        // 控制抽屉开启的标志
        drawer: false,
        // 本地的 历史搜索记录对象
        localStorageObj: getLocalStorageObj(),
        // 热门搜索列表
        hots: [],
        // 默认的搜索框搜索内容，也就是 placeHolder
        defaultPlAceHolderObj: {},
        // 搜索框数据绑定的元素
        inputWords: ""
      }
    },
    methods: {
      handleClose(done) {
        // 关闭抽屉
        done()
      },
      // 搜索框的提交事件
      submit(keyWord) {
        if (keyWord.trim()) {
          getResult({
            keywords: keyWord,
            type: searchType.all
          })
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              this.$message.error("获取搜索结果失败， 请打开控制台查看错误日志")
              console.error(error)
            })
        }
      }
    },
    mounted() {
      getHotSearch()
        .then(data => {
          this.hots = data.result.hots
        })
        .catch(error => {
          this.$message.error("获取搜索热榜失败，请打开控制台查看报错信息")
          console.error(error)
        })

      getDefaultKeyWord()
        .then(data => {
          this.defaultPlAceHolderObj = data.data
        })
        .catch(error => {
          this.$message.error("获取默认搜索内容失败， 请打开控制台查看错误日志")
          console.error(error)
        })
    }
  }
</script>

<style lang="less" scoped>
  @import "_search.less";
</style>
