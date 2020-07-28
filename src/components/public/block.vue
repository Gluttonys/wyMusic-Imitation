<template>
  <div class="block">
    <div class="img">
      <img :src="imgUrl" alt="">
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
    }
  }
</script>

<style lang="scss" scoped>

  .block {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 150px minmax(0, 50px);
    cursor: pointer;

    .img {
      img {
        height: 100%;
        width: 100%;
      }

    }

    .desc {
      font-size: 12px;
    }

  }
</style>
