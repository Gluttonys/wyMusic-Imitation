<template>
  <div class="dj-recommend">
    <classify-module title="电台个性推荐" more="更多连接" :grid="6">
      <div class="block-decorate" v-for="item of recommendList" :key="item.id">
        <block :imgUrl="item.picUrl">
          {{item.rcmdtext}}
        </block>
        <div class="copywriter">{{item.copywriter}}</div>
      </div>
    </classify-module>
  </div>
</template>

<script>

  import classifyModule from "@/components/classifyModule"
  import block from "@/components/block"

  import {getDjRecommend} from "../../netWork/index/requests"

  export default {
    name: "djRecommend",
    data() {
      return {
        recommendList: []
      }
    },
    created() {
      getDjRecommend()
        .then(data => {
          this.recommendList = data.djRadios.slice(0, 6)
        })
        .catch(error => {
          this.$message.error("获取电台个性推荐失败， 请打开控制台查看报错信息")
          console.error(error)
        })
    },
    components: {
      classifyModule,
      block
    }
  }
</script>

<style lang="less" scoped>

  .block-decorate {
    position: relative;

    .copywriter {
      position: absolute;
      top: 120px;
      /*left: 10px;*/
      text-align: center;
      width: 100%;
      color: #eeeeee;
      line-height: 30px;
      font-size: 14px;
      background-image: linear-gradient(to top, rgba(0, 0, 0, .5) 5%, transparent);
    }

  }
</style>
