<template>
  <div>
    <classify-module title="主播电台" more="diantai" :grid="6" @click="handleMore">
      <div class="block-decorate" v-for="item in recommendDj" :key="item.id">
        <block :imgUrl="item.picUrl">{{item.copywriter}}</block>
      </div>

    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "../../../components/public/classifyModule"
  import block from "../../../components/public/block"
  import {inError} from "../../../tools/tools"
  import {getAnchorStation} from "../../../netWork/index/requests"

  export default {
    name: "anchorStation",
    components: {
      classifyModule,
      block
    },
    data() {
      return {
        recommendDj: []
      }
    },
    created() {
      getAnchorStation({size: 6})
        .then(data => this.recommendDj = data["djRadios"])
        .catch(error => inError.call(this, "推荐电台主播", error))
    },
    methods: {
      handleMore(activeBar) {
        this.$store.commit("setCurrentTab", activeBar)
      }
    }
  }
</script>
>
