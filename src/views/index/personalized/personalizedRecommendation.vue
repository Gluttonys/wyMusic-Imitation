<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="item in this.recommendList" :key="item.mId">
        <!--<h3 class="medium">{{ item }}</h3>-->
        <img class="carousel-img"
             :src="item.mPic"
             :alt="item.mName"
             @click="getMusic(item)"
        >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  // 个性化推荐页面， 进入网页的第一张页面

  import {informGetMusic} from "../../../globalBus/events"

  import {getRotation} from "../../../netWork/index/requests"

  export default {
    name: "personalizedRecommendation",
    data() {
      return {
        // 推荐歌曲， 轮播图上的
        // 使用的热门歌曲的API， 共返回了100条数据， 这里只保留前6条
        recommendList: []
      }
    },
    created() {

      getRotation().then(data => {
        if (data.code >= 200 && data.code < 300 || data.code === 304) {
          data.data.slice(0, 8).forEach(item => {
            this.recommendList.push({
              mId: item.id,
              mPic: item.album.blurPicUrl,
              mName: item.name,
              mAuthor: item.album.artists[0].name
            })
          })
        }
      }).catch(error => {
        this.$message.error("获取推荐歌曲失败， 请打开控制台查看错误日志")
        console.error(error)
      })

    },
    methods: {
      getMusic(musicData) {
        informGetMusic(musicData)
      },
    }
  }
</script>

<style scoped>

  .carousel-img {
    width: 100%;
    height: 100%;
  }
</style>
