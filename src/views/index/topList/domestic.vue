<template>
  <div class="domestic">
    <classify-module title="官方榜" no-more :grid="4">
      <rank-block :more="`/songList/${list.id}`" :id="list.id" v-for="list of rankOfSongList" :key="list.id"></rank-block>
    </classify-module>

  </div>
</template>

<script>

  import classifyModule from '../../../components/public/classifyModule'
  import rankBlock from './rankBlock'

  import {getToplist} from "../../../netWork/index/requests"

  export default {
    name: "domestic",
    data() {
      return {
        rankOfSongList: []
      }
    },
    components: {
      classifyModule,
      rankBlock
    },
    created() {
      getToplist()
        .then(data => {
          this.rankOfSongList = data.list.slice(0, 10)
        })
        .catch(error => {
          this.$message.error("获取排行榜名单失败， 请打开控制条查看错误日志")
          console.error(error)
        })
    }
  }
</script>

<style lang="less" scoped>



</style>
