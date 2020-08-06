<template>
  <div class="music-items-block">
    <div class="strip-desc" v-for="(music, index) of musicList" :key="music.id">
      <strip>
        <div class="music-inner">
          <!-- 排名 -->
          <div class="order">
            {{index + 1}}
          </div>
          <!-- 歌曲展示图片 -->
          <div class="pic">
            <img :src="music.album['blurPicUrl']" alt="">
          </div>
          <!-- 歌曲名 -->
          <div class="name" @click="informGetMusic(music.id)">
            {{music.name}}
          </div>
          <!-- 歌手名 -->
          <div class="author">
            {{music['artists'][0].name}}
          </div>
          <!-- 专辑名称 -->
          <div class="copy-write">
            {{music.album.name}}
          </div>

          <!-- 音乐时长 -->
          <div class="long">
            {{formatMillisecond(music.mMusic.playTime)}}
          </div>

        </div>
      </strip>
    </div>
  </div>
</template>

<script>

  import strip from "../../../components/public/strip"
  import {informGetMusic} from "../../../globalBus/events"
  import {getRecentMusic} from "../../../netWork/index/requests"
  import {formatMillisecond} from "../../../tools/tools"

  export default {
    name: "musicItemsBlock",
    components: {
      strip,
    },
    data() {
      return {
        type: 0,
        musicList: []
      }
    },
    created() {
      getRecentMusic({type: this.type})
        .then(data => {
          this.musicList = data.data
        })
        .catch(error => {
          this.$message.error("获取最新歌曲失败， 请打开控制台查看报错信息")
          console.error(error)
        })
    },
    methods: {
      formatMillisecond,
      informGetMusic
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../../assets/scss/main";

  .music-items-block {
    margin: 1em 3em;
    border: 1px solid #ededf0;
    min-height: 800px;

    .strip-desc {

      .music-inner {
        display: grid;
        grid-template-columns: 5% 5% auto 15% 25% 10%;
        grid-gap: 15px;
        align-items: center;
        padding: 0.3em 0;
        font-weight: 100;

        .order {
          justify-self: center;
          color: $color-text-hover;
        }

        .pic {
          align-self: center;

          img {
            width: 100%;
          }
        }

        .long {
          color: $color-text;
        }
      }

    }


  }

</style>
