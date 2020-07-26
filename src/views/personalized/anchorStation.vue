<template>
  <div>
    <classify-module title="主播电台" more="连接地址" :grid="6">
      <div class="block-decorate" v-for="item in recommendDj" :key="item.id">
        <block :imgUrl="item.picUrl">{{item.copywriter}}</block>
      </div>

    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "../../components/public/classifyModule"
  import block from "../../components/public/block"

  import {getAnchorStation} from "../../netWork/index/requests"

  export default {
    name: "anchorStation",
    components: {
      classifyModule,
      block
    },
    data() {
      return {
        recommendDj: []
      }
    },
    created() {
      getAnchorStation({size: 6})
        .then(data => {
          this.recommendDj = data.djRadios
        }).catch(error => {
        this.$message.error("获取推荐电台主播失败， 请打开控制台查看具体的错误日志")
        console.error(error)
      })
    }
  }
</script>

<style lang="less" scoped>
</style>
