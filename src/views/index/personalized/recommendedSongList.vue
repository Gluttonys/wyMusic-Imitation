<template>
  <div>
    <!-- 推荐歌单 分类模块 -->
    <classify-module title="推荐歌单" more="playlist" :grid="6" @click="handleMore">

      <div class="block-decorate" v-for="list of songList" :key="list.id">
        <div class="play-size">
          <span class="iconfont icon-yinle"></span>
          {{formatBigNumber(list["playCount"])}}
        </div>

        <div class="mask">{{list["copywriter"]}}</div>

        <router-link :to="`/songList/${list.id}`">
          <block :imgUrl="list['picUrl']">{{list.name}}</block>
        </router-link>

      </div>
    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "../../../components/public/classifyModule"
  import block from "../../../components/public/block"

  import {formatBigNumber} from "../../../tools/tools"
  import {inError} from "../../../tools/tools"
  import {getRecommendSongList} from "../../../netWork/index/requests"

  export default {
    name: "recommendedSongList",
    data() {
      return {
        songList: []
      }
    },
    components: {
      classifyModule,
      block
    },
    created() {
      getRecommendSongList({size: 12})
        .then(data => this.songList = data.result)
        .catch(error => inError.call(this, "个性推荐歌单", error))
    },
    methods: {
      formatBigNumber,
      handleMore(activeBar) {
        this.$store.commit("setCurrentTab", activeBar)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .block-decorate {
    position: relative;
    overflow: hidden;
    transition: 0.3s;

    &:hover {
      .mask {
        transition: top 0.3s 0.5s;
        top: 0;
      }

      .play-size {
        transition: top 0.3s 0.5s;
        top: -50px;
      }
    }

    /* 播放量 */

    .play-size {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.2em 1.5em;
      background: linear-gradient(to right, rgba(255, 255, 255, 0.01), rgba(77, 77, 77, 0.7));
      color: #ffffff;
      font-size: 14px;
      z-index: 9999;
    }

    .mask {
      position: absolute;
      top: -100px;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0.5em 0.5em;
      font-size: 13px;
      width: 100%;
      letter-spacing: 1px;
      z-index: 9999;
    }

  }

</style>
