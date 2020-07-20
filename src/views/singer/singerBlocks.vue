<template>
  <div class="singer-blocks">
    <classify-moudle no-more no-title :grid="6">
        <div class="block-decorate" v-for="singer of allSinger" :key="singer.id">
          <block :img-url="singer.picUrl">
            {{singer.name}}
          </block>
        </div>
    </classify-moudle>


  </div>
</template>

<script>

  import classifyMoudle from '../../components/classifyModule'
  import block from '../../components/block'

  import {getTopSingers} from "../../netWork/index/requests"

  export default {
    name: "singerBlocks",
    components: {
      classifyMoudle,
      block
    },
    data() {
      return {
        allSinger: []
      }
    },
    created() {
      getTopSingers({})
        .then(data => {
          this.allSinger = data.artists
        })
        .catch(error => {
          this.$message.error("获取歌手列表失败， 请打开控制台查看报错信息")
          console.error(error)
        })
    }
  }
</script>

<style lang="less" scoped>

  .singer-blocks {

  }

</style>
