<template>
  <div>
    <!-- 主播电台的轮播图部分 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) of rotationList" :key="index">
        <a :href="item.url" target="_blank">
          <img :src="item.pic" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>

  import {getRotationChartForStation} from "../../../netWork/index/requests"

  export default {
    name: "rotationChart",
    data() {
      return {
        rotationList: []
      }
    },
    created() {
      getRotationChartForStation()
        .then(data => {
          this.rotationList = data.data
        })
        .catch(error => {
          this.$messages.error("获取")
        })
    }
  }
</script>

<style lang="less" scoped>

  .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
    }
  }

</style>
