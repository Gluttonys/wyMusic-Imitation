<template>
  <div class="wrapper">

    <classify-module title="独家放送" more="连接地址" :grid="4">

      <div class="block-decorate" v-for="item of soleList" :key="item.id">
        <div class="video-icon"><span class="iconfont icon-shipin"></span></div>
        <block :img-url="item['sPicUrl']">{{item.name}}</block>
      </div>

    </classify-module>

  </div>
</template>

<script>

  import classifyModule from "../../../components/public/classifyModule"
  import block from "../../../components/public/block"

  import {getSole} from "../../../netWork/index/requests"

  export default {
    name: "sole",
    components: {
      classifyModule,
      block
    },
    data() {
      return {
        soleList: []
      }
    },
    created() {
      getSole({size: 4})
        .then(data => {
          this.soleList = data.result
        })
        .catch(error => {
          this.$message.error("获取独家放送失败， 请打开控制台查看报错信息")
          console.error(error)
        })

    }
  }
</script>

<style lang="less" scoped>

  .block-decorate {
    position: relative;

    .video-icon {
      position: absolute;
      top: 5px;
      left: 5px;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      line-height: 25px;
      text-align: center;
      color: #ffffff;
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      border: 1px solid grey;
      z-index: 9999;
    }

  }

</style>
