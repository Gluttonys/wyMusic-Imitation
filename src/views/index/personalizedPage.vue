<template>
  <div>
    <!-- 轮播图 -->
    <personalizedRecommendation></personalizedRecommendation>

    <!-- 推荐歌单 -->
    <recommended-song-list></recommended-song-list>

    <!-- 独家放送 -->
    <sole></sole>

    <!-- 最新音乐 -->
    <latest-music></latest-music>

    <!-- 推荐MV -->
    <recommended-m-v></recommended-m-v>

    <!-- 主播电台 -->
    <anchor-station></anchor-station>
  </div>
</template>

<script>

  import personalizedRecommendation from "./personalized/personalizedRecommendation"
  import recommendedSongList from "./personalized/recommendedSongList"
  import sole from "./personalized/sole"
  import latestMusic from "./personalized/latestMusic"
  import recommendedMV from "./personalized/recommendedMV"
  import anchorStation from "./personalized/anchorStation"

  export default {
    name: "personalizedPage",
    components: {
      personalizedRecommendation,
      recommendedSongList,
      sole,
      latestMusic,
      recommendedMV,
      anchorStation
    },
  }
</script>

<style scoped>

</style>
