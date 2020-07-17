<template>
  <div class="filters" :style="{'color': color}">
    <span>{{labelTip}} : </span>
    <span v-for="(type, index) of types" :key="type + index" class="type-detail">
      <a :href="type.to" :data-payload="type.payload" :class="{'default': defaultType === type.name}">
        {{type.name}}
      </a>
      <span class="split-line" :class="{'hidden': noSplit}" v-if="index < types.length - 1"></span>
    </span>
  </div>
</template>

<script>
  export default {
    name: "filters",
    props: {
      labelTip: {
        type: String,
        require: true,
      },
      color: {
        type: String,
        default: "#424242"
      },
      types: {
        type: Array,
        default() {
          return []
        }
      },
      noSplit: {
        type: Boolean,
        default: false
      },
      defaultType: {
        type: String,
        default() {
          return "";
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  .filters {
    padding: 0 3rem;
    margin-bottom: 0.5em;
    line-height: 1.5em;


    .type-detail {
      cursor: pointer;
      line-height: 1.7em;

      a {
        text-decoration: none;
        color: inherit;
        font-size: 0.9em;
        padding: 0 1em;
      }

      .split-line {
        height: 1em;
        width: 0.5px;
        transform: translateY(2px);
        background-color: #87848a;
        display: inline-block;
        margin: 0 0.5em;
      }

      .hidden {
        display: none;
      }

    }

    .default {
      padding: 0.1em;
      background-color: #7f7f7f;
      color: #eeeeee!important;
      border-radius: 3px;
    }


  }

</style>
