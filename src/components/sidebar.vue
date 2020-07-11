<template>
  <div class="aside">

    <div class="blocks">
      <div class="block">
        <div class="title">
          <span>推荐</span>
        </div>
        <ul>
          <li>
            <span class="iconfont icon-yinle1"></span>
            <span>发现音乐</span>
          </li>
          <li>
            <span class="iconfont icon-vynil"></span>
            <span>私人FM</span>
          </li>
          <li>
            <span class="iconfont icon-shipin"></span>
            <span>LOOK直播</span>
          </li>
          <li>
            <span class="iconfont icon-02"></span>
            <span>视频</span>
          </li>
          <li>
            <span class="iconfont icon-pengyou"></span>
            <span>朋友</span>
          </li>
        </ul>
      </div>

      <div class="block">
        <div class="title">
          <span>我的音乐</span>
        </div>
        <ul>
          <li>
            <span class="iconfont icon-erji"></span>
            <span>本地音乐</span>
          </li>
          <li>
            <span class="iconfont icon-xiazai"></span>
            <span>下载管理</span>
          </li>
          <li>
            <span class="iconfont icon-yun"></span>
            <span>我的音乐云盘</span>
          </li>
          <li>
            <span class="iconfont icon-shoucangjia"></span>
            <span>我的收藏夹</span>
          </li>
        </ul>
      </div>

      <div class="block">
        <div class="title">
          <span>创建的歌单</span>
        </div>
        <ul>
          <li v-for="list of myPlayList" :key="list.id">
            <span class="iconfont icon-yinleliebiao"></span>
            <span>{{list.name}}</span>
          </li>
        </ul>
      </div>

      <!-- 收藏的歌单 -->
      <div class="block">
        <div class="title">
          <span>收藏的歌单</span>
        </div>
        <ul>

          <li v-for="list of collectPlayList" :key="list.id">
            <span class="iconfont icon-xin"></span>
            <span>{{list.name}}</span>
          </li>

        </ul>
      </div>
    </div>

    <song-block></song-block>

  </div>
</template>

<script>

  // 网络请求
  import {getPlayList} from "../netWork/sidebar/requests"

  import eventBus from "../globalBus/eventBus.js"
  import SongBlock from "./song-block"

  export default {
    name: "sidebar",
    components: {SongBlock},
    data() {
      return {
        // 全部歌单 {我创建的 ， 收藏的}
        playList: [],
        // 我创建的歌单
        myPlayList: [],
        // 我收藏的歌单
        collectPlayList: []
      }
    },
    created() {
      eventBus.$on("isLogined", () => {

        getPlayList({uid: this.$store.state.uid}).then(data => {
          this.playList = data.playlist

          // 过滤歌单， 是我得歌单， 还是收藏的歌单
          for (let listItem of this.playList) {
            if (listItem.creator.nickname === this.$store.state.uname) {
              // 昵称相同，是自己的
              this.myPlayList.push(listItem)
            } else {
              // 昵称不同， 是收藏的歌单
              this.collectPlayList.push(listItem)
            }
          }
        }).catch(reason => {
          console.error(reason)
        })

      })
    },
    methods: {}

  }
</script>

<style lang="less" scoped>
  .aside {
    height: 100%;
    width: 100%;
    font-weight: 100;
    overflow: auto;

    .blocks {
      height: calc(100% - 81px);
      overflow: auto;

      .block {
        margin: 1em 0 1.5em 1.5em;
        .title {
          color: #6a6a6a;
        }

        ul {
          list-style: none;
          margin: 10px 0 0;
          padding: 0 10px;

          li {
            line-height: 2em;
            cursor: pointer;
            color: #6a6a6a;
            transition: 0.3s;

            span.iconfont {
              font-size: 1.3em;
              margin-right: 0.5em;
            }

            span:last-child {
              line-height: 1.3em;
              vertical-align: center;
            }
          }

          li:hover {
            color: #282828;
            transition: 0.3s;
          }

        }

      }
    }




  }


</style>
