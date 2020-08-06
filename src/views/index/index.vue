<template>

  <div class="content">
    <!-- 顶部导航栏 -->
    <el-tabs v-model="$store.state.currentTab" @tab-click="handleClick">

      <el-tab-pane label="个性推荐" name="tuijian" :lazy="true">
        <personalized-page></personalized-page>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="playlist" :lazy="true">
        <song-sheet></song-sheet>
      </el-tab-pane>

      <el-tab-pane label="主播电台" name="diantai" :lazy="true">
        <station-page></station-page>
      </el-tab-pane>

      <!-- 排行榜 -->
      <el-tab-pane label="排行榜" name="paihangbang" :lazy="true">
        <top-list-page></top-list-page>
      </el-tab-pane>

      <!-- 歌手 -->
      <el-tab-pane label="歌手" name="songer" :lazy="true">
        <singer></singer>
      </el-tab-pane>

      <el-tab-pane label="最新音乐" name="zuixin" :lazy="true">
        <recent-music-page></recent-music-page>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

  // 首页
  import personalizedPage from "./personalizedPage"
  // 歌单
  import songSheet from "./songSheet"
  // 电台
  import stationPage from "./stationPage"
  // 排行榜
  import topListPage from "./topListPage"
  // 歌手页面
  import singer from "./singer"
  // 最新音乐
  import recentMusicPage from "./recentMusicPage"


  export default {
    name: "index",
    data() {
      return {}
    },
    components: {
      personalizedPage,
      songSheet,
      stationPage,
      topListPage,
      singer,
      recentMusicPage
    },
    methods: {
      // 单机导航栏触发的事件
      handleClick(tab, event) {
        this.$store.commit("setCurrentTab", tab.$options.propsData['name'])
      }
    }
  }
</script>

<style lang="scss" scoped>

  .el-tabs__item {
    min-width: 100px;
    text-align: center;
    font-size: 22px;
  }

  ::v-deep .el-tabs__item:hover,
  ::v-deep .el-tabs__item.is-active {
    color: #b3330d;
  }

  ::v-deep .el-tabs__active-bar {
    background-color: #b3330d;
  }

  ::v-deep .el-tabs__nav {
    left: 50%;
    transform: translateX(-50%) !important;
  }

</style>
