<template>
  <div class="rank-block">
    <div class="header">
      <a href="#">
        <img :src="songListInfo.coverImgUrl" alt="#">
      </a>
    </div>
    <div class="body">
      <strip v-for="(song, index) of partOfSongList" :key="song.id">
        <div class="song-info">
          <div class="rank" :class="{'top-three': index + 1 <= 3}">
            {{index + 1}}
          </div>
          <div class="wave">
            {{parseInt(Math.random() * 100)}}%
          </div>
          <div class="name">
            {{song.name}}
          </div>
          <div class="author">
            {{song.ar[0].name}}
          </div>
        </div>
      </strip>

    </div>

    <div class="footer">
      <a :href="more">查看全部></a>
    </div>
  </div>
</template>

<script>

  import strip from '../../../components/public/strip'

  import {getRankById} from "../../../netWork/index/requests"

  export default {
    name: "rankBlock",
    components: {
      strip
    },
    props: {
      id: {
        type: Number,
        require: true
      },
      more: {
        type: String,
        require: true,
        default() {
          return "#"
        }
      }
    },
    data() {
      return {
        // 歌单全部数据
        songListInfo: {},
        // 歌单的所有音乐的id 共 100个
        songListIds: [],
        // 歌单中每首歌的具体信息 [{}, {}, {}]
        songListTracks: []
      }
    },
    created() {
      getRankById({id: this.id})
        .then(data => {
          this.songListInfo = data.playlist || {}
          this.songListIds = data.playlist.trackIds || []
          this.songListTracks = data.playlist.tracks || []

        })
        .catch(error => {
          this.$message.error("获取排行榜歌单失败， 请打开控制台查看信息")
          console.error(error)
        })
    },
    computed: {
      partOfSongList() {
        return this.songListTracks.slice(0, 8)
      }
    }
  }
</script>

<style lang="less" scoped>
  .rank-block {
    width: 100%;

    .header {
      height: 80px;

      img {
        height: 80px;
        width: 100%;
      }

    }

    .body {

      .song-info {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: #37474f;
        font-size: 12px;
        display: grid;
        grid-template-columns: 6% 15% 1fr 20%;
        grid-gap: 5px;

        .top-three {
          font-size: 15px!important;
          color: #a60000!important;
          font-weight: 600;
        }

        .rank {
          place-self: center;
        }

        .rank,
        .wave,
        .author {
          font-size: 10px;
          color: #909090;
        }

        .name,
        .author {
          white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
        }

      }

    }

    .footer {
      height: 30px;

      a {
        color: #7f7f7f;
        text-decoration: none;
        font-size: 12px;
        float: right;
    margin-right: 1rem;
        line-height: 30px;
      }

    }
  }

</style>
