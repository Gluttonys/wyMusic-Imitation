<template>
  <div class="song">
    <div class="song-img">
      <img :src="musicInfo.mPic" alt="音乐图片">
    </div>
    <div class="name">
      <span>{{musicInfo.mName}}</span>
    </div>
    <div class="heard">
      <span class="iconfont icon-xin"></span>
    </div>
    <div class="author">
      <span>{{musicInfo.mAuthor}}</span>
    </div>

    <div class="share">
      <span class="iconfont icon-fenxiang"></span>
    </div>
  </div>
</template>

<script>

  // 组件传值 bus
  import eventBus from "../../globalBus/eventBus.js"
  import {informChangeMusic} from "../../globalBus/events"

  // 获取轮播图请求
  // import {getRotation} from "../netWork/index/requests"

  export default {
    name: "songBlock",
    data() {
      return {
        musicInfo: {
          mId: 0,
          mPic: "http://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
          mName: "未名歌曲",
          mAuthor: "佚名"
        }
      }
    },
    created() {

      // 通过单机别处的歌曲，  更改此处的正在播放
      eventBus.$on("getMusic", _options => {
        this.musicInfo = _options
        // 通知底下的控制条该换歌了  并传入该歌曲的数据
        informChangeMusic(this.musicInfo)
      })

      // 初始化界面的第一首歌, 后期优化
      // getRotation().then(data => {
      //   if (data.code >= 200 && data.code < 300 || data.code === 304) {
      //     let first = data.data[0]
      //     this.musicInfo = {
      //       mId: first.id,
      //       mPic: first.album.blurPicUrl,
      //       mName: first.name,
      //       mAuthor: first.album.artists[0].name
      //     }
      //     informChangeMusic(this.musicInfo)
      //   }
      // }).catch(error => {
      //   this.$message.error("获取推荐歌曲失败， 请打开控制台查看错误日志")
      //   console.error(error)
      // })

    },
  }
</script>

<style lang="less" scoped>

  .song {
    padding: 10px;
    display: grid;
    border-top: 1px solid #bbbbbb;
    grid-template-rows: repeat(2, 30px);
    grid-template-columns: 60px 195px 25px;
    grid-template-areas: "img name heard" "img author share";

    align-items: center;
    font-weight: 200;

    .song-img {
      grid-area: img;

      img {
        height: 60px;
        width: 60px;
        cursor: pointer;
      }
    }

    .name {
      grid-area: name;
      margin-left: 1em;
      max-width: 8em;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .author {
      grid-area: author;
      margin-left: 1em;
    }

    .heard {
      grid-area: heard;
      cursor: pointer;
    }

    .share {
      cursor: pointer;
      grid-area: share;
    }
  }


</style>
