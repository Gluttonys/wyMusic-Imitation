<template>
  <div class="wrapper">
    <classify-module title="最新音乐" more="zuixin" :grid="2" :gap="0" @click="handleMore">

      <strip v-for="(song, index) of songList"
             :key="song.mId"
             :bgColor="getBgColor(index + 1)">

        <p class="index">{{index + 1}}</p>

        <div class="song-pic">
          <img :src="song.mPic" :alt="song.name">
          <span class="iconfont icon-bofang"
                @click="informGetMusic(song.mId)"></span>
        </div>

        <p class="song-name">{{song.mName}}</p>

        <p class="song-author">{{song.mAuthor}}</p>
      </strip>

    </classify-module>
  </div>

</template>

<script>

  import classifyModule from "../../../components/public/classifyModule"
  import strip from "../../../components/public/strip"

  import {getLatesMusic} from "../../../netWork/index/requests"

  import {informGetMusic} from "../../../globalBus/events"

  export default {
    name: "latestMusic",
    data() {
      return {
        count: 1,
        songList: []
      }
    },
    components: {
      classifyModule,
      strip
    },
    created() {
      getLatesMusic()
        .then(data => {
          data.result.forEach(item => {
            this.songList.push({
              mId: item["id"],
              mPic: item["picUrl"],
              mName: item["name"],
              mAuthor: item["song"]["artists"][0]["name"]
            })
          })
        })
        .catch(error => {
          this.$message.error("获取最新音乐失败， 请打开控制台查看错误信息")
          console.error(error)
        })
    },
    methods: {
      informGetMusic,
      getBgColor(num) {
        return (num % 4 === 0 || num % 4 === 1) ? "#f8f8f8" : ""
      },
      handleMore(activeBar) {
        this.$store.commit("setCurrentTab", activeBar)
      }
    }
  }
</script>

<style lang="less" scoped>

  .strip {
    display: grid;
    grid-template-columns: 50px 100px 1fr;
    grid-template-rows: 40px 40px;
    grid-template-areas: "index pic songname" "index pic songauthor";

    .index {
      grid-area: index;
      place-self: center;
      color: grey;
    }

    .song-pic {
      place-self: center;
      grid-area: pic;
      position: relative;

      img {
        height: 60px;
        width: 60px;
      }

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff99;
        font-size: 40px;
      }

    }

    .song-name {
      grid-area: songname;
      transform: translateY(5px);
    }

    .song-author {
      transform: translateY(-10px);
      grid-area: songauthor;
      color: #757575;
      font-size: 14px;
    }

  }


</style>
