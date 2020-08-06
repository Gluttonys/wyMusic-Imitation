<template>
  <div class="block">
    <div class="img">

      <el-image :src="imgUrl" @click="handleImgClick" lazy>
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>

    </div>
    <p class="desc">
      <slot></slot>
    </p>
  </div>
</template>

<script>
  export default {
    name: "block",
    props: {
      imgUrl: {
        require: true,
        type: String,
        default: ""
      }
    },
    methods: {
      handleImgClick() {
        this.$emit("click")
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../assets/scss/main";

  .block {
    display: grid;
    cursor: pointer;

    .desc {
      font-size: 12px;
    }

    .image-slot {
      font-size: 2em;
      height: 3em;
      line-height: 3em;
      margin-left: 60px;
      color: $color-text;
    }

  }
</style>
