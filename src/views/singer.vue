<template>
  <div class="singer">
    <!-- 过滤器 -->
    <filters labelTip="语种" :types="languagesTypes" defaultType="全部"></filters>
    <filters labelTip="分类" :types="genderTypes" defaultType="全部"></filters>
    <filters labelTip="筛选" :types="letterTypes" defaultType="热门"></filters>

    <!-- 歌手头像 -->
    <singer-blocks></singer-blocks>

  </div>
</template>

<script>

  // 过滤器组件
  import filters from "./singer/filters"
  // 过滤类型数据
  import {authorFilter} from '../localData'

  // 歌手头像 block
  import singerBlocks from './singer/singerBlocks'

  export default {
    name: "singer",
    components: {
      singerBlocks,
      filters
    },
    data() {
      return {
        ...authorFilter
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
