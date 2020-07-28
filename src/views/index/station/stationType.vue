<template>
  <div class="station-type">
    <el-badge :value="20" class="item">
      <el-button @click="drawer = true">全部分类</el-button>
    </el-badge>

    <!-- 抽屉 -->
    <el-drawer
            title="全部分类"
            :visible.sync="drawer"
            :direction="direction"
            :with-header="false"
            size="24%"
            :before-close="handleClose">

      <div class="drawer-tags">
        <type-tag v-for="type of categories" :key="type.id" :imgUrl="type.pic84x84IdUrl">
          {{type.name}}
        </type-tag>
      </div>

    </el-drawer>

  </div>
</template>

<script>

  import typeTag from "../../../components/public/type-tag"

  import {getAllTypeForStation} from "../../../netWork/index/requests"

  export default {
    name: "stationType",
    data() {
      return {
        // 控制抽屉的开关
        drawer: false,
        // 抽屉的方向
        direction: "ttb",
        // 所有电台种类
        categories: []
      }
    },
    created() {
      getAllTypeForStation()
        .then(data => {
          this.categories = data.categories
        })
        .catch(error => {
          this.$message.error("获取电台主播全部分类失败， 请打开控制台查看具体报错信息")
          console.error(error)
        })
    },
    methods: {
      handleClose(done) {
        //  抽屉关闭时回调
        done()
      }
    },
    components: {
      typeTag
    }
  }
</script>

<style lang="less" scoped>

  .station-type {
    margin: 0.5em 3em;

    .drawer-tags {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
    }

  }

</style>
