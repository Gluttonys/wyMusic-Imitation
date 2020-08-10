<template>
  <div class="commandStrip">
    <div class="command__avatar">
      <img :src="commandData['user']['avatarUrl']" :alt="commandData['user']['nickname']">
    </div>

    <div class="command__content">
      <span>{{commandData['user']['nickname']}} : </span>
      <span>{{commandData['content']}}</span>
    </div>

    <div class="command__time">
      <p>{{formatTimeStamp(commandData['time'], 'yyyy-MM-dd HH:mm')}}</p>
    </div>

    <div class="command__agree">
      <p class="iconfont icon-icon_good"></p> <p v-if="commandData['likedCount']">({{formatBigNumber(commandData['likedCount'])}})</p>
    </div>

    <div class="command__shared">
      <p>分享</p>
    </div>

    <div class="command__reply">
      <p>回复</p>
    </div>

  </div>
</template>

<script>

  import {formatTimeStamp, formatBigNumber} from "@/tools/tools"

  export default {
    props: {
      commandData: {
        type: Object,
        require: true
      }
    },
    methods: {
      formatTimeStamp,
      formatBigNumber
    }
  }
</script>

<style lang="scss" scoped>
  @import "commandStrip";
</style>
