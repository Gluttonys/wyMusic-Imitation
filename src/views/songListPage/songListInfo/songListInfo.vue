<template>
  <div class="songListInfo">
    <!-- 歌单图片 -->
    <div class="songListInfo__coverImgUrl">
      <img :src="playlistDetail['coverImgUrl']" alt="歌单图片">
    </div>

    <!-- 歌单名称 -->
    <div class="songListInfo__name">
      <p>{{ playlistDetail['name'] }}</p>
    </div>

    <!-- 歌单歌曲数量 -->
    <div class="songListInfo__trackCount">
      <p>歌曲数</p>
      <p>{{ formatBigNumber(playlistDetail['trackCount']) }}</p>
    </div>

    <!-- 歌单收藏人数 -->
    <div class="songListInfo__playCount">
      <p>播放数</p>
      <p>{{ formatBigNumber(playlistDetail['playCount']) }}</p>
    </div>

    <!-- 创建者信息-->
    <div class="songListInfo__creator__info">
      <img :src="creatorAvatarUrl" alt=""
           class="songListInfo__creator__info__avatar"/>

      <span class="songListInfo__creator__info__name">
        {{ creatorName }}
      </span>

      <span class="songListInfo__creator__info__create__time">
        {{ formatTimeStamp(playlistDetail['createTime'], 'yyyy-MM-dd') }} 创建
      </span>
    </div>

    <!-- 有关歌单的操作， 例如加入收藏夹， 分享之类的 -->
    <div class="songListInfo__operation">
      <el-button-group>
        <el-button class="btn__highlights" size="mini" @click="handleUpdatePlayList">
          <span class="iconfont icon-bofang"></span> 播放全部
        </el-button>
        <el-button class="btn__highlights" size="mini" @click="handlePushPlayList">
          <span class="iconfont icon-jia"></span>
        </el-button>
      </el-button-group>

      <el-button class="btn__prim" size="mini">
        <span class="iconfont icon-shoucangjia"></span>
        收藏 ({{ playlistDetail['subscribedCount'] }})
      </el-button>

      <el-button class="btn__prim" size="mini">
        <span class="iconfont icon-fenxiang"></span>
        分享 ({{ playlistDetail['shareCount'] }})
      </el-button>

      <el-button class="btn__prim" size="mini">
        <span class="iconfont icon-xiazai"></span>
        下载全部
      </el-button>
    </div>

    <!-- 歌单标签 -->
    <div class="songListInfo__tags">
      <span>标签 : </span>
      <span v-for="tag in playlistDetail['tags']" :key="tag">{{ tag }}</span>
    </div>

    <!-- 歌单描述 -->
    <div class="songListInfo__desc">
      <span>简介 : </span>
      <span>{{ playlistDetail['description'] }}</span>
    </div>

  </div>
</template>

<script>

import {getPlaylistDetail} from '@/netWork/songList/requests'
import {formatBigNumber, formatTimeStamp, inError} from '@/tools/tools'
import {informIds, loadDataFromInfo, informGetMusic} from '@/globalBus/events'

export default {
  props: {
    id: {
      type: [Number, String],
      require: true
    }
  },
  data() {
    return {
      playlistDetail: {},
      creatorAvatarUrl: '',
      creatorName: '',
      trackIds: []
    }
  },
  methods: {
    formatBigNumber,
    formatTimeStamp,
    handleUpdatePlayList() {
      /* 修改全局的 play list 列表 */
      this.$store.commit('UpdateMusicIdList', this.trackIds)
      informGetMusic(this.trackIds.first())
      console.log(this.$store.state.musicIdList)
    },
    handlePushPlayList() {
      /* 将该歌单的音乐追加到 play list 后面 */
      this.$store.commit('pushMusicIdList', this.trackIds)
      informGetMusic(this.trackIds.first())
      console.log(this.$store.state.musicIdList)
    }
  },
  mounted() {
    getPlaylistDetail({id: this.id})
        .then(data => {
          this.playlistDetail = data['playlist']
          this.playlistDetail['trackIds'].forEach(idObj => this.trackIds.push(idObj['id']))
          // 发现较深层次的数据， 第一轮渲染渲染不出来， 会报一个 undefined 错误
          this.$nextTick(_ => {
            let {avatarUrl, nickname} = this.playlistDetail['creator']
            this.creatorAvatarUrl = avatarUrl
            this.creatorName = nickname
          })

          // 向下面的 songListDetail 发送 音乐id列表
          informIds(this.playlistDetail['trackIds'])
          loadDataFromInfo({
            commandCount: this.playlistDetail['commentCount']
          })
        })
        .catch(error => inError.call(this, "音乐列表", error))
  }
}
</script>

<style lang="scss" scoped>
@import "songListInfo";
</style>
