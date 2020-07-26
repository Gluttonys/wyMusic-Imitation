<template>
  <div>
    <classify-module title="推荐MV" more="连接地址" :grid="4">

      <div class="block-decorate" v-for="mv of mvList" :key="mv.id">

        <div class="play-size"><span class="iconfont icon-yinle"></span> {{getFormatNumber(mv.playCount)}}</div>

        <div class="mask">{{mv.copywriter}}</div>

        <block :imgUrl="mv.picUrl">
          <span class="mv-name">{{mv.name}}</span>
          <span class="mv-artist-name">{{mv.artistName}}</span>
        </block>
      </div>

    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "../../components/public/classifyModule"
  import block from "../../components/public/block"

  import {getRecommendMV} from "../../netWork/index/requests"

  import {formatBigNumber} from "../../tools/tools"

  export default {
    name: "recommendedMV",
    components: {
      classifyModule,
      block
    },
    data() {
      return {
        mvList: []
      }
    },
    created() {
      getRecommendMV()
        .then(data => {
          this.mvList = data.result
        })
        .catch(error => {
          this.$message.error("获取推荐MV失败， 请打开控制台查看报错信息")
          console.error(error)
        })
    },
    methods: {
      getFormatNumber(number) {
        return formatBigNumber(number)
      }
    }
  }
</script>

<style lang="less" scoped>

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

    .play-size {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.2em 1.5em;
      background: linear-gradient(to right, rgba(255, 255, 255, 0.01), rgba(77, 77, 77, 0.7));
      color: #ffffff;
      font-size: 14px;
    }

    .mask {
      position: absolute;
      top: -100px;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0.5em 0.5em;
      font-size: 13px;
      width: 100%;
      letter-spacing: 2px;
    }

    .mv-name {
      display: block;
      font-size: 14px;
      margin: 5px 0;
    }

    .mv-artist-name {
      display: block;
      font-size: 12px;
      color: grey;
    }

  }

</style>
