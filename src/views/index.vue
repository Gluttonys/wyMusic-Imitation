<template>

  <div class="content">
    <!-- 顶部导航栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="个性推荐" name="tuijian">
        <personalized-page></personalized-page>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="playlist">
        <song-sheet></song-sheet>
      </el-tab-pane>

      <el-tab-pane label="主播电台" name="diantai">
        <station-page></station-page>
      </el-tab-pane>

      <el-tab-pane label="排行榜" name="paihangbang">排行榜</el-tab-pane>
      <el-tab-pane label="歌手" name="songer">歌手</el-tab-pane>
      <el-tab-pane label="最新音乐" name="zuixin">最新音乐</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

  // 首页
  import personalizedPage from "./personalizedPage"
  // 歌单
  import songSheet from './songSheet'
  // 电台
  import stationPage from './stationPage'


  export default {
    name: "index",
    data() {
      return {
        // 当前活动tab
        activeName: "tuijian"
      }
    },
    components: {
      personalizedPage,
      songSheet,
      stationPage
    },
    methods: {
      // 单机导航栏触发的事件
      handleClick(tab, event) {
      }
    }
  }
</script>

<style lang="css">

  .el-tabs__item {
    min-width: 100px;
    text-align: center;
    font-size: 22px;
  }

  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: #b3330d !important;
  }

  .el-tabs__active-bar {
    background-color: #b3330d !important;
  }

  .el-tabs__nav {
    left: 50%;
    transform: translateX(-50%) !important;
  }

</style>
