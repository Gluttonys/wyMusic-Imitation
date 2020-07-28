<template>
  <div class="country-filter">
    <filters labelTip="分类" :types="languagesTypes" default-type="全部"></filters>
  </div>
</template>

<script>

  import filters from '../../../components/public/filters'
  import {authorFilter} from "../../../localData"

  export default {
    name: "countryFilter",
    components: {
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
