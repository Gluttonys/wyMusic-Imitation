<template>
  <div class="recent-music">
    <!-- 最新音乐的过滤器  全部 华语  欧美 日韩 -->
    <country-filter></country-filter>

    <!-- 最近的 100 条音乐 -->
    <music-items-block></music-items-block>
  </div>
</template>

<script>

  // 过滤器
  import countryFilter from './recentMusic/countryFilter'
  // 音乐列表
  import musicItemsBlock from './recentMusic/musicItemsBlock'

  export default {
    name: "recentMusicPage",
    components: {
      countryFilter,
      musicItemsBlock
    }
  }
</script>

<style lang="less" scoped>

</style>
