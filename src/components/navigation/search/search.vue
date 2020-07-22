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
          <input type="text" v-model="inputWords"
                 :placeholder="defaultPlAceHolderObj.showKeyword"
                 @input="submit(inputWords)">
          <h4>热门搜索</h4>
          <div class="hot-search">
            <span class="item" v-for="(hot, index) of hots" :key="index">
              {{hot.first}}
            </span>
          </div>
          <h4>历史记录</h4>
          <div class="history-tags">
            <el-tag type="info" closable v-for="his in localStorageObj" :key="his">
              {{his}}
            </el-tag>
          </div>
        </div>

        <div class="result">
          <h4 class="search-text" v-show="inputWords">
            <p>搜索<span style="color: #b3330d;">"{{inputWords}}"</span>的相关结果</p>
          </h4>
          <div class="detail" v-show="inputWords">

            <el-divider content-position="left">单曲</el-divider>
            <div class="songs-strip" v-if="searchResult">
              <strip v-for="song of searchResult.song.songs">
                <div class="strip-inner">
                  <img :src="song.al.picUrl" alt="">
                  <p class="song-name">{{song.name}}</p>
                  <p class="author-name">{{song.ar[0].name}}</p>
                </div>
              </strip>
            </div>

            <el-divider content-position="left">专辑</el-divider>
            <div class="albums-strip" v-if="searchResult">
              <strip v-for="album of searchResult.album.albums">

                <div class="strip-inner">
                  <img :src="album.blurPicUrl" alt="">
                  <p class="song-name">{{album.name}}</p>
                  <p class="author-name">{{album.artist.name}}</p>
                </div>

              </strip>
            </div>
          </div>
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

  // 导入条形组件
  import strip from "@/components/strip"

  export default {
    name: "search",
    props: {},
    components: {
      strip
    },
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
        inputWords: "",
        // 搜索结果对象
        searchResult: null,

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
              this.searchResult = data.result
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
