<template>
  <div>
    <classify-module title="听听" more="更多连接" :grid="6">
      <div class="block-decorate">

        <block imgUrl="img">
          这是谁
        </block>
      </div>
    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "@/components/classifyModule"
  import block from "@/components/block"
  import ClassifyModule from "../../components/classifyModule"

  export default {
    name: "listen",
    components: {ClassifyModule}
  }
</script>

<style lang="less" scoped>

</style>
