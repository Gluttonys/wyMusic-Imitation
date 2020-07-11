<template>
  <div id="app">

    <el-container>
      <el-header>
        <navigation-bar></navigation-bar>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <sidebar></sidebar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>
        <footer-control></footer-control>
      </el-footer>
    </el-container>

  </div>
</template>

<style lang="less">
  .el-container {
    height: 100vh;
    width: 100vw;

    .el-header {
      background-color: #b3330d;
      max-height: 60px;
      overflow: hidden;
    }

    .el-aside {
      border-right: 1px solid #bbbbbb;
      max-height: calc(100vh - 120px);
      overflow: hidden;
    }

    .el-main {
      padding: 10px;
      max-height: calc(100vh - 120px);
    }

    .el-footer {
      box-shadow: 0 0 5px grey;
      max-height: 60px;
      overflow: hidden;
    }

  }
</style>

<script>
  import NavigationBar from "./components/navigation-bar"
  import Sidebar from "./components/sidebar"
  import SongBlock from "@/components/song-block"
  import FooterControl from "@/components/footer-control"
  import Index from "./views/index"

  export default {
    components: {Index, FooterControl, SongBlock, Sidebar, NavigationBar}
  }
</script>
