<template>
  <div>
    <classify-module title="付费精品" more="更多连接" :grid="3" :gap="20">
      <strip v-for="item of topList" :key="item.id">
        <img :src="item.picUrl" alt="">
        <div class="info">
          <p class="name">{{item.name}}</p>
          <p class="desc">{{item.rcmdText}}</p>
          <p class="title">{{item.lastProgramName}}</p>
          <p class="price">￥ {{item.originalPrice / 100}}</p>
        </div>
      </strip>
    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "../../components/public/classifyModule"
  import strip from "../../components/public/strip"

  import {getToplistPay} from "../../netWork/index/requests"

  export default {
    name: "listen",
    data() {
      return {
        topList: []
      }
    },
    created() {
      getToplistPay({size: 6})
        .then(data => {
          this.topList = data.data.list
        })
        .catch(error => {
          this.$message.error("获取付费精品电台失败， 请打开控制提查看报错信息")
          console.error(error)
        })
    },

    components: {
      classifyModule,
      strip
    }
  }
</script>

<style lang="less" scoped>
  .strip {
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-column-gap: 20px;
    /*padding: 10px;*/

    img {
      width: 150px;
      height: 150px;
    }

    .info {
      font-size: 12px;

      .name {
        font-size: 14px;
      }

      .desc,
      .title {
        color: grey;
      }

      .price {
        font-size: 15px;
        color: #af0000;
      }

    }

  }

</style>
