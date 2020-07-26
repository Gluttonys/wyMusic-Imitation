<template>
  <div class="strip" :style="{backgroundColor: bgColor}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "strip",
    props: {
      bgColor: {
        type: String,
        // default: "#fbfbfb"
      }
    }
  }
</script>

<style lang="less" scoped>
  .strip {
    width: 100%;
    border: 1px solid #fbfbfb;
    min-height: 35px;
    cursor: pointer;
    transition: .3s;

    &:hover {
      background-color: #f1f1f1 !important;
      transition: .3s;
    }

  }


</style>
