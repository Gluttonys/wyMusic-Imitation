<template>
  <div class="type-tag">
    <img :src="imgUrl" alt="">
    <p class="name">
      <slot>默认占位字符</slot>
    </p>
  </div>
</template>

<script>
  export default {
    name: "type-tag",
    props: {
      imgUrl: {
        type: String
      }
    }
  }
</script>

<style lang="less" scoped>
  .type-tag {
    padding: 10px;
    margin: 0.5em 1em;
    /*width: 7vw;*/
    border: 1px solid grey;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }

    .name {
      /*text-align: center;*/
      margin: 0;
      padding: 0;
      color: #797979;
      font-size: 12px;
    }

  }



</style>
