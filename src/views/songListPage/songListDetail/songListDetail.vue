<template>
  <div class="songListDetail">
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="歌曲列表" name="list" lazy>
        <strip v-for="(music, index) in musicList" :key="music['id']">
          <div class="strip__inner" :class="{vip: isVip(index)}">
            <div class="strip__inner__index">
              {{(index + 1).toString().padStart(2, "0")}}
            </div>

            <div class="strip__inner__like">
              <span class="iconfont icon-xin"></span>
            </div>

            <div class="strip__inner__download">
              <span class="iconfont icon-xiazai"></span>
            </div>

            <div class="strip__inner__name" @click="informGetMusic(music.id)">
              {{music.name}}
              <span class="strip__inner__name__desc" v-if="music['alia'][0]">
                ({{music['alia'][0]}})
              </span>
            </div>

            <div class="strip__inner__singer">
              {{music["ar"][0]["name"]}}
            </div>

            <div class="strip__inner__album">
              {{music["al"]["name"]}}
            </div>

            <div class="strip__inner__time">
              {{formatMillisecond(music["dt"])}}
            </div>

          </div>
        </strip>
      </el-tab-pane>

      <el-tab-pane :label="`评论(${commandTotal})`" name="command" lazy>

        <command-strip
                v-for="command in commandList"
                :command-data="command"
                :key="command['commentId']">
        </command-strip>

      </el-tab-pane>

      <el-tab-pane label="收藏者" name="collector" lazy>
        <classify-module noMore noTitle :grid="6" :gap="20">
          <block
                  v-for="coll in collectors"
                  :key="coll['userId']"
                  :imgUrl="coll['avatarUrl']">
            {{coll["nickname"]}}
          </block>
        </classify-module>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>

  // 使用到的组件
  import strip from "../../../components/public/strip"
  import commandStrip from "../../../components/public/commandStrip/commandStrip"
  import classifyModule from "../../../components/public/classifyModule"
  import block from "../../../components/public/block"

  // 用于组件间传值的 bus
  import eventBus from "../../../globalBus/eventBus"
  import {informGetMusic} from "../../../globalBus/events"

  // 网络请求方法
  import {
    getMusic,
    getPlaylistCommand,
    getCollector
  } from "../../../netWork/songList/requests"

  // 工具方法, 格式化一个毫秒时间
  import {
    formatMillisecond,
    inError
  } from "../../../tools/tools"

  export default {
    props: {
      id: {
        type: [Number, String],
        require: true
      }
    },
    data() {
      return {
        ids: [],
        musicList: [],
        // 默认显示的音乐列表
        activeName: "list",
        // Vip列表， 用于判定是否是付费歌曲的
        vipList: [],
        // 评论相关
        commandOffset: 1,
        commandList: [],
        commandTotal: 0,
        // 收藏者相关
        collectOffset: 1,
        collectors: []
      }
    },
    created() {
      eventBus.$on("getIDs", _trackIds => {
        _trackIds.forEach(item => {
          this.ids.push(item["id"])
        })
        // 网络请求， 获取音乐列表
        getMusic({ids: this.ids.join(",")})
          .then(data => {
            this.vipList = data["privileges"]
            // 这里需要做一下懒加载（下滑加载更多）优化
            this.musicList = data["songs"]
          })
          .catch(error => {
            inError.call(this, "音乐列表", error)
          })
      })

      eventBus.$on("getCommandCount", _commandCount => {
        this.commandTotal = _commandCount
      })

    },
    methods: {
      handleClick(tab, event) {
        let {name} = tab
        if (name === "command") {
          // 当滑块移动到评论区域时候
          this.getCommand
        } else if (name === "collector") {
          this.getCollect
        }
      },
      formatMillisecond,
      informGetMusic
    },
    computed: {
      getCommand() {
        // 异步请求获取评论， 并缓存评论
        getPlaylistCommand({
          id: this.id,
          limit: 50,
          offset: this.commandOffset
        })
          .then(data => {
            console.log(data)
            this.commandList = data["comments"]
          })
          .catch(error => {
            inError.call(this, "评论", error)
          })
      },
      getCollect() {
        getCollector({
          id: this.id,
          limit: 42,
          offset: this.collectOffset
        })
          .then(data => {
            console.log("songlist/songlistdetail", data)
            this.collectors = data["subscribers"]
          })
          .catch(error => {
            inError.call(this, "收藏者", error)
          })
      },
      isVip() {
        return (index) => {
          return !this.vipList[index]['pl']
        }
      }
    },
    components: {
      block,
      classifyModule,
      strip,
      commandStrip
    }
  }
</script>


<style lang="scss" scoped>
  @import "songListDetail";
</style>
