<template>
  <div>

    <div class="search">
      <div class="all-type">全部分类</div>

      <span>热门分类</span>
      <span v-for="type of hotType" :key="type.id" class="hot-type">
        {{type.name}}
      </span>
    </div>

    <classify-module title="" :grid="6" noMore>

      <div class="block-decorate" v-for="songList of currentSongSheetList" :key="songList.id">
        <block :imgUrl="songList.coverImgUrl">
          {{songList.name}}
        </block>
      </div>

    </classify-module>

  </div>
</template>

<script>

  import classifyModule from "../components/public/classifyModule"
  import block from "../components/public/block"

  import {getAllType, getHotType, getAllSongSheet} from "../netWork/index/requests"

  export default {
    name: "songSheet",
    data() {
      return {
        allType: [],
        hotType: [],
        currentSongSheetList: []
      }
    },
    components: {
      classifyModule,
      block
    },
    created() {
      getHotType().then(data => {
        this.hotType = data.tags
      }).catch(error => {
        this.$message.error("获取热门分类失败， 请打开控制台查看错误日志")
        console.error(error)
      })

      getAllSongSheet({
        size: 102,
        offset: 1
      }).then(data => {
        this.currentSongSheetList = data.playlists
      }).catch(error => {
        this.$message.error("获取全部歌单失败， 请打开控制台查看错误日志")
        console.error(error)
      })



    }
  }
</script>

<style lang="less" scoped>

  .search {
    margin: 1em 3em 0 3em;

    .all-type {
      width: 80px;
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: grey;
      border: 1px solid grey;
      background-color: white;
      cursor: pointer;
      border-radius: 3px;
      margin: 1em 0;
    }

    .hot-type {
      color: grey;
      margin: 0 1em;
      cursor: pointer;
      transition: .3s;

      &:hover {
        color: #b3330d;
        transition: .3s;
      }
    }

  }

</style>
