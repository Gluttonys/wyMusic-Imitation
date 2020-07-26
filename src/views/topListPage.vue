<template>
  <div class="top-list">
    <!-- 官方榜单 -->
    <domestic></domestic>

    <!-- 全球榜单 -->
    <global></global>
  </div>
</template>

<script>

  import domestic from './topList/domestic'

  export default {
    name: "topListPage",
    components: {
      domestic,
      global
    }
  }
</script>

<style lang="less" scoped>

</style>
