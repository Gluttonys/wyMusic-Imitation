<template>
  <div>
    <!-- 轮播图 -->
    <rotation-chart></rotation-chart>

    <!-- 分类按钮 -->
    <station-type></station-type>

    <!-- 付费电台 -->
    <listen></listen>

    <!-- 电台个性推荐 -->
    <dj-recommend></dj-recommend>

  </div>
</template>

<script>

  import rotationChart from './station/rotationChart'
  import stationType from './station/stationType'
  import listen from './station/listen'
  import djRecommend from './station/djRecommend'

  export default {
    name: "stationPage",
    components: {
      rotationChart,
      stationType,
      listen,
      djRecommend,
    }
  }
</script>

<style lang="less" scoped>

</style>
