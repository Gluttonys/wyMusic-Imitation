<template>
  <div class="wrapper">
    <p class="title" v-if="!noTitle">{{title}}</p>
    <p class="more" v-if="!noMore" @click="handleMore">更多></p>

    <div class="split"></div>
    <div class="content" :style="{display: 'grid', gridTemplateColumns: `repeat(${grid}, 1fr)`, gridGap: `${gap}px`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "classifyModule",
    props: {
      title: {
        require: true,
        type: String,
        default: "占位字符"
      },
      more: {
        type: String,
        default: ""
      },
      noMore: {
        type: Boolean,
        default: false
      },
      noTitle: {
        type: Boolean,
        default: false
      },
      grid: {
        type: Number
      },
      gap: {
        type: Number,
        default: 20
      }
    },
    methods: {
      handleMore() {
        this.$emit("click", this.more)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/main";

  .wrapper {
    padding: 1em 3em;
    display: grid;
    grid-template-areas: "title more" "split split" "content content";

    p {
      margin: 0;
      padding: 0;
    }

    .title {
      grid-area: title;
      justify-self: start;
      font-size: 24px;
      color: $color-text;
    }

    .more {
      grid-area: more;
      justify-self: end;
      font-size: 12px;
      line-height: 24px;
      color: $color-marginalized;
      cursor: pointer;
    }

    .split {
      grid-area: split;
      height: 1px;
      width: 100%;
      background-color: $color-bg-plain;
      margin: 0.5em auto;
    }

    .content {
      grid-area: content;

      a {
        color: $color-text;
        text-decoration: none;

        &:hover {
          color: $color-text-hover;
        }
      }
    }

  }



</style>
