<template>
  <div class="Image">
    <el-image :src="pic" :style="{animationPlayState: imgRutate ? 'running' : 'paused'}">
      <div slot="placeholder" class="image-slot">
        加载中
        <span class="dot">...</span>
      </div>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
import eventBus from "../../../globalBus/eventBus";

export default {
  props: {
    pic: String,
    mid: [String, Number],
  },
  data() {
    return {
      imgRutate: true,
    };
  },
  created() {
    eventBus.$on("informRutate", (state) => {
      this.imgRutate = state;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "Image";
</style>
