<template>
  <div>
    <!-- 轮播图 -->
    <rotation-chart></rotation-chart>

    <!-- 分类按钮 -->
    <station-type></station-type>

    <!-- 听听 -->
    <listen></listen>


  </div>
</template>

<script>

  import rotationChart from './station/rotationChart'
  import stationType from './station/stationType'
  import listen from './station/listen'

  export default {
    name: "stationPage",
    components: {
      rotationChart,
      stationType,
      listen
    }
  }
</script>

<style lang="less" scoped>

</style>
