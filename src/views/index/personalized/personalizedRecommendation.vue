<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="(item, index) in this.recommendList" :key="index">
        <a :href="item.url" target="_blank">
          <el-image class="carousel-img"
                    :src="item['imageUrl']">
            <!-- @click="informGetMusic(item['mId'])" -->
          </el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// 个性化推荐页面， 进入网页的第一张页面

import {informGetMusic} from '@/globalBus/events'
import {inError} from '@/tools/tools'
import {getRotations} from '@/netWork/index/requests'

export default {
  name: 'personalizedRecommendation',
  data() {
    return {
      // 存储轮播图数据
      recommendList: []
    }
  },
  mounted() {
    getRotations()
        .then(data => this.recommendList = data['banners'])
        .catch(error => inError.call(this, '轮播图', error))
  },
  methods: {
    informGetMusic
  }
}
</script>

<style lang="scss" scoped>

.carousel-img {
  width: 100%;
  height: 100%;
}
</style>
