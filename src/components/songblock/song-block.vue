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

  import {getInfoMusic, checkMusic} from "../../netWork/footerControl/requests"

  import {informChangeMusic} from "../../globalBus/events"

  import {inError} from "../../tools/tools"

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
    mounted() {
      // 通过单机别处的歌曲，  更改此处的正在播放
      eventBus.$on("getMusic", mID => {

        // 获取歌曲详细信息， 类如歌曲名， 歌手， 首图等
        getInfoMusic(mID)
          .then(data => {

            if (data['privileges'][0]['pl']) {
              this.musicInfo.mId = mID
              this.musicInfo.mPic = data["songs"][0]["al"]["picUrl"]
              this.musicInfo.mName = data["songs"][0]["name"]

              //   因为一首歌可能不止一个人唱, 所以需要处理一下
              this.musicInfo.mAuthor = ""
              data["songs"][0]["ar"].forEach(ar => this.musicInfo.mAuthor += "  " + ar["name"])
            } else {
              this.$message.warning("该歌曲付费后才能听！！！")
            }
          })
          .catch(error => {
            inError.call(this, "歌曲信息", error)
          })
        // 通知底下的控制条该换歌了  并传入该歌曲的数据
        informChangeMusic(mID)
      })
    },
  }
</script>

<style lang="scss" scoped>

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
