<template>
  <div class="rank-block">
    <div class="header">

      <el-image :src="songListInfo['coverImgUrl']">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>

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
          <div class="name" @click="informGetMusic(song.id)">
            {{song.name}}
          </div>
          <div class="author">
            {{song.ar[0].name}}
          </div>
        </div>
      </strip>
    </div>

    <div class="footer">
      <router-link :to="more">查看全部></router-link>
    </div>
  </div>
</template>

<script>

  import strip from "../../../components/public/strip"

  import {informGetMusic} from "../../../globalBus/events"
  import {inError} from "../../../tools/tools"
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
          this.songListInfo = data['playlist'] || {}
          this.songListIds = data['playlist']['trackIds'] || []
          this.songListTracks = data['playlist']['tracks'] || []
        })
        .catch(error => inError.call(this, "排行榜歌单", error))
    },
    computed: {
      partOfSongList() {
        return this.songListTracks.slice(0, 8)
      }
    },
    methods: {
      informGetMusic
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../../assets/scss/main";

  .rank-block {
    width: 100%;

    .header {
      height: 80px;

      &::v-deep .el-image {
        .el-image__inner {
          height: 80px;
          width: 100%;
        }
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
          font-size: 15px !important;
          color: $color-main !important;
          font-weight: 600;
        }

        .rank {
          place-self: center;
        }

        .rank,
        .wave,
        .author {
          font-size: 10px;
          color: $color-marginalized;
        }

        .name,
        .author {
          @include text-overflow-hide
        }

        .name {
          font-weight: 100;
        }

      }
    }

    .footer {
      height: 30px;
      background-color: $color-bg-plain-hover;

      a {
        color: $color-marginalized;
        text-decoration: none;
        font-size: 12px;
        float: right;
        margin-right: 1rem;
        line-height: 30px;
      }

    }
  }

</style>
